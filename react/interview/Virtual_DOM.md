# What is virtual DOM

1. What makes REact so powerful?

   - Virtual DOM

2. What is Virtual DOM?

   - 가상 돔(Virtual DOM)은 선언문에 사용되는 DOM 또는, 문서 개체 모델의 경량 JavaScript 표현이다.
   - DOM 트리가 있고, 브라우저 내부에서 무언가를 렌더링 하는 경우, 이 DOM 내부에서 DOM Node를 만들어야한다.
     이것은 느린 과정이며, jQuery 같은 것들이, 그다지 효율적이지 않은 이유이다.

     - DOM Node를 그대로 사용하면, 코드가 많아지며 복잡해진다.

- React는 트리와 같은 구성요소를 생성한 다음 전체 애플리케이션을 생성하는 선언적 방식을 가지고 있어,
  브라우저 내부에서 DOM 트리에 대한 지식 없이 단순한 작업을 한다.
  React는 내부에 가상 DOM을 사용해, Component 트리를 만든 다음 React는 Component로 부터, 가상 돔을 구축한다.

  - 가상돔은 실제 DOM을 표현하는 거대한 객체이다. DOM 내부에는 5개의 DOM Node가 있다.
    - React는 이전 상태와 새 상태를 비교할 때 DOM을 직접 사용하지 않는다.
      먼저 가상 DOM을 통해, JavaScript 내부의 변경 사항을 비교하고, 일부 변경 사항을 적용한 경우에만 이를 반영한다.
      이러한 방식은 실제 DOM을 사용하게 하여 작업을 매우 빠르게 만들어 주며, 우리가 코드를 작성하는 데 있어서 더욱 효율적으로 하게 해준다.

3. What is the difference between Virtual DOM and Shadow DOM?

   - 이 두가지는 전혀 관련 없다.

   - Shadow DOM을 사용하면 숨겨진 DOM 트리를 일반 DOM 트리 내부 요소에 연결할 수 있다.
