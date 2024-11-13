<script>
	let flipped = $state(false);
</script>

<div class="container">
	Flip the card
	<button class="card" class:flipped onclick={() => (flipped = !flipped)}>
		<div class="front">
			<span class="symbol">♠</span>
		</div>
		<div class="back">
			<div class="pattern"></div>
		</div>
	</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		height: 100%;
		align-items: center;
		justify-content: center;
		perspective: 100vh;
	}

	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		font-size: min(1vh, 0.25rem);
		height: 80em;
		background: var(--bg-1);
		border-radius: 2em;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
	}

	.card.flipped {
		transform: rotateY(0);
	}

	.front,
	.back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid gray;
		box-sizing: border-box;
		padding: 2em;
	}

	.front {
		background:
			url(./svelte-logo.svg) no-repeat 5em 5em,
			url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
		background-size:
			8em 8em,
			8em 8em;
	}

	.back {
		transform: rotateY(180deg);
	}

	.symbol {
		font-size: 30em;
		color: var(--fg-1);
	}

	.pattern {
		width: 100%;
		height: 100%;
		background-color: var(--bg-2);
		background-color: #6d695c;
		background-image: repeating-linear-gradient(
				120deg,
				rgba(255, 255, 255, 0.1),
				rgba(255, 255, 255, 0.1) 1px,
				transparent 1px,
				transparent 60px
			),
			repeating-linear-gradient(
				60deg,
				rgba(255, 255, 255, 0.1),
				rgba(255, 255, 255, 0.1) 1px,
				transparent 1px,
				transparent 60px
			),
			linear-gradient(
				60deg,
				rgba(0, 0, 0, 0.1) 25%,
				transparent 25%,
				transparent 75%,
				rgba(0, 0, 0, 0.1) 75%,
				rgba(0, 0, 0, 0.1)
			),
			linear-gradient(
				120deg,
				rgba(0, 0, 0, 0.1) 25%,
				transparent 25%,
				transparent 75%,
				rgba(0, 0, 0, 0.1) 75%,
				rgba(0, 0, 0, 0.1)
			);
		background-size: 70px 120px;
	}
</style>
