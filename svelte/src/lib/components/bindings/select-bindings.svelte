<script lang="ts">
	let questions = $state([
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	]);

	type Selected = { id: number; text: string };

	let selected: Selected = $state(questions[0]);

	let answer = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}
</script>

<h2>Insecurity questions</h2>

<form class="flex flex-col" onsubmit={handleSubmit}>
	<select
		class="w-60 bg-slate-500 p-1 text-white"
		bind:value={selected}
		onchange={() => (answer = '')}
	>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button class=" w-20 rounded bg-blue-400 p-3 text-white" disabled={!answer} type="submit">
		Submit
	</button>
</form>

<p>
	selected question {selected ? selected.id : '[waiting...]'}
</p>

<hr />
