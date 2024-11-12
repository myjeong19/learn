<script>
	let elapsed = $state(0);
	let interval = $state(1000);

	$effect(() => {
		const id = setInterval(() => {
			elapsed += 1;
		}, interval);

		// cleanup function은 간격이 변경되거나, 구성 요소가 소멸 될 때 effect 함수가 다시 실행되기 직전에 호출됩니다.
		// effect 함수가 실행될 때 어떤 상태도 읽지 않으면, 구성 요소가 마운트 될 때 한번만 실행 된다.
		// ! server-side rendering 중에는 effect가 실행되지 않는다.

		return () => {
			clearInterval(id);
		};
	});
</script>

<button onclick={() => (interval /= 2)}>speed up</button>
<button onclick={() => (interval *= 2)}>slow down</button>

<p>elapsed: {elapsed}</p>
