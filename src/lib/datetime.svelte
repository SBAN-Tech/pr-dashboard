<script lang="ts">
    import conf from '$lib/../config.toml';
    import { eachDayOfInterval } from 'date-fns';
    import { format } from 'date-fns-tz';

    let first: HTMLInputElement;    

    export let value = [format(conf.start, "yyyy-MM-dd", { timeZone: conf.timezone }), "00", "00"];

    const oninput = (i: number) => {
        value[i] = `00${value[i]}`.replaceAll(/[^0-9]/g, '').slice(-2);
    }
</script>

<div class="grid grid-cols-3 gap-2">
    <select bind:value={value[0]} class="col-span-1">
        {#each eachDayOfInterval({start: conf.start, end: conf.end}) as d}
            <option value={format(d, "yyyy-MM-dd", { timeZone: conf.timezone })}>
                {format(d, "M/d", { timeZone: conf.timezone })}
            </option>
        {/each}
    </select>

    <label class="flex flex-row gap-[0.15rem] col-span-2" id="duration" on:click={() => first.click()}>
        <input type="text" pattern="[0-9][0-9]" class="ml-1" bind:this={first} bind:value={value[1]} on:input={() => oninput(0)} />
        :
        <input type="text" pattern="[0-9][0-9]" bind:value={value[2]} on:input={() => oninput(1)} />
    </label>
</div>