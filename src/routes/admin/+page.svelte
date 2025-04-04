<script lang="ts">
    import conf from '~/src/config.toml';
    import Editor from "$lib/editor.svelte";
    import { page } from "$app/stores";
	import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    import { Parser as BXParser, jaModel } from "budoux";
	import { browser } from '$app/environment';
	import { ContentUtils } from '$lib/content';
	import { DateUtils } from '$lib/date';
    import { ContentDraft, Content, ContentDBTable } from "~/src/types/content.d";

    let editdialog: HTMLDialogElement;
    let updating: HTMLDialogElement;
    let updated: HTMLDialogElement;
    let removed: HTMLDialogElement;
    let searchdialog: HTMLDialogElement;

    let ok = $state(false);
    let loaded = $state(false);

    let contents: Array<Content> = [];
    let content_devided_by_date = $state(ContentUtils.devideByDate(contents));
    const updatecontent = async () => {
        contents = await (await fetch("/api/db/get")).json() satisfies Array<Content>;
        content_devided_by_date = ContentUtils.devideByDate(contents);
        search();
        filternotapproved();
        loaded = true;
    };

    let wfilteringnotapproved = $state(false);
    let filteringnotapproved = $state(false);
    let searching = $state(false);
    let slabel = $state("none");
    let sparam = $state("");
    let scontents = $state(contents);
    const search = () => {
        switch (slabel) {
            case "title":
                searching = true;
                scontents = contents.filter((c) => c.title.includes(sparam));
                break;
            case "author":
                searching = true;
                scontents = contents.filter((c) => c.author.includes(sparam));
                break;
            case "id":
                searching = true;
                scontents = contents.filter((c) => c.id?.includes(sparam));
                break;
            default:
                searching = false;
                scontents = contents;
                break;
        }
    }

    const filternotapproved = () => {
        scontents = filteringnotapproved ? scontents.filter((c) => !c.approved) : scontents;
    }

    let editing = $state((new ContentDraft()).build_table());
    let editing_key = "";
    let available = $derived(ContentUtils.isAvailable(editing));
    const edit = (econtent: Content) => {
        editing_key = econtent.key;
        editing = new ContentDBTable(econtent);
        editdialog.showModal();
    };
    const update = async () => {
        updating.showModal();
        let res = await (await fetch("/api/db/update", {
            method: "POST",
            body: JSON.stringify(editing)
        })).json() satisfies Array<Content>;
        contents = res ? res : contents;
        postupdate();
        updated.showModal();
    };
    const remove = async () => {
        updating.showModal();
        let res = await (await fetch("/api/db/remove", {
            method: "POST",
            body: JSON.stringify({ key: editing_key })
        })).json() satisfies Array<Content>;
        contents = res ? res : contents;
        postupdate();
        removed.showModal();
    };
    const postupdate = () => {
        editing = (new ContentDraft()).build_table();
        content_devided_by_date = ContentUtils.devideByDate(contents);
        search();
        filternotapproved();
        updating.close();
    }

    onMount(async () => {
        loaded = false;
        ok = await (await fetch(`${import.meta.env.BASE_URL}api/discord/isloginable`, {
            method: "POST",
            body: JSON.stringify({
                id: ($page.data.session?.user) ? $page.data.session?.user?.id : undefined
            })
        })).json() as boolean;
        updatecontent();
        if (browser) {
            const dialogPolyfill = (await import('dialog-polyfill')).default;
            dialogPolyfill.registerDialog(editdialog);
            dialogPolyfill.registerDialog(updating);
            dialogPolyfill.registerDialog(updated);
            dialogPolyfill.registerDialog(removed);
            dialogPolyfill.registerDialog(searchdialog);
        }
    });
</script>

<svelte:head>
    <title>ダッシュボード | {conf.title}</title>
</svelte:head>

