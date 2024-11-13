<script lang="ts">
	import { type Name, emojis } from './utils';

	let { name }: { name: Name } = $props();

	// ...but `emoji` is fixed upon initialisation
	const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
