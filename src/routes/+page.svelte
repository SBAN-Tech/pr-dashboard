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
            <p>
                <img class="w-full" src={conf.logo} alt="logo" />
            </p>
        </div>
        <div class="sm:col-span-3 flex flex-col">
            <h2 class="text-center font-serif">{bx().parse(conf.tagline).join("\u200B")}</h2>
            <div class="flex-1"><Markdown md={bx().parse(conf.description).join("\u200B")} plugins={[allowlist(["p", "strong", "em", "del", "a"])]} /></div>
            {#if new Date() > conf.limit}
                <p class="font-['Reggae_One'] text-xl text-red-600">募集は終了しました</p>
            {/if}
            <button title="タイムテーブル" on:click={() => location.href = "timetable"}>タイムテーブル</button>
        </div>
    </div>
</div>
<main>
    <div class="grid sm:grid-cols-2 gap-4">
        <button id="white-button" title="#{conf.hashtag}をみる" on:click={() => window.open("https://twitter.com/hashtag/" + conf.hashtag)}>#{conf.hashtag}をみる</button>
        <button id="white-button" title="#{conf.hashtag}でつぶやく" on:click={() => window.open("https://twitter.com/intent/tweet?hashtags=" + conf.hashtag)}>#{conf.hashtag}でつぶやく</button>
    </div>
</main>
