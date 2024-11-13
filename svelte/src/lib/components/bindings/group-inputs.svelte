<!-- 동일한 값과 관련된 여러 type="radio" 또는 type="checkbox" 입력이 있는 경우 value 속성과 함께 bind:group을 사용할 수 있습니다. -->
<!-- 동일한 그룹의 라디오 입력은 상호 배타적입니다. 동일한 그룹의 확인란 입력은 선택된 값의 배열을 형성합니다. -->

<script lang="ts">
	let scoops = $state(1);
	let flavours = $state([]);

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
	<label>
		<input type="radio" name="scoops" value={number} bind:group={scoops} />

		{number}
		{number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h2>Flavours</h2>

{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
	<label>
		<input type="checkbox" name="flavours" value={flavour} bind:group={flavours} />

		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops}
		{scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}

<hr />
