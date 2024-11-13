<script lang="ts">
	let m = $state({ x: 0, y: 0 });

	function onpointermove(event: MouseEvent) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<div class="w-full p-5" {onpointermove}>
	<p>The pointer is at {Math.round(m.x)} x {Math.round(m.y)}</p>
	<hr />
</div>
