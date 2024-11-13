<script lang="ts">
	import Thing from './item.svelte';
	import { fruits } from './utils';

	let things = $state(fruits);
</script>

<button onclick={() => things.shift()}> Remove first thing </button>

<!-- Svelte는 내부적으로 Map을 사용하므로 어떤 객체든 키로 사용할 수 있습니다. -->
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}
