<script>
	import { counter } from './counter.svelte';
</script>

<button onclick={() => (counter.count += 1)}>
	clicks: {counter.count}
</button>
