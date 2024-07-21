<script lang="ts">
    import conf from '~/src/config.toml';
    import Icon from '@iconify/svelte';

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
</script>

<header>
    <button title="メニュー" class="pr_icon_button text-xl sm:hidden" on:click={() => hamburger_o()}>
        <Icon icon="heroicons:bars-3-solid" />
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
        <button title="閉じる" class="pr_dialog_close" on:click={() => hamburger_c()}>
            <Icon icon="heroicons:x-mark-solid" />
        </button>
        <ul class="flex flex-col text-base pt-8 -mx-4">
            {#each pages as p}
                <a href={p.path} on:click={() => hamburger_c()}><li id="hamburger-item">{p.name}</li></a>
            {/each}
        </ul>
    </div>
</div>
