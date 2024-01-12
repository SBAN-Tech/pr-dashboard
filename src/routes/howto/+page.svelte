<script lang="ts">
    import conf from "../../config.toml";
    import md from '../../markdowns/rule.md?raw';
    import Markdown from 'svelte-exmarkdown';
    import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    import rehypeRaw from 'rehype-raw';
    import { loadDefaultJapaneseParser as bx } from 'budoux';
</script>

<svelte:head>
    <title>参加方法 | {conf.title}</title>
</svelte:head>

<main>
    <h1>参加方法</h1>
    <p>参加方法が<wbr>よく分からない方<wbr>のために、<wbr>このページで<wbr>一連の流れを<wbr>ご紹介します。</p>
    <div id="doc">
        <Markdown md={bx().parse(md).join("\u200B")} plugins={[gfmPlugin(), {rehypePlugin: rehypeRaw}]} />
    </div>
</main>
