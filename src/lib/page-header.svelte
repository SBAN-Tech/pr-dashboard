<script lang="ts">
    interface Props {
        title: string;
    }
    let { title }: Props = $props();
</script>

<h1 class="text-center mt-4">{title}</h1>
