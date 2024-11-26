<script lang="ts">
    import conf from '~/src/config.toml';
    import Editor from "$lib/editor.svelte";
    import { page } from "$app/stores";
	import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    import { Parser as BXParser, jaModel } from "budoux";
	import { browser } from '$app/environment';
	import { ContentUtils } from '$lib/content';
	import { DateUtils } from '~/src/lib/date';

    let editdialog: HTMLDialogElement;
    let updating: HTMLDialogElement;
    let updated: HTMLDialogElement;
    let removed: HTMLDialogElement;
    let searchdialog: HTMLDialogElement;

    let ok = false;
    let loaded = false;

    const content_table_init: ContentDBTable = {
        id: null,
        title: "",
        auther: "",
        category: "",
        description: "",
        time: DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end)),
        duration: 0,
        countdown: 2,
        approved: false
    };

    let contents: Array<Content> = [];
    let content_devided_by_date = ContentUtils.devideByDate(contents);
    const updatecontent = async () => {
        contents = await (await fetch("/api/db/get")).json() as Array<Content>;
        content_devided_by_date = ContentUtils.devideByDate(contents);
        if (searching) {
            search();
        }
        if (filteringnotapproved) {
            filternotapproved();
        }
        loaded = true;
    };

    let searching = false;
    let wfilteringnotapproved = false;
    let filteringnotapproved = false;
    let slabel = "none";
    let sparam = "";
    let scontents = contents;
    const search = () => {
        switch (slabel) {
            case "title":
                searching = true;
                scontents = contents.filter((c) => c.title.includes(sparam));
                break;
            case "auther":
                searching = true;
                scontents = contents.filter((c) => c.auther.includes(sparam));
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

    let editing = content_table_init;
    let editing_key = "";
    let available = ContentUtils.isAvailable(editing);
    $: available = ContentUtils.isAvailable(editing);
    const edit = (econtent: Content) => {
        editing_key = econtent.key;
        editing = {
            id: econtent.id,
            title: econtent.title,
            auther: econtent.auther,
            category: econtent.category,
            description: econtent.description,
            time: DateUtils.toISO(econtent.time),
            duration: econtent.duration,
            countdown: econtent.countdown,
            approved: econtent.approved
        };
        editdialog.showModal();
    };
    const update = async () => {
        updating.showModal();
        let res: Array<Content> = await (await fetch("/api/db/update", {
            method: "POST",
            body: JSON.stringify({
                ...editing,
                key: editing_key,
            })
        })).json();
        contents = res ? res : contents;
        postupdate();
        updated.showModal();
    };
    const remove = async () => {
        updating.showModal();
        let res: Array<Content> = await (await fetch("/api/db/remove", {
            method: "POST",
            body: JSON.stringify({
                key: editing_key,
            })
        })).json();
        contents = res ? res : contents;
        postupdate();
        removed.showModal();
    };
    const postupdate = () => {
        editing = content_table_init;
        content_devided_by_date = ContentUtils.devideByDate(contents);
        if (searching) {
            search();
        }
        if (filteringnotapproved) {
            filternotapproved();
        }
        updating.close();
    }

    const duration = (_d: number, _c: number) => `${Math.floor(_d / 60) + _c}:${((_d % 60) + "").padStart(2, "0")}`;

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
                                    <p class="text-xs text-right">({duration(content.duration, content.countdown)})</p>
                                </div>
                                <div class="flex flex-col gap-1 flex-1">
                                    <p>{(new BXParser(jaModel)).parse(content.title).join("\u200B")}</p>
                                    <p class="text-xs flex flex-row flex-wrap gap-2">
                                        <span class="flex flex-row gap-[.125rem] items-center"><Icon icon="heroicons:user-16-solid" />{content.auther}</span>
                                        <span class="flex flex-row gap-[.125rem] items-center"><Icon icon="heroicons:folder-20-solid" />{content.category}</span>
                                    </p>
                                </div>
                                <div class="flex flex-row gap-1 ml-auto items-center text-xl">
                                    <button title="編集" class="pr_icon_button" on:click={() => edit(content)}>
                                        <Icon icon="heroicons:pencil-solid" />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
            <button title="検索" class="rounded-full w-fit p-2 text-xl fixed bottom-4 right-4 z-20" on:click={() => searchdialog.showModal()}>
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
    <button title="閉じる" class="pr_dialog_close" on:click={() => editdialog.close()}>
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
            <button class="order-2" on:click={update} disabled={Object.values(available).includes(false)}>変更</button>
            <button class="order-3 sm:order-1 pr_white_button" on:click={remove}>削除</button>
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
        <button on:click={() => {updated.close();editdialog.close()}}>閉じる</button>
    </div>
</dialog>

<dialog bind:this={removed} class="h-fit sm:w-1/2 w-10/12 text-left">
    <div class="flex flex-col gap-2">
        <h2 class="text-center">削除完了</h2>
        <p>削除が完了しました。</p>
        <button on:click={() => {removed.close();editdialog.close()}}>閉じる</button>
    </div>
</dialog>

<dialog bind:this={searchdialog} class="sm:h-fit sm:w-fit w-full h-full text-left">
    <button title="閉じる" class="pr_dialog_close" on:click={() => searchdialog.close()}>
        <Icon icon="heroicons:x-mark-solid" />
    </button>
    <div class="py-4 sm:px-6 w-10/12 sm:w-fit mx-auto">
        <p class="flex sm:flex-row flex-col gap-1">
            <select bind:value={slabel} class="sm:w-fit w-full">
                <option value="none">なし</option>
                <option value="title">タイトル</option>
                <option value="auther">投稿者</option>
                <option value="id">動画ID</option>
            </select>
            <input type="text" bind:value={sparam} placeholder="検索語句" />
        </p>
        <label class="flex flex-row gap-1">
            <input type="checkbox" bind:checked={wfilteringnotapproved} />
            <span>非承認のみ表示</span>
        </label>
        <button on:click={() => {
            search();
            filteringnotapproved = wfilteringnotapproved;
            filternotapproved();
            content_devided_by_date = ContentUtils.devideByDate(scontents);
        }}>検索</button>
    </div>
</dialog>
