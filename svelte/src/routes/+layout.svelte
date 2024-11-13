<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/state">state</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/props">props</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/logic">logic</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/events">events</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/bindings">bindings</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/class-and-styles">class-and-styles</a
	>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/actions">actions</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/transitions">transitions</a>
</nav>

{@render children()}
