<script lang=ts>
    import '../style.css';
    import conf from '../config.toml';
    let themelist = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
    let theme = themelist.includes(conf.theme) ? `../themes/${conf.theme}.css` : `../themes/teal.css`;
    import(theme).catch();
</script>

<svelte:head>
    <link rel="icon" href={conf.favicon} />
</svelte:head>

<header>
    <p class="grow"><a href="/">{conf.title}</a></p>
    <ul class="hidden sm:flex gap-4 text-base">
        <a href="/"><li>ホーム</li></a>
        <a href="/rule"><li>ルール</li></a>
        <a href="/howto"><li>参加方法</li></a>
        <a href="/enjoy"><li>楽しみ方</li></a>
        <a href="/timetable"><li>タイムテーブル</li></a>
    </ul>
</header>
<div class="content">
    <slot />
</div>
<footer>
    {#each conf.copyrights as copyright}
        <p>&copy;{copyright}</p>
    {/each}
    <p>Powered by <a href="https://github.com/sban-tech/pr-dashboard">PR-Dashboard</a></p>
</footer>