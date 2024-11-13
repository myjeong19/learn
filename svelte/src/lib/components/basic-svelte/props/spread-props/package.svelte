<script>
	import PackageInfo from './package-info.svelte';

	const pkg = {
		name: 'svelte',
		version: 5,
		description: 'blazing fast',
		website: 'https://svelte.dev'
	};
</script>

<h2>Spread Props</h2>
<PackageInfo {...pkg} />

<hr />
