<script lang="ts">
    import conf from '~/src/config.toml';
    import PageHeader from '$lib/page-header.svelte';
    import Editor from "$lib/editor.svelte";
    import type { ActionData } from './$types';
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import Markdown from 'svelte-exmarkdown';
    import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    import rehypePrism from "rehype-prism-plus";
    import { compareAsc } from "date-fns";
    import { format as date_tz_format, fromZonedTime } from "date-fns-tz";
    import Icon from "@iconify/svelte";
    import { loadDefaultJapaneseParser as bx } from 'budoux';
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

    export let form: ActionData;

    let vinfo: HTMLDialogElement;
    let addcontent: HTMLDialogElement;
    let sending: HTMLDialogElement;
    let sent: HTMLDialogElement;
    
    const content_init: Content = {
        key: "",
        id: null,
        title: "",
        auther: "",
        category: "",
        description: "",
        time: conf.start,
        duration: 0,
        countdown: 0,
        approved: true
    };
    const content_table_init: ContentDBTable = {
        id: null,
        title: "",
        auther: "",
        category: "",
        description: "",
        time: date_tz_format(conf.start, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: conf.timezone }),
        duration: 0,
        countdown: 2,
        approved: false
    };
    let contents: Array<Content> = [];
    
    const content_devide_by_date = (cs_p: Array<Content>) => {
        let cs = cs_p.sort((a, b) => compareAsc(a.time, b.time));
        let result: Array<ContentDividedbyDate> = [];
        for (let i = 0; i < cs.length; i++) {
            if (i == 0) {
                result.push({
                    date: date_tz_format(cs[i].time, "yyyy/MM/dd", {timeZone: conf.timezone}),
                    contents: [cs[i]]
                });
            } else if (date_tz_format(cs[i].time, "yyyyMMdd", {timeZone: conf.timezone}) != date_tz_format(cs[i-1].time, "yyyyMMdd", {timeZone: conf.timezone})) {
                result.push({
                    date: date_tz_format(cs[i].time, "yyyy/MM/dd", {timeZone: conf.timezone}),
                    contents: [cs[i]]
                });
            } else {
                result[result.length - 1].contents.push(cs[i]);
            }
        }
        return result;
    };
    let content_devided_by_date = content_devide_by_date(contents);

    const updatecontent = async () => {
        contents = await (await fetch("/api/db/get")).json() as Array<Content>;
        content_devided_by_date = content_devide_by_date(contents);
    };

    onMount(async () => {
        updatecontent();
        if (browser) {
            const dialogPolyfill = (await import('dialog-polyfill')).default;
            dialogPolyfill.registerDialog(vinfo);
            dialogPolyfill.registerDialog(addcontent);
            dialogPolyfill.registerDialog(sending);
            dialogPolyfill.registerDialog(sent);
        }
    });

    const duration = (_d: number, _c: number) => `${Math.floor(_d / 60) + _c}:${((_d % 60) + "").padStart(2, "0")}`;

    let vinfo_content = content_init;
    const openvinfo = (_c: Content) => {
        vinfo_content = _c;
        vinfo.showModal();
    };

    let acontent = content_table_init;

    const send = async (result: ActionResult<Record<string, unknown> | undefined, Record<string, unknown> | undefined>) => {
        await applyAction(result);
        acontent = content_table_init;
        contents = form?.contents ? form?.contents : contents;
        content_devided_by_date = content_devide_by_date(contents);
        sending.close();
        sent.showModal();
    };
</script>

<svelte:head>
    <title>タイムテーブル | {conf.title}</title>
</svelte:head>

<PageHeader title="タイムテーブル" />

