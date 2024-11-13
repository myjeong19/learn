<script>
	import Stepper from './stepper.svelte';

	let value = $state(0);
</script>

<p>The current value is {value}</p>

<Stepper increment={() => (value += 1)} decrement={() => (value -= 1)} />

<hr />
