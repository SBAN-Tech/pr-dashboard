<script lang=ts>
    import '../style.css';
    import conf from '../config.toml';
    import { style } from 'svelte-body';
    import hljs from 'highlight.js';
    import '../highlight.css';
    import styles from '$lib/theme';
	import { onMount } from 'svelte';
    import spec from '$lib/spec';

    interface Pages {
        name: string;
        path: string;
    };

    let pages: Pages[] = [
        {
            name: "ホーム",
            path: "/"
        },
        {
            name: "ルール",
            path: "/rule"
        },
        {
            name: "参加方法",
            path: "/howto"
        },
        {
            name: "タイムテーブル",
            path: "/timetable"
        }
    ];

    let hamburger: HTMLDivElement;
    let wrapper: HTMLDivElement;

    const hamburger_o = () => {
        hamburger.classList.add("hamburger-open");
        wrapper.classList.add("hamburger-open");
    };

    const hamburger_c = () => {
        hamburger.classList.remove("hamburger-open");
        wrapper.classList.remove("hamburger-open");
    };

    onMount(() => {
        if (!spec) {
            alert("大変申し訳ありませんが、お使いのブラウザでは一部の機能が正常に動作しない可能性があります。\nブラウザやOSをご更新いただくことをお勧めいたします。\nUser-Agent: " + navigator.userAgent);
        }
        hljs.highlightAll();
    });
</script>

<svelte:head>
    <link rel="icon" href={conf.favicon} />
</svelte:head>

<svelte:body use:style={styles} />

<header>
    <button title="メニュー" id="icon-button" class="text-2xl sm:hidden -my-2" on:click={() => hamburger_o()}>
        <span class="material-icons-sharp">menu</span>
    </button>
    <p class="grow"><a href="/">{conf.title}</a></p>
    <ul class="hidden sm:flex gap-4 text-base">
        {#each pages as p}
            <a href={p.path}><li>{p.name}</li></a>
        {/each}
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

<div id="wrapper" bind:this={wrapper}></div>

<div id="hamburger" bind:this={hamburger}>
    <div id="menu">
        <button title="閉じる" id="dialog-close" on:click={() => hamburger_c()}>
            <span class="material-icons-sharp">close</span>
        </button>
        <ul class="flex flex-col text-base pt-8 -mx-4">
            {#each pages as p}
                <a href={p.path} on:click={() => hamburger_c()}><li id="hamburger-item">{p.name}</li></a>
            {/each}
        </ul>
    </div>
</div>