<script lang="ts">
    import conf from "../../config.toml";
    import '../../doc.css';
    import md from '../../markdowns/rule.md?raw';
    import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    import rehypeRaw from 'rehype-raw';
</script>

<svelte:head>
    <title>参加方法 | {conf.title}</title>
</svelte:head>

<main>
    <h1>参加方法</h1>
    <p>参加方法がよく分からない方のために、このページで一連の流れをご紹介します。</p>
    <div class="text-left container mx-auto">
        <Markdown {md} plugins={[gfmPlugin(), {rehypePlugin: rehypeRaw}]} />
    </div>
</main>