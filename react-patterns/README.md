# 리액트 패턴

## 합성 컴포넌트 패턴 (Compound Componets React Pattern)

- 합성 컴포넌트(Compound Componets)란 스스로 동작하지 않는 컴포넌트를 의미한다.

  - HTML 내장 된 두 요소 `<select>`와, `<option>`을 의미하며, 합성 요소 또는 함성 컴포넌트라고 한다.
  - 리액트에서 이런 종류의 컴포넌트를 직접 만들 수 있으며, 특정 상황에서 필요하다.

- 아코디언

  - 한 요소를 열면, 다른 요소들은 닫아야 하므로, 이 요소들은 서로에 대해 알아야한다.

- 컨텍스트 API로 멀티 컴포넌트 상태 관리하기

  - Accordio.jsx

        ```jsx
        import { createContext, useState, useContext } from "react";

        const AccordionContext = createContext();

        export const useAccordionContext = () => {
        const ctx = useContext(AccordionContext);

        if (!ctx) {
            throw new Error("Accordion-related components must be wrapped by <Accordion>.");
        }

        return ctx;
        };

        export default function Accordion({ children, className }) {
        const [openItemId, setOpenItemId] = useState(null);

        const openItem = (id) => setOpenItemId(id);
        const closeItem = () => setOpenItemId(null);

        const contextValue = { openItemId, openItem, closeItem };

        return (
            <AccordionContext.Provider value={contextValue}>
            <ul className={className}>{children}</ul>
            </AccordionContext.Provider>
        );
        }
        ```

    - AccordionItem.jsx

      ```jsx
      import { useAccordionContext } from './Accordion';

      export default function AccordionItem({ id, className, title, children }) {
        const { openItemId, openItem, closeItem } = useAccordionContext();

        const isOpen = openItemId === id;
        // openItemId가 li의 id와 동일한지 여부 검사

        const handleClick = () => {
          if (isOpen) {
            closeItem();
          } else {
            openItem(id);
          }
        };

        return (
          <li className={className}>
            <h3 onClick={handleClick}>{title}</h3>
            <div className={isOpen ? 'accordion-item-content open' : 'accordion-item-content'}>{children}</div>
            // isOpen
          </li>
        );
      }
      ```

- 컴파운드 컴포넌트 그룹화

  - openItem과, closeItem을 합칠수도 있다.

        ```jsx
        const toggleItem = (id) => setOpenItemId((prevId) => (prevId === id ? null : id));
        ```

  - 함수 객체에 속성과 메서드를 추가할수도 있다.

    - Accordion.jsx

      ```jsx
      import AccordionItem from "./AccordionItem";

        ...

      Accordion.Item = AccordionItem;
      ```

- 재사용성 및 구성 가능성을 위한 추가적인 컴포넌트 추가하기

  - 추가 컴포넌트를 사용하여 높은 재사용성과 가장 중요한 구성성을 얻을 수 있다.

  - Accordion.jsx

        ```jsx
        import AccordionItem from "./AccordionItem";

        import AccordionTitle from "./AccordionTitle";
        import AccordionContent from "./AccordionContent";

        ...

        Accordion.Item = AccordionItem;
        Accordion.Title = AccordionTitle;
        Accordion.Content = AccordionContent;
        ```

  - AccordionItem.jsx

    ```jsx
    export default function AccordionItem({ className, children }) {
      return <li className={className}>{children}</li>;
    }
    ```

  - AccordionTitle.jsx

    ```jsx
    import { useAccordionContext } from './Accordion';

    export default function AccordionTitle({ id, className, children }) {
      const { toggleItem } = useAccordionContext();

      const handleClick = () => toggleItem(id);

      return (
        <h3 className={className} onClick={handleClick}>
          {children}
        </h3>
      );
    }
    ```

  - AccordionContent.jsx

    ```jsx
    import { useAccordionContext } from './Accordion';

    export default function AccordionContent({ id, className, children }) {
      const { openItemId } = useAccordionContext();

      const isOpen = openItemId === id;

      const activeAccordion = isOpen ? `${className ?? ''} open` : `${className} close`;

      return <div className={activeAccordion}>{children}</div>;
    }
    ```

- 컴파운드 컴포넌트로 작업할 때 교차 컴포넌트 상태 공유
  - AccordionTitle, AccordionContent 각각의 컴포넌트에 context를 사용하여, id를 넘겨줄 수 있다.

```jsx
import { createContext, useContext } from 'react';

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error('AccordionItem-related components must be wrapped by <Accordion.Item>.');
  }

  return context;
}

export default function AccordionItem({ id, className, children }) {
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}
```

## Render Props 패턴

- Render Props 패턴은 컴포넌트 함수를 값으로 전달하여, 재사용과 검색 가능한 목록 컴포넌트를 만드는 패턴이다.
  - 함수를 값으로 어느 prop이든 상관 없지만, 주로 children prop에 전달한다.
    - 함수를 정의하는 컴포넌트가 렌더 가능한 것을 반환해야하며, 이 함수가 child props의 값으로 전달 된다.
