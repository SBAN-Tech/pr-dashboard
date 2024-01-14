<script lang="ts">
    import { onMount } from 'svelte';
    import { Timestamp, collection, addDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { collectionStore } from 'sveltefire';
    import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
    import Markdown from 'svelte-exmarkdown';
    import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    import hljs from 'highlight.js';
    import { loadDefaultJapaneseParser as bx } from 'budoux';
    import Duration from '$lib/duration.svelte';
    import Datetime from '$lib/datetime.svelte';
    import conf from '../../config.toml';

    interface Content {
        title: string;
        auther: string;
        time: Timestamp;
        duration: number;
        countdown: number;
        category: string;
        description: string;
        id: string;
        approved: boolean;
    };

    interface AddContent {
        title: string;
        auther: string;
        time: string;
        duration: string[];
        countdown: number;
        category: string;
        description: string;
        id: string;
    };

    interface Send {
        title: string;
        auther: string;
        time: Timestamp;
        duration: number;
        countdown: number;
        category: string;
        description: string;
        id: string;
        approved: boolean;
    };

    const contents = collectionStore<Content>(db, '/contents');

    const gettime = (time: Date) => {
        return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
    };

    const is_datetime_supported = () => {
        if (typeof document !== "undefined") {
            let _e = document.createElement("input");
            _e.setAttribute("type", "datetime-local");
            return _e.type === "datetime-local";
        } else {
            return true;
        }
    }

    let vinfo_content: Content = {
        title: "",
        auther: "",
        time: Timestamp.fromDate(new Date()),
        duration: 0,
        countdown: 0,
        category: "",
        description: "",
        id: "",
        approved: true,
    };

    let acontent: AddContent = {
        title: "",
        auther: "",
        time: "",
        duration: ["00", "00"],
        countdown: 2,
        category: "",
        description: "",
        id: ""
    };

    let vinfo: HTMLDialogElement;
    let addcontent: HTMLDialogElement;
    let sent: HTMLDialogElement;
    onMount(async () => {
        if (typeof window !== "undefined") {
            const dialogPolyfill = (await import('dialog-polyfill')).default;
            dialogPolyfill.registerDialog(vinfo);
            dialogPolyfill.registerDialog(addcontent);
            dialogPolyfill.registerDialog(sent);
        }
    });

    const openvinfo = (c: Content) => {
        vinfo_content = c;
        vinfo.showModal();
        hljs.highlightAll();
    };

    const getduration = (i: number) => {
        let seconds = i % 60;
        let minutes = (i - (i % 60)) / 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    let datetime: string[];

    const contentadd = async () => {
        let send: Send = {
            title: acontent.title,
            auther: acontent.auther,
            time: Timestamp.fromDate(new Date(zonedTimeToUtc(acontent.time == "" ? `${datetime[0]} ${datetime[1]}:${datetime[2]}:00` : acontent.time, conf.timezone))),
            duration: Number(acontent.duration[0]) * 60 + Number(acontent.duration[1]),
            countdown: acontent.countdown,
            category: acontent.category,
            description: acontent.description,
            id: acontent.id,
            approved: false
        };

        try {
            const res = await addDoc(collection(db, "contents"), send);
            console.log("Wrote: contents/" + res.id);
            if (conf.discord) {
                await fetch(conf.discord, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        "username": "タイムテーブル登録通知",
                        "content": `#${conf.hashtag}\n${format(send.time.toDate(), "M/d H:mm", { timeZone: conf.timezone })}より、${send.auther}さんによる「${send.title}」のプレミアが始まります!\nhttps://youtu.be/${send.id}${conf.list ? `?list=${conf.list}` : ""}`,
                    }),
                });
            }
        } catch(e) {
            console.error("Error: " + e);
        }

        addcontent.close();
        sent.showModal();

        acontent = {
            title: "",
            auther: "",
            time: "",
            duration: ["00", "00"],
            countdown: 1,
            category: "",
            description: "",
            id: ""
        };
    };
</script>

<svelte:head>
    <title>タイムテーブル | {conf.title}</title>
</svelte:head>

