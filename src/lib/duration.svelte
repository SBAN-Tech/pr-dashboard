<script lang="ts">
    let first: HTMLInputElement;    

    export let value = ["00", "00"];

    const oninput = (i: number) => {
        value[i] = `00${value[i]}`.replaceAll(/[^0-9]/g, '').slice(-2);
    }
</script>

<label class="flex flex-row gap-[0.15rem]" id="duration" on:click={() => first.click()}>
    <input type="text" pattern="[0-9][0-9]" class="ml-1" bind:this={first} bind:value={value[0]} on:input={() => oninput(0)} />
    m
    <input type="text" pattern="[0-9][0-9]" bind:value={value[1]} on:input={() => oninput(1)} />
    s
</label>