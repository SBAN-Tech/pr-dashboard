<script lang="ts">
    import conf from '../../config.toml';
</script>

<svelte:head>
    <title>楽しみ方 | {conf.title}</title>
</svelte:head>

<main>
    <h1 class="text-red-600 font-serif">{conf.enjoy}</h1>
</main>