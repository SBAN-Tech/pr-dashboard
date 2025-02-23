<script lang="ts">
    import conf from '~/src/config.toml';
    import { DateTime } from 'luxon';
    import { DateUtils } from '$lib/date';

    export let value: string;
    let v = [DateUtils.getDate(new Date(value)), DateUtils.getTime(new Date(value))];
    $: v = [DateUtils.getDate(new Date(value)), DateUtils.getTime(new Date(value))];

    const onselect = () => {
        value = `${v[0]}T${v[1]}:00${DateTime.now().setZone(conf.timezone).toFormat("ZZ")}`;
    }
    const oninput = () => {
        value = `${v[0]}T${v[1]}:00${DateTime.now().setZone(conf.timezone).toFormat("ZZ")}`;
    }
</script>

<div class="w-full grid grid-cols-3 gap-2">
    <select bind:value={v[0]} on:change={onselect} class="col-span-1">
        {#each DateUtils.eachDays(DateUtils.defaultDate(conf.start, conf.end), conf.end) as d}
            <option value={d?.toFormat("yyyy-MM-dd")}>
                {d?.toFormat("M/d")}
            </option>
        {/each}
    </select>

    <input type="time" step={60} on:change={oninput} bind:value={v[1]} class="col-span-2">
</div>
