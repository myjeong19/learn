<!--  캡처 단계 중에 핸들러가 대신 실행되기를 원할 수도 있습니다. 이벤트 이름 끝에 캡처를 추가합니다. -->
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
	<span> Capturing </span>
	<input class=" border-4 border-green-100" onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>
<hr />
