<script lang="ts">
    import conf from '~/src/config.toml';
    import { DateTime } from 'luxon';
    import { DateUtils } from '$lib/date';

    let first: HTMLInputElement;    

    export let value: string;
    let v = value.split(/T|\s|:|\+/).slice(0, 3);
    $: v = value.split(/T|\s|:|\+/).slice(0, 3);

    const onselect = () => {
        value = `${v[0]}T${v[1]}:${v[2]}:00${DateTime.now().setZone(conf.timezone).toFormat("ZZ")}`;
    }
    const oninput = (i: number) => {
        v[i] = `00${v[i]}`.replaceAll(/[^0-9]/g, '').slice(-2);
        value = `${v[0]}T${v[1]}:${v[2]}:00${DateTime.now().setZone(conf.timezone).toFormat("ZZ")}`;
    }
</script>

<div class="w-full grid grid-cols-3 gap-2">
    <select bind:value={v[0]} on:change={onselect} class="col-span-1">
        {#each DateUtils.eachDays(DateUtils.defaultDate(conf.start, conf.end), conf.end, conf.timezone) as d}
            <option value={d?.toFormat("yyyy-MM-dd")}>
                {d?.toFormat("M/d")}
            </option>
        {/each}
    </select>

    <label class="flex flex-row gap-[0.15rem] col-span-2" id="duration" on:click={() => first.click()}>
        <input type="text" pattern="[0-9][0-9]" class="ml-1" bind:this={first} bind:value={v[1]} on:input={() => oninput(1)} />
        :
        <input type="text" pattern="[0-9][0-9]" bind:value={v[2]} on:input={() => oninput(2)} />
    </label>
</div>
