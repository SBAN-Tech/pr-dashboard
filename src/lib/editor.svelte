<script lang="ts">
    import conf from "~/src/config.toml";
    import Duration from '$lib/duration.svelte';
    import Datetime from '$lib/datetime.svelte';
    import { DateTime } from "luxon";
    export let content: ContentDBTable;

    let isevent = (conf.category.event) ? content.category == conf.category.event : false;
    $: isevent = (conf.category.event) ? content.category == conf.category.event : false;
</script>

<h3>タイトル</h3>
<input type="text" class="w-full" bind:value={content.title} />
<h3>名義</h3>
<input type="text" class="w-full" bind:value={content.author} />
<h3>動画URL</h3>
<input type="text" class="w-full" bind:value={content.url} />
<h3>公開日時</h3>
<p>タイムゾーン: {DateTime.now().setZone(conf.timezone).offsetNameShort}</p>
<Datetime bind:value={content.time} />
<h3>動画の長さ</h3>
<Duration bind:value={content.duration} bind:isevent={isevent} />
<h3>カウントダウンの長さ</h3>
<select class="w-full" bind:value={content.countdown}>
    {#if conf.category && content.category == conf.category.event}
        <option value={0}>なし</option>
    {/if}
    <option value={1}>1分</option>
    <option value={2}>2分</option>
    <option value={3}>3分</option>
    <option value={4}>4分</option>
    <option value={5}>5分</option>
</select>
<h3>カテゴリー</h3>
<select class="w-full" bind:value={content.category}>
    {#each conf.category.list as c}
        <option value={c}>{c}</option>
    {/each}
</select>
<h3>概要</h3>
<p>Markdownが<wbr>使えます。</p>
<textarea bind:value={content.description} class="h-40 w-full transition-colors"></textarea>
