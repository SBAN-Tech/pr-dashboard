<script lang="ts">
    import { page } from "$app/state";
    import Icon from '@iconify/svelte';
    import { SignIn, SignOut } from '@auth/sveltekit/components';
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
    {#if page.data.session}
        <SignOut title="ログアウト" class="pr_icon_button_outer text-xl ml-auto">
            <div slot="submitButton">
                <Icon icon="heroicons:arrow-left-start-on-rectangle-solid" />
            </div>
        </SignOut>
    {:else}
        <SignIn title="ログイン" class="pr_icon_button_outer text-xl ml-auto">
            <div slot="submitButton">
                <Icon icon="heroicons:arrow-left-end-on-rectangle-solid" />
            </div>
        </SignIn>
    {/if}

</header>

<div class="content">
    {@render children?.()}
</div>
