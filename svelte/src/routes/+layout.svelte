<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<h1>
	<a href="/" class="text-2xl font-bold"> Home</a>
</h1>

<strong>Basic Svelte</strong>

<nav class="mb-3">
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/state">state</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/props">props</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/logic">logic</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/events">events</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/bindings">bindings</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/class-and-styles"
		>class-and-styles</a
	>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/actions">actions</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/basic-svelte/transitions"
		>transitions</a
	>
</nav>

{@render children()}
