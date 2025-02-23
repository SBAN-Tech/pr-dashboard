<script lang="ts">
    import '~/src/style.css';
    import conf from '~/src/config.toml';
    import { style } from 'svelte-body';
    import styles from '$lib/theme';
    import prism_theme from '$lib/prism-theme';
    import '$lib/cantarell.css';
    import '@fontsource-variable/noto-sans-jp';
    import '@fontsource/shippori-mincho';
    import '@fontsource-variable/jetbrains-mono';
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<svelte:head>
    <link rel="icon" href={conf.favicon} />
    {@html `<` + `style>${prism_theme}</style>`}
</svelte:head>

<svelte:body use:style={styles} />

{@render children?.()}
