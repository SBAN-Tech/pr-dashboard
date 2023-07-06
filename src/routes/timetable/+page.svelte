<script lang="ts">
    import { Timestamp, collection, addDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { collectionStore } from 'sveltefire';
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
        duration: string;
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
        duration: "",
        countdown: 0,
        category: "",
        description: "",
        id: ""
    };

    let vinfo: HTMLDialogElement;
    let addcontent: HTMLDialogElement;

    const openvinfo = (c: Content) => {
        vinfo_content = c;
        vinfo.showModal();
    };

    const getduration = (i: number) => {
        let seconds = i % 60;
        let minutes = (i - (i % 60)) / 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const contentadd = async () => {
        let d: string[] = acontent.duration.split(":");
        let send: Send = {
            title: acontent.title,
            auther: acontent.auther,
            time: Timestamp.fromDate(new Date(acontent.time)),
            duration: Number(d[0]) * 3600 + Number(d[1]) * 60 + Number(d[2]),
            countdown: acontent.countdown,
            category: acontent.category,
            description: acontent.description,
            id: acontent.id,
            approved: false
        };

        try {
            const res = await addDoc(collection(db, "contents"), send);
            console.log("Wrote: contents/" + res.id);
        } catch(e) {
            console.error("Error: " + e);
        }

        addcontent.close();

        acontent = {
            title: "",
            auther: "",
            time: "",
            duration: "",
            countdown: 0,
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
                <h2>{content.title}<span class="text-sm font-normal ml-2">({getduration(content.duration + content.countdown * 60)})</span></h2>
                <p>{content.auther}</p>
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
    <h2 class="text-center mb-4">{vinfo_content.title}</h2>
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
            <p>{vinfo_content.description}</p>
            <table>
                <tbody>
                    <tr>
                        <th>投稿者</th>
                        <td>{vinfo_content.auther}</td>
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
                        <th>親の長さ</th>
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
        <input type="datetime-local" bind:value={acontent.time} min={conf.start.toISOString().slice(0, -1)} max={conf.end.toISOString().slice(0, -1)} />
        <h3>動画の長さ</h3>
        <input type="time" bind:value={acontent.duration} step="1" />
        <h3>親の長さ</h3>
        <select bind:value={acontent.countdown}>
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
        <textarea bind:value={acontent.description}></textarea>
        <button on:click={() => contentadd()}>登録</button>
    </div>
</dialog>