<main>
    <div class="m-0 flex flex-col w-full">
        {#if content_devided_by_date.length <= 0}
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
                            <p>{date_tz_format(content.time, "HH:mm", {timeZone: conf.timezone})}</p>
                            <p class="text-xs text-right">({duration(content.duration, content.countdown)})</p>
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <p>{bx().parse(content.title).join("\u200B")}</p>
                            <p class="text-xs flex flex-row flex-wrap gap-2">
                                <span class="flex flex-row gap-[.125rem] items-center"><Icon icon="heroicons:user-16-solid" />{content.auther}</span>
                                <span class="flex flex-row gap-[.125rem] items-center"><Icon icon="heroicons:folder-20-solid" />{content.category}</span>
                            </p>
                        </div>
                        <div class="flex flex-row gap-1 ml-auto items-center text-xl">
                            {#if content.id && content.approved}
                                <a href={`https://youtu.be/${content.id}`} target="_blank">
                                    <button title="再生" class="pr_icon_button">
                                        <Icon icon="heroicons:play-solid" />
                                    </button>
                                </a>
                            {/if}
                            <button title="詳細" class="pr_icon_button" on:click={() => openvinfo(content)} disabled={!content.approved}>
                                <Icon icon="heroicons:information-circle-solid" />
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>

    <button title="登録" class="rounded-full w-fit p-2 text-xl fixed bottom-4 right-4 z-20" on:click={() => addcontent.showModal()} disabled={(new Date() > conf.limit)}>
        <Icon icon="heroicons:plus-solid" />
    </button>
</main>

<dialog bind:this={vinfo}>
    <button title="閉じる" class="pr_dialog_close" on:click={() => vinfo.close()}>
        <Icon icon="heroicons:x-mark-solid" />
    </button>
    <h2 class="text-center mb-4">{bx().parse(vinfo_content.title).join("\u200B")}</h2>
    <div class="grid sm:grid-cols-2 gap-4 items-center h-full">
        <div class="text-center">
            {#if vinfo_content.id == ""}
                <p>動画がありません。</p>
            {:else}
                <iframe src={"https://www.youtube.com/embed/" + vinfo_content.id} title="YouTube video player" class="w-full aspect-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            {/if}
        </div>
        <div class="flex flex-col h-full">
            <h3>動画情報</h3>
            <div class="flex-1">
                <Markdown md={bx().parse(vinfo_content.description).join("\u200B")} plugins={[gfmPlugin(), {rehypePlugin: rehypePrism}]} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>投稿者</th>
                        <td>{bx().parse(vinfo_content.auther).join("\u200B")}</td>
                    </tr>
                    <tr>
                        <th>公開日時</th>
                        <td>{date_tz_format(vinfo_content.time, "yyyy/MM/dd HH:mm", {timeZone: conf.timezone})}</td>
                    </tr>
                    <tr>
                        <th>動画の長さ</th>
                        <td>{duration(vinfo_content.duration, 0)}</td>
                    </tr>
                    <tr>
                        <th>カウントダウンの長さ</th>
                        <td>{duration(0, vinfo_content.countdown)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</dialog>

<dialog bind:this={addcontent} class="text-left">
    <button title="閉じる" class="pr_dialog_close" on:click={() => addcontent.close()}>
        <Icon icon="heroicons:x-mark-solid" />
    </button>
    <div class="w-10/12 mx-auto">
        <form method="post" action="?/insert" use:enhance={() => {
            return async ({ result }) => {
                if (result.type === 'redirect') {
                    goto(result.location);
                } else {
                    await send(result);
                }
            };
        }}>
            <Editor bind:content={acontent} />
            <input type="hidden" name="id" value={acontent.id} />
            <input type="hidden" name="title" value={acontent.title} />
            <input type="hidden" name="auther" value={acontent.auther} />
            <input type="hidden" name="category" value={acontent.category} />
            <input type="hidden" name="description" value={acontent.description} />
            <input type="hidden" name="time" value={date_tz_format(fromZonedTime(acontent.time, conf.timezone), "yyyy-MM-dd'T'HH:mm:ssXXXXX", {timeZone: conf.timezone})} />
            <input type="hidden" name="duration" value={acontent.duration} />
            <input type="hidden" name="countdown" value={acontent.countdown} />
            <input type="hidden" name="approved" value={acontent.approved ? "true" : "false"} />
            <button type="submit" on:click={() => {sending.showModal()}}>登録</button>
        </form>
    </div>
</dialog>

<dialog bind:this={sending} class="h-fit sm:w-1/2 w-10/12 text-left">
    <div class="flex flex-col gap-2">
        <h2 class="text-center">送信中...</h2>
    </div>
</dialog>

<dialog bind:this={sent} class="h-fit sm:w-1/2 w-10/12 text-left">
    <div class="flex flex-col gap-2">
        <h2 class="text-center">登録完了</h2>
        <p>タイムテーブルへの<wbr>登録が完了しました。</p>
        <button on:click={() => {sent.close();addcontent.close()}}>閉じる</button>
    </div>
</dialog>