<main>
    <h1>タイムテーブル</h1>
    <button title="タイムテーブル登録" on:click={() => addcontent.showModal()}>タイムテーブル登録</button>
    <div id="timetable">
        {#each $contents.sort((a, b) => {return (a.time.toDate() < b.time.toDate()) ? -1: 1;}) as content}
            <div id="timetable-content">
                <p class="text-sm">{gettime(content.time.toDate())}</p>
                <p class="text-xs flex justify-center"><span class="material-icons-sharp">folder</span>{content.category}</p>
                <h2>{bx().parse(content.title).join("\u200B")}<span class="text-sm font-normal ml-2">({getduration(content.duration + content.countdown * 60)})</span></h2>
                <p>{bx().parse(content.auther).join("\u200B")}</p>
                {#if content.approved}
                    <div class="grid sm:grid-cols-2 gap-4">
                        {#if content.id == ""}
                            <button disabled>動画URLなし</button>
                        {:else}
                            <button title="視聴" on:click={() => window.open("https://youtu.be/" + content.id)}>視聴</button>
                        {/if}
                        <button title="詳細" on:click={() => openvinfo(content)}>詳細</button>
                    </div>
                {:else}
                    <button disabled>審査中</button>
                {/if}
            </div>
        {/each}
    </div>
</main>

<dialog bind:this={vinfo}>
    <button title="閉じる" id="dialog-close" on:click={() => vinfo.close()}>
        <span class="material-icons-sharp">close</span>
    </button>
    <h2 class="text-center mb-4">{bx().parse(vinfo_content.title).join("\u200B")}</h2>
    <div class="grid sm:grid-cols-2 gap-4 mt-auto items-center">
        <div class="text-center">
            {#if vinfo_content.id == ""}
                <p>動画がありません。</p>
            {:else}
            <div class="aspect-w-16 aspect-h-9">
                <iframe src={"https://www.youtube.com/embed/" + vinfo_content.id} title="YouTube video player" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            {/if}
        </div>
        <div>
            <h3>動画情報</h3>
            <Markdown md={bx().parse(vinfo_content.description).join("\u200B")} plugins={[gfmPlugin()]} />
            <table>
                <tbody>
                    <tr>
                        <th>投稿者</th>
                        <td>{bx().parse(vinfo_content.auther).join("\u200B")}</td>
                    </tr>
                    <tr>
                        <th>公開日時</th>
                        <td>{gettime(vinfo_content.time.toDate())}</td>
                    </tr>
                    <tr>
                        <th>動画の長さ</th>
                        <td>{getduration(vinfo_content.duration)}</td>
                    </tr>
                    <tr>
                        <th>カウントダウンの長さ</th>
                        <td>{getduration(vinfo_content.countdown * 60)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</dialog>

<dialog bind:this={addcontent} class="text-left">
    <button title="閉じる" id="dialog-close" on:click={() => addcontent.close()}>
        <span class="material-icons-sharp">close</span>
    </button>
    <div class="w-10/12 mx-auto">
        <h3>タイトル</h3>
        <input type="text" bind:value={acontent.title} />
        <h3>名義</h3>
        <input type="text" bind:value={acontent.auther} />
        <h3>動画ID</h3>
        <input type="text" bind:value={acontent.id} />
        <h3>公開日時</h3>
        <p>タイムゾーンは<wbr>{format(utcToZonedTime(new Date(), conf.timezone), 'zzz', {timeZone: conf.timezone})}で<wbr>お願いします</p>
        {#if is_datetime_supported()}
            <input type="datetime-local" bind:value={acontent.time} min={format(utcToZonedTime(conf.start, conf.timezone), 'yyyy-MM-dd HH:mm:ss', {timeZone: conf.timezone})} max={format(utcToZonedTime(conf.end, conf.timezone), 'yyyy-MM-dd HH:mm:ss', {timeZone: conf.timezone})} />
        {:else}
            <Datetime bind:value={datetime} />
        {/if}
        <h3>動画の長さ</h3>
        <Duration bind:value={acontent.duration} />
        <h3>カウントダウンの長さ</h3>
        <select bind:value={acontent.countdown}>
            <option value={0}>なし</option>
            <option value={1}>1分</option>
            <option value={2}>2分</option>
            <option value={3}>3分</option>
            <option value={4}>4分</option>
            <option value={5}>5分</option>
        </select>
        <h3>カテゴリー</h3>
        <select bind:value={acontent.category}>
            {#each conf.categories as c}
                <option value={c}>{c}</option>
            {/each}
        </select>
        <h3>概要</h3>
        <p>Markdownが<wbr>使えます。</p>
        <textarea bind:value={acontent.description} class="h-40 transition-colors transi"></textarea>
        <button on:click={() => contentadd()}>登録</button>
    </div>
</dialog>

<dialog bind:this={sent} class="h-fit sm:w-1/2 w-10/12 text-left">
    <div class="flex flex-col gap-2">
        <h2 class="text-center">登録完了</h2>
        <p>タイムテーブルへの<wbr>登録が完了しました。</p>
        <button on:click={() => sent.close()}>閉じる</button>
    </div>
</dialog>
