<script lang="ts">
    let first: HTMLInputElement;    

    export let value: number;
    export let isevent: boolean;
    let v = [`00${Math.floor(value / 3600)}`.slice(-2), `00${Math.floor((value % 3600) / 60)}`.slice(-2), `00${value % 60}`.slice(-2)];
    $: v = [`00${Math.floor(value / 3600)}`.slice(-2), `00${Math.floor((value % 3600) / 60)}`.slice(-2), `00${value % 60}`.slice(-2)];

    const oninput = (i: number) => {
        v[i] = `00${v[i]}`.replaceAll(/[^0-9]/g, '').slice(-2);
        value = ((isevent) ? parseInt(v[0]) * 3600 : 0) + parseInt(v[1]) * 60 + parseInt(v[2]);
    }
</script>

<label class="flex flex-row gap-[0.15rem]" id="duration" on:click={() => first.click()}>
    {#if isevent}
        <input type="text" pattern="[0-9][0-9]" bind:this={first} bind:value={v[0]} on:input={() => oninput(0)} />
        h
    {/if}
    <input type="text" pattern="[0-9][0-9]" bind:value={v[1]} on:input={() => oninput(1)} />
    m
    <input type="text" pattern="[0-9][0-9]" bind:value={v[2]} on:input={() => oninput(2)} />
    s
</label>
