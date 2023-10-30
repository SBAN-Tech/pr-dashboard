<script lang="ts">
    import conf from "../../config.toml";
    import '../../doc.css';
    import md from '../../markdowns/howto.md?raw';
    import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
    import rehypeRaw from 'rehype-raw';
</script>

<svelte:head>
    <title>ルール | {conf.title}</title>
</svelte:head>

<main>
    <h1>ルール</h1>
    <p>参加いただくために、お読みいただかなければならないルールです。必ずお読みください</p>
    <div class="text-left container mx-auto">
        <Markdown {md} plugins={[gfmPlugin(), {rehypePlugin: rehypeRaw}]} />
    </div>
</main>