<main class="h-[calc(100vh_-_3.25rem)] gap-0 pb-0 -mb-4">
    {#if $page.data.session?.user}
        {#if ok}
            <div class="overflow-y-scroll flex-1 pb-4">
                {#if !loaded}
                    <p>Loading...</p>
                {:else if content_devided_by_date.length == 0}
                    <p>ないらしい</p>
                {/if}
                {#each content_devided_by_date as _date, j}
                    <div id={`timetable_${_date.date.replaceAll("/", "")}`} class="pt-[3.25rem] -mt-[3.25rem] pointer-events-none border-b border-neutral-200 dark:border-neutral-600">
                        <nav class="sticky w-full top-0 flex py-1 pointer-events-auto bg-white/75 dark:bg-neutral-900/75 backdrop-blur z-10">
                            <h4 class="flex-1">{_date.date}</h4>
                            <div class="flex flex-row items-center text-xl">
                                {#if j == 0}
                                    <button class="pr_icon_button" disabled>
                                        <Icon icon="heroicons:chevron-up-solid" />
                                    </button>
                                {:else}
                                    <a href={`#timetable_${content_devided_by_date[j-1].date.replaceAll("/", "")}`}>
                                        <button class="pr_icon_button" title="前の日">
                                            <Icon icon="heroicons:chevron-up-solid" />
                                        </button>
                                    </a>
                                {/if}
                                {#if j == content_devided_by_date.length - 1}
                                    <button class="pr_icon_button" disabled>
                                        <Icon icon="heroicons:chevron-down-solid" />
                                    </button>
                                {:else}
                                    <a href={`#timetable_${content_devided_by_date[j+1].date.replaceAll("/", "")}`}>
                                        <button class="pr_icon_button" title="次の日">
                                            <Icon icon="heroicons:chevron-down-solid" />
                                        </button>
                                    </a>
                                {/if}
                            </div>
                        </nav>
                        {#each _date.contents as content}
                            <div class="pr_timetable_content pointer-events-auto">
                                <div class="flex flex-col gap-1 z-0" style={`opacity: ${content.approved ? 1 : 0.5};`}>
                                    <p>{DateUtils.getTime(content.time)}</p>
                                    <p class="text-xs text-right">({DateUtils.getDuration(content.duration, content.countdown)})</p>
                                </div>
                                <div class="flex flex-col gap-1 flex-1">
                                    <p>{(new BXParser(jaModel)).parse(content.title).join("\u200B")}</p>
                                    <p class="text-xs flex flex-row flex-wrap gap-2">
                                        <span class="flex flex-row gap-[.125rem] items-center"><Icon icon="heroicons:user-16-solid" />{content.author}</span>
                                        <span class="flex flex-row gap-[.125rem] items-center"><Icon icon="heroicons:folder-20-solid" />{content.category}</span>
                                    </p>
                                </div>
                                <div class="flex flex-row gap-1 ml-auto items-center text-xl">
                                    <button title="編集" class="pr_icon_button" onclick={() => edit(content)}>
                                        <Icon icon="heroicons:pencil-solid" />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
            <button title="検索" class="rounded-full w-fit p-2 text-xl fixed bottom-4 right-4 z-20" onclick={() => searchdialog.showModal()}>
                <Icon icon="heroicons:magnifying-glass-solid" />
            </button>
        {:else}
            <p>許可なし</p>
        {/if}
    {:else}
        <p>未ログイン</p>
    {/if}
</main>

<dialog bind:this={editdialog} class="text-left">
    <button title="閉じる" class="pr_dialog_close" onclick={() => editdialog.close()}>
        <Icon icon="heroicons:x-mark-solid" />
    </button>
    <div class="w-10/12 mx-auto">
        <Editor bind:content={editing} />
        <label>
            <input type="checkbox" bind:checked={editing.approved} />
            承認する
        </label>
        {#if !available.time}
            <p class="text-red-600 dark:text-red-500">設定された日時は対象期間外です。</p>
        {/if}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <button class="order-2" onclick={update} disabled={Object.values(available).includes(false)}>変更</button>
            <button class="order-3 sm:order-1 pr_white_button" onclick={remove}>削除</button>
        </div>
    </div>
</dialog>

<dialog bind:this={updating} class="h-fit sm:w-1/2 w-10/12 text-left">
    <div class="flex flex-col gap-2">
        <h2 class="text-center">送信中...</h2>
    </div>
</dialog>

<dialog bind:this={updated} class="h-fit sm:w-1/2 w-10/12 text-left">
    <div class="flex flex-col gap-2">
        <h2 class="text-center">更新完了</h2>
        <p>更新が完了しました。</p>
        <button onclick={() => {updated.close();editdialog.close()}}>閉じる</button>
    </div>
</dialog>

<dialog bind:this={removed} class="h-fit sm:w-1/2 w-10/12 text-left">
    <div class="flex flex-col gap-2">
        <h2 class="text-center">削除完了</h2>
        <p>削除が完了しました。</p>
        <button onclick={() => {removed.close();editdialog.close()}}>閉じる</button>
    </div>
</dialog>

<dialog bind:this={searchdialog} class="sm:h-fit sm:w-fit w-full h-full text-left">
    <button title="閉じる" class="pr_dialog_close" onclick={() => searchdialog.close()}>
        <Icon icon="heroicons:x-mark-solid" />
    </button>
    <div class="py-4 sm:px-6 w-10/12 sm:w-fit mx-auto">
        <p class="flex sm:flex-row flex-col gap-1">
            <select bind:value={slabel} class="sm:w-fit w-full">
                <option value="none">なし</option>
                <option value="title">タイトル</option>
                <option value="author">投稿者</option>
                <option value="url">動画URL</option>
            </select>
            <input type="text" bind:value={sparam} placeholder="検索語句" />
        </p>
        <label class="flex flex-row gap-1">
            <input type="checkbox" bind:checked={wfilteringnotapproved} />
            <span>非承認のみ表示</span>
        </label>
        <button onclick={() => {
            search();
            filteringnotapproved = wfilteringnotapproved;
            filternotapproved();
            content_devided_by_date = ContentUtils.devideByDate(scontents);
            searchdialog.close();
        }}>検索</button>
    </div>
</dialog>
