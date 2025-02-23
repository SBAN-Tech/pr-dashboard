<script lang="ts">
    import { run } from 'svelte/legacy';

    let first: HTMLInputElement = $state();    

    interface Props {
        value: number;
        isevent: boolean;
    }

    let { value = $bindable(), isevent }: Props = $props();
    let v = $state([`00${Math.floor(value / 3600)}`.slice(-2), `00${Math.floor((value % 3600) / 60)}`.slice(-2), `00${value % 60}`.slice(-2)]);
    run(() => {
        v = [`00${Math.floor(value / 3600)}`.slice(-2), `00${Math.floor((value % 3600) / 60)}`.slice(-2), `00${value % 60}`.slice(-2)];
    });

    const oninput = (i: number) => {
        v[i] = `00${v[i]}`.replaceAll(/[^0-9]/g, '').slice(-2);
        value = ((isevent) ? parseInt(v[0]) * 3600 : 0) + parseInt(v[1]) * 60 + parseInt(v[2]);
    }
</script>

<label class="flex flex-row gap-[0.15rem]" id="duration" onclick={() => first.click()}>
    {#if isevent}
        <input type="text" pattern="[0-9][0-9]" bind:this={first} bind:value={v[0]} oninput={() => oninput(0)} />
        h
    {/if}
    <input type="text" pattern="[0-9][0-9]" bind:value={v[1]} oninput={() => oninput(1)} />
    m
    <input type="text" pattern="[0-9][0-9]" bind:value={v[2]} oninput={() => oninput(2)} />
    s
</label>
