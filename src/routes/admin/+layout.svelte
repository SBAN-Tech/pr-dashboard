<script lang="ts">
    import { page } from "$app/state";
    import Icon from '@iconify/svelte';
    import { signIn, signOut } from "@auth/sveltekit/client";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<header>
    <a href="/">
        <button title="戻る" class="pr_icon_button text-xl">
            <Icon icon="heroicons:chevron-left-solid" />
        </button>
    </a>
    <p class="text-xl">ダッシュボード</p>
    {#if page.data.session?.user}
        <button title="ログアウト" class="pr_icon_button text-xl ml-auto" onclick={() => signOut()}>
            <Icon icon="heroicons:arrow-left-start-on-rectangle-solid" />
        </button>
    {:else}
        <button title="ログイン" class="pr_icon_button text-xl ml-auto" onclick={() => signIn()}>
            <Icon icon="heroicons:arrow-left-end-on-rectangle-solid" />
        </button>
    {/if}

</header>

<div class="content">
    {@render children?.()}
</div>
