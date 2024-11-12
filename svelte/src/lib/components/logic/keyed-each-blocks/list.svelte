<script lang="ts">
	import Thing from './item.svelte';
	import { fruits } from './utils';

	let things = $state(fruits);
</script>

<button onclick={() => things.shift()}> Remove first thing </button>

{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}
