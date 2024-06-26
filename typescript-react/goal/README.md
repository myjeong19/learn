# React + TypeScript

## Using TypeScript with React - Essentials

### Storing Props Types as a Custom Type or Interface

- props의 타입을 type과, interface로 설정하는 것은 취향 차이이다.

  - 다른 개발자에게 배포할 계획인 경우, 확장성이 있는 Interfeace를 선호할 수 있다.

  ```ts
  interface CourseGoalProps {
    title: string;
    description: string;
  }

  export default function CourseGoal({ title, description }: CourseGoalProps) {
    return (
      <article>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button>Delete</button>
      </article>
    );
  }
  ```

### Defing a Type for Props with "children"

```json
"@types/react": "^18.2.15",
"@types/react-dom": "^18.2.7",
```

위 패키지에는 추가 유형이 포함되어있다.

- ReactNode는 `children`의 타입을 정의할 때 사용할 수 있으며, 렌더링 가능한 모든 종류는 ReactNode 유형이다.

  ```tsx
  import { type ReactNode } from 'react';
  // import { PropsWithChildren } from 'react';

  interface CourseGoalProps {
    title: string;
    children: ReactNode;
  }

  // type CourseGoalProps = PropsWithChildren<{ title: string }>; interface의 대체 접근 방식

  export default function CourseGoal({ title, children }: CourseGoalProps) {
    return (
      <article>
        <div>
          <h2>{title}</h2>
          {children}
        </div>
        <button>Delete</button>
      </article>
    );
  }
  ```

### Another Way Of Typing Components

화살표 함수와 FC(Functional Component)를 사용해 컴포넌트를 정의할수도 있다.

```tsx
import { type FC, PropsWithChildren } from 'react';

type CourseGoalProps = PropsWithChildren<{ title: string }>;

const CourseGoal: FC<CourseGoalProps> = ({ title, children }) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
};

export default CourseGoal;
```

### Exercise: Creating a Header Component

... 연산자를 사용하면 간편하게 속성을 할당할 수 있다.

```tsx
import { PropsWithChildren } from 'react';

type HeaderImages = {
  src: string;
  alt: string;
};

type HeaderProps = PropsWithChildren<{
  image: HeaderImages;
}>;

export default function Header({ children, image }: HeaderProps) {
  return (
    <header>
      <img {...image} />
      <h1>{children}</h1>
    </header>
  );
}
```

### Using useState() and TypeScript

배열과 같은 복잡한 타입의 상태를 관리할 때는 제네릭 타입을 사용해야한다.

```ts
const [goals, setGoals] = useState<CourseGoal[]>([]);
// or
// const [goals, setGoals] = useState<Array<CourseGoal>>([])
```

### Working with Generic Event Types

1. useState

2. FormData

- event.currentTarget은 Form 요소와 데이터를 의미하지만, 타입스크립트는 이 접근방식을 이해하지 못해 오류가 발생하며,  
  FormEvent가 Generi 타입인 이유는, onSubmit의 props에서 나오기 때문이다.
  이때, `FormEvent<HTMLFormElement>` 이렇게 명시하면, 오류를 해결할 수 있다.

```tsx
export default function NewGoal({ onAdd }: NewGoalProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    new FormData(event.currentTarget);
  }
```

3. Refs

   ```tsx
   const refGoal = useRef<HTMLInputElement>(null);
   const refSummary = useRef<HTMLInputElement>(null);

   function handleSubmit(event: FormEvent<HTMLFormElement>) {
     event.preventDefault();

     const enteredGoal = refGoal.current!.value;
     const enteredSummary = refSummary.current!.value;

     event.currentTarget.reset();

     onAddGoal(enteredGoal, enteredSummary);
   }
   ```

## Advanced Component Types = Dynamic Components, Polymorphic Components & More

### Solution: Building Components with Discriminated Unions

- 구별된 유니온 (Discriminated Union)

  - 구별된 유니온을 사용하면, props를 선택적으로 사용할 수 있다.

    ```tsx
    import { ReactNode } from 'react';

    type HintBoxProps = {
      mode: 'hint';
      children: ReactNode;
    };

    type WarningBoxProps = {
      mode: 'hint' | 'warning';
      severity: 'low' | 'medium' | 'high';
      children: ReactNode;
    };

    type InfoBoxProps = HintBoxProps | WarningBoxProps;

    export default function InfoBox(props: InfoBoxProps) {
      const { mode, children } = props;

      if (mode === 'hint') {
        return (
          <aside className="infobox infobox-hint">
            <p>{children}</p>
          </aside>
        );
      }

      const { severity } = props;

      return (
        <aside className={`infobox infobox-warning warning--${severity}`}>
          <h2>Warning</h2>
          <p>{children}</p>
        </aside>
      );
    }
    ```
