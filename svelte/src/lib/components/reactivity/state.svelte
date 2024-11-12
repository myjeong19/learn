<script>
	// state
	let count = $state(0);
	const increment = () => (count += 1);

	// deep state
	let numbers = $state([1, 2, 3, 4]);
	const addNumber = () => {
		numbers.push(numbers.length + 1);
		// console.log(numbers);
		// ERROR. Your `console.log` contained `$state` proxies. Consider using `$inspect(...)` or `$state.snapshot(...)` instead
		console.log($state.snapshot(numbers));
	};

	// derived state
	// 일반 상태와 달리 파생 상태(derived state)는 읽기 전용입니다.
	let total = $derived(numbers.reduce((t, n) => t + n, 0));

	// inspect
	// $inspect 룬을 사용하여 상태가 변경될 때마다 자동으로 스냅샷을 기록할 수 있습니다. 이 코드는 프로덕션 빌드에서 자동으로 제거됩니다.
	$inspect(numbers).with(console.trace);
</script>

<div>
	<h2>State</h2>

	<button onclick={increment}>
		Clicked {count}
		{count === 1 ? 'time' : 'times'}
	</button>
	<hr />
</div>

<div>
	<h2>Deep State & Derived & Inspecting</h2>

	<p>{numbers.join(' + ')} = ...{total}</p>
	<button onclick={addNumber}> Add a number </button>

	<hr />
</div>
