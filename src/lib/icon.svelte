<script lang="ts">
    import type { IconDefinition } from '@ant-design/icons-svg/lib/types';
    import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/lib/helpers'; // jsはCommonJSの形式じゃないと読み込めなくなってる?  
    export let icon: IconDefinition;
    let svg = renderIconDefinitionToSVGElement(icon, {
        extraSVGAttrs: { width: '1em', height: '1em', fill: 'currentColor' }
    });
</script>

{@html svg}