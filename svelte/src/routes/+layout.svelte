<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/state">state</a>
	<a class="w-20 rounded bg-black px-3 py-1 text-white" href="/props">props</a>
</nav>

{@render children()}
