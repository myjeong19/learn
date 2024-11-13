<script lang="ts">
	type StepperProps = {
		increment: () => void;
		decrement: () => void;
	};

	let { increment, decrement }: StepperProps = $props();
</script>

<button onclick={increment}>+1</button>
<button onclick={decrement}>-1</button>
