<script lang="ts">
    let first: HTMLInputElement;    

    export let value: number;
    let v = [`00${Math.floor(value /60)}`.slice(-2), `00${value % 60}`.slice(-2)];
    $: v = [`00${Math.floor(value /60)}`.slice(-2), `00${value % 60}`.slice(-2)];

    const oninput = (i: number) => {
        v[i] = `00${v[i]}`.replaceAll(/[^0-9]/g, '').slice(-2);
        value = parseInt(v[0]) * 60 + parseInt(v[1]);
    }
</script>

<label class="flex flex-row gap-[0.15rem]" id="duration" on:click={() => first.click()}>
    <input type="text" pattern="[0-9][0-9]" class="ml-1" bind:this={first} bind:value={v[0]} on:input={() => oninput(0)} />
    m
    <input type="text" pattern="[0-9][0-9]" bind:value={v[1]} on:input={() => oninput(1)} />
    s
</label>
