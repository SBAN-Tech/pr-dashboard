<script lang="ts">
    import conf from '~/src/config.toml';
    import { eachDayOfInterval } from 'date-fns';
    import { format } from 'date-fns-tz';

    let first: HTMLInputElement;    

    let v = [format(conf.start, "yyyy-MM-dd", { timeZone: conf.timezone }), format(conf.start, "HH", { timeZone: conf.timezone }), format(conf.start, "mm", { timeZone: conf.timezone })];
    export let value = `${v[0]}T${v[1]}:${v[2]}`;

    const oninput = (i: number) => {
        v[i] = `00${v[i]}`.replaceAll(/[^0-9]/g, '').slice(-2);
        value = `${v[0]} ${v[1]}:${v[2]}:00`;
    }
</script>

<div class="w-full grid grid-cols-3 gap-2">
    <select bind:value={v[0]} class="col-span-1">
        {#each eachDayOfInterval({start: conf.start, end: conf.end}) as d}
            <option value={format(d, "yyyy-MM-dd", { timeZone: conf.timezone })}>
                {format(d, "M/d", { timeZone: conf.timezone })}
            </option>
        {/each}
    </select>

    <label class="flex flex-row gap-[0.15rem] col-span-2" id="duration" on:click={() => first.click()}>
        <input type="text" pattern="[0-9][0-9]" class="ml-1" bind:this={first} bind:value={v[1]} on:input={() => oninput(1)} />
        :
        <input type="text" pattern="[0-9][0-9]" bind:value={v[2]} on:input={() => oninput(2)} />
    </label>
</div>
