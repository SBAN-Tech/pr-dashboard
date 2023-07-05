<script lang=ts>
    import '../style.css';
    import conf from '../config.toml';
    import colors from 'tailwindcss/colors';
    import { style } from 'svelte-body';
    let themelist = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
    let theme = themelist.includes(conf.theme) ? conf.theme : "teal";

    let primary: string[] = new Array(11);

    switch (theme) {
        case "amber":
            primary = [colors.amber["50"], colors.amber["100"], colors.amber["200"], colors.amber["300"], colors.amber["400"], colors.amber["500"], colors.amber["600"], colors.amber["700"], colors.amber["800"], colors.amber["900"], colors.amber["950"]];
            break;
        case "blue":
            primary = [colors.blue["50"], colors.blue["100"], colors.blue["200"], colors.blue["300"], colors.blue["400"], colors.blue["500"], colors.blue["600"], colors.blue["700"], colors.blue["800"], colors.blue["900"], colors.blue["950"]];
            break;
        case "cyan":
            primary = [colors.cyan["50"], colors.cyan["100"], colors.cyan["200"], colors.cyan["300"], colors.cyan["400"], colors.cyan["500"], colors.cyan["600"], colors.cyan["700"], colors.cyan["800"], colors.cyan["900"], colors.cyan["950"]];
            break;
        case "emerald":
            primary = [colors.emerald["50"], colors.emerald["100"], colors.emerald["200"], colors.emerald["300"], colors.emerald["400"], colors.emerald["500"], colors.emerald["600"], colors.emerald["700"], colors.emerald["800"], colors.emerald["900"], colors.emerald["950"]];
            break;
        case "fuchsia":
            primary = [colors.fuchsia["50"], colors.fuchsia["100"], colors.fuchsia["200"], colors.fuchsia["300"], colors.fuchsia["400"], colors.fuchsia["500"], colors.fuchsia["600"], colors.fuchsia["700"], colors.fuchsia["800"], colors.fuchsia["900"], colors.fuchsia["950"]];
            break;
        case "gray":
            primary = [colors.gray["50"], colors.gray["100"], colors.gray["200"], colors.gray["300"], colors.gray["400"], colors.gray["500"], colors.gray["600"], colors.gray["700"], colors.gray["800"], colors.gray["900"], colors.gray["950"]];
            break;
        case "green":
            primary = [colors.green["50"], colors.green["100"], colors.green["200"], colors.green["300"], colors.green["400"], colors.green["500"], colors.green["600"], colors.green["700"], colors.green["800"], colors.green["900"], colors.green["950"]];
            break;
        case "indigo":
            primary = [colors.indigo["50"], colors.indigo["100"], colors.indigo["200"], colors.indigo["300"], colors.indigo["400"], colors.indigo["500"], colors.indigo["600"], colors.indigo["700"], colors.indigo["800"], colors.indigo["900"], colors.indigo["950"]];
            break;
        case "lime":
            primary = [colors.lime["50"], colors.lime["100"], colors.lime["200"], colors.lime["300"], colors.lime["400"], colors.lime["500"], colors.lime["600"], colors.lime["700"], colors.lime["800"], colors.lime["900"], colors.lime["950"]];
            break;
        case "neutral":
            primary = [colors.neutral["50"], colors.neutral["100"], colors.neutral["200"], colors.neutral["300"], colors.neutral["400"], colors.neutral["500"], colors.neutral["600"], colors.neutral["700"], colors.neutral["800"], colors.neutral["900"], colors.neutral["950"]];
            break;
        case "orange":
            primary = [colors.orange["50"], colors.orange["100"], colors.orange["200"], colors.orange["300"], colors.orange["400"], colors.orange["500"], colors.orange["600"], colors.orange["700"], colors.orange["800"], colors.orange["900"], colors.orange["950"]];
            break;
        case "pink":
            primary = [colors.pink["50"], colors.pink["100"], colors.pink["200"], colors.pink["300"], colors.pink["400"], colors.pink["500"], colors.pink["600"], colors.pink["700"], colors.pink["800"], colors.pink["900"], colors.pink["950"]];
            break;
        case "purple":
            primary = [colors.purple["50"], colors.purple["100"], colors.purple["200"], colors.purple["300"], colors.purple["400"], colors.purple["500"], colors.purple["600"], colors.purple["700"], colors.purple["800"], colors.purple["900"], colors.purple["950"]];
            break;
        case "red":
            primary = [colors.red["50"], colors.red["100"], colors.red["200"], colors.red["300"], colors.red["400"], colors.red["500"], colors.red["600"], colors.red["700"], colors.red["800"], colors.red["900"], colors.red["950"]];
            break;
        case "rose":
            primary = [colors.rose["50"], colors.rose["100"], colors.rose["200"], colors.rose["300"], colors.rose["400"], colors.rose["500"], colors.rose["600"], colors.rose["700"], colors.rose["800"], colors.rose["900"], colors.rose["950"]];
            break;
        case "sky":
            primary = [colors.sky["50"], colors.sky["100"], colors.sky["200"], colors.sky["300"], colors.sky["400"], colors.sky["500"], colors.sky["600"], colors.sky["700"], colors.sky["800"], colors.sky["900"], colors.sky["950"]];
            break;
        case "slate":
            primary = [colors.slate["50"], colors.slate["100"], colors.slate["200"], colors.slate["300"], colors.slate["400"], colors.slate["500"], colors.slate["600"], colors.slate["700"], colors.slate["800"], colors.slate["900"], colors.slate["950"]];
            break;
        case "stone":
            primary = [colors.stone["50"], colors.stone["100"], colors.stone["200"], colors.stone["300"], colors.stone["400"], colors.stone["500"], colors.stone["600"], colors.stone["700"], colors.stone["800"], colors.stone["900"], colors.stone["950"]];
            break;
        case "teal":
            primary = [colors.teal["50"], colors.teal["100"], colors.teal["200"], colors.teal["300"], colors.teal["400"], colors.teal["500"], colors.teal["600"], colors.teal["700"], colors.teal["800"], colors.teal["900"], colors.teal["950"]];
            break;
        case "violet":
            primary = [colors.violet["50"], colors.violet["100"], colors.violet["200"], colors.violet["300"], colors.violet["400"], colors.violet["500"], colors.violet["600"], colors.violet["700"], colors.violet["800"], colors.violet["900"], colors.violet["950"]];
            break;
        case "yellow":
            primary = [colors.yellow["50"], colors.yellow["100"], colors.yellow["200"], colors.yellow["300"], colors.yellow["400"], colors.yellow["500"], colors.yellow["600"], colors.yellow["700"], colors.yellow["800"], colors.yellow["900"], colors.yellow["950"]];
            break;
        case "zinc":
            primary = [colors.zinc["50"], colors.zinc["100"], colors.zinc["200"], colors.zinc["300"], colors.zinc["400"], colors.zinc["500"], colors.zinc["600"], colors.zinc["700"], colors.zinc["800"], colors.zinc["900"], colors.zinc["950"]];
            break;
    }

    let styles = `--primary-50: ${primary[0]};
    --primary-100: ${primary[1]};
    --primary-200: ${primary[2]};
    --primary-300: ${primary[3]};
    --primary-400: ${primary[4]};
    --primary-500: ${primary[5]};
    --primary-600: ${primary[6]};
    --primary-700: ${primary[7]};
    --primary-800: ${primary[8]};
    --primary-900: ${primary[9]};
    --primary-950: ${primary[10]};`;
</script>

<svelte:head>
    <link rel="icon" href={conf.favicon} />
</svelte:head>

<svelte:body use:style={styles} />

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
