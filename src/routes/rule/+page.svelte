<script lang="ts">
    import conf from "../../config.toml";
    import md from '../../markdowns/howto.md?raw';
    import Markdown from 'svelte-exmarkdown';
    import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    import rehypeRaw from 'rehype-raw';
    import { loadDefaultJapaneseParser as bx } from 'budoux';
</script>

<svelte:head>
    <title>ルール | {conf.title}</title>
</svelte:head>

<main>
    <h1>ルール</h1>
    <p>参加いただく<wbr>ために、<wbr>お読みいただかなければ<wbr>ならない<wbr>ルールです。<wbr>必ず<wbr>お読みください。</p>
    <div id="doc">
        <Markdown md={bx().parse(md).join("\u200B")} plugins={[gfmPlugin(), {rehypePlugin: rehypeRaw}]} />
    </div>
</main>
