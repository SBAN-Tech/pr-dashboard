<script lang=ts>
	import { loadDefaultJapaneseParser as bx } from 'budoux';
	import Markdown, { allowlist } from 'svelte-exmarkdown';
	import conf from '../config.toml';
</script>

<svelte:head>
    <title>{conf.title}</title>
</svelte:head>

<div id="top-board">
    <div id="top-board-content">
        <div class="sm:col-span-2">
            {#if conf.logo_polyfill}
                <picture>
                    <source srcset={conf.logo} />
                    <img class="w-full" src={conf.logo_polyfill} alt="logo" />
                </picture>
            {:else}
                <img class="w-full" src={conf.logo} alt="logo" />
            {/if}
        </div>
        <div class="sm:col-span-3 flex flex-col">
            <h2 class="text-center font-serif">{bx().parse(conf.tagline).join("\u200B")}</h2>
            <div class="flex-1"><Markdown md={bx().parse(conf.description).join("\u200B")} plugins={[allowlist(["p", "strong", "em", "del", "a", "code"])]} /></div>
            {#if new Date() > conf.limit}
                <p class="font-['Reggae_One'] text-xl text-red-600">募集は終了しました</p>
            {/if}
            {#if conf.list}
                <a href={`https://www.youtube.com/playlist?list=${conf.list}`} target="_blank">
                    <button title="再生リスト">再生リスト</button>
                </a>
            {/if}
            <a href="/timetable">
                <button title="タイムテーブル">タイムテーブル</button>
            </a>
        </div>
    </div>
</div>
<main>
    <div class="grid sm:grid-cols-2 gap-4">
        <a href={`https://twitter.com/hashtag/${conf.hashtag}`} target="_blank">
            <button id="white-button" title={`#${conf.hashtag}をみる`}>#{conf.hashtag}をみる</button>
        </a>
        <a href={`https://twitter.com/intent/tweet?hashtags=${conf.hashtag}`} target="_blank">
            <button id="white-button" title={`#${conf.hashtag}でつぶやく`}>#{conf.hashtag}でつぶやく</button>
        </a>
    </div>
</main>
