<script lang=ts>
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
        <div class="sm:col-span-3">
            <h2 class="text-center font-serif">{conf.tagline}</h2>
            <p>{conf.description}</p>
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
