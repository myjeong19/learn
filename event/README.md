# React-Router SPA

## a와 Link

- `a`를 사용해 페이지를 전환을 시도하는 경우, 새로고침이 발생한다.
- `Link`를 사용시, HTTP 요청을 전송하는 브라우저 기본 설정을 막을 수있다.

## 레이아웃

- `children`, `Outlet`을 사용하면 레이아웃을 반영할 수 있다.

  ```jsx
  const router = createBrowserRouter([
      {
          path: '/'
          element: <LayoutCompoenet />
          children: [
              { path: '/' element <ChildComponent/>}
          ]
      }
  ])
  ```

- `<LayoutCompoenet/>`는 `<ChildComponent/>`의 부모 라우트 역할을 하게 된다.
- /postlist 라는 주소가 있는 경우, 부모인 postlist를 생략하고 이후 주소를 추가할 수 있게되며,
- 부모 라우트가 될 컴포넌트에 React-Router의 훅인 `Outlet`을 사용하면,  
  라우터들의 Wrapper Component 역할을 할 수 있다.

  ```jsx
  import { Outlet } from 'react-router-dom';

  function Layout() {
    return (
      <>
        <h1>Layout Component</h1>
        <Outlet />
      </>
    );
  }
  ```

## `errorElement`

- `errorElement` 속성을 사용하면 오류 발생 시, 오류 페이지를 보여줄 수 있다.

  ```jsx
  const router = createBrowserRouter([
     {
          path: '/'
          element: <LayoutCompoenet />
          children: [
              { path: '/' element <ChildComponent/> errorElement: <ErrorComponent/>}
          ]
     }
  ])
  ```

## `NavLink`와 `isActive`, `end`

- `NavLink` 훅을 사용하면 활성중인 링크를 강조할 수 있다.
- `NavLink`의 className은 함수를 값으로 받을 수 있으며,
- 불리언 값을 반환하는 `isActive`와, `isPending`속성을 가진 객체를 매개변수로 받을 수 있다.

  ```jsx
  <NavLink
    className={({ isActive }) => (isActive ? 'classes.active' : null)}
  ></NavLink>
  ```

- 하지만, `NavLink`는 현재 활성중인 라우트를 경로가 `NavLink`의 `to`로 시작하는지
  확인하기 때문에, 의도치 않은 강조 표현이 만들어 질 수 있다.
  - 이때 `NavLink`에 `end` 속성을 부여할 수있다.  
    `end`는 불리언 값으로 설정할 수 있으며, 기본 값은 true이며,  
    현재 활성중인 링크 경로의 끝과 일치할 때만 활성 할 수 있다.

## `useNavigate()`

- `useNavigate()` 훅을 사용하면, 강제로 이동시킬 수가 있다.

  ```jsx
  const handleNavitate = () => {
    navigate(url);
  };
  ```

## `:`를 사용한 동적 라우터 정의와 `useParams()`

- 게시글의 상새 내용의 URL을 일일이, `path`를 사용해 설정 하는 것은 현실적인 방법이아니다.
- `:`을 사용하면, 동적인 라우터 설정이 가능하다.

`usePrams()` 훅을 사용하면, :이후 URL을 읽어올 수 있다.

## 상대 경로와 절대 경로

- 절대 경로

  - 경로의 앞에 /가 붙는 경우, 이를 절대 경로라한다.
    - 부모 라우트의 경로 뒤에 자식 라우트의 경로가 첨부되기에  
      자식 라우트에 절대 경로를 사용하는 경우, 충돌이 발생할수 있다.
    - 절대 경로는 현재 활성중인 경로 바로 뒤에 추가되지 않는다.
      - 하지만 상대 경로는 현재 활성중인 경로 뒤에 추가될 수 있다.

- `Link`의 `relative` 속성은

- `to`의 값으로 `..`를 할당할 수 있으며, `..`는
  현재 활성 경로의 한단계 위인 부모 라우트로 돌아가게 된다.

  - 이때 `Link`의 속성인 `relative`를 사용할 수 있다.
    `relative`의 값으로`route`와, `path`를 받을 수 있으며,
    기본 값은 `route`이다.
    - `relative`의 값으로 `path`를 할당하게 될 경우, 부모 라우트가 아닌, 현재 활성된 라우트를 기준으로,
      하나의 세그먼트(/)를 제외한 경로로 이동하게 된다.
      - `to`의 경로가 절대 경로인 경우, `relative`를 할당할 이유는 없다.

- route 객체의 속성 `index`와 인덱스 라우트

  - `index`의 값으로 `true`를 할당하면 인덱스 라우트가 된다.
    인덱스 라우트는 부모 라우트가 현재 활성이면 표시되어야 함을 의미한다.

## `loader()`

### `loader()` 사용을 고려해볼 이유

- 보일러 플레이트 코드(Boilerplate code): 최소한의 변경으로,
  여러곳에서 재사용되며 반복적으로 비슷한 형태를 띄는 코드.

- `useEffect()`를 사용한 백엔드와 HTTP 통신은 항상 반복해야하는 일종의 보일러 플레이트 코드이다.

  - 요청은 페이지에 도달한 경우에만 전송된다. 이러한 점은,  
    즉 요청을 전송하기 전에, 모든 컴포넌트들은 렌더링하고 평가하게 된다는 의미이기에 고려해볼 사항이된다.
    - React Router 6버전 이후 부터, 먼저 데이터를 가져오고, 컴포넌트를 렌더링할 수 있게 되었다.

- 이것을 가능하게 해주는 것은 `loader` 속성이다

  ```jsx
     {path: '/', element: <Component/>, loader:()=>{}}
  ```

- `loader`는 함수를 값으로 취한다.
- React Router에 의해 `loader`는 렌더링하기 직전에 항상 호출한다.

  - React Router는 `loader`가 작업을 완료할 때 까지 렌더링을 지연한다.

- `loader`를 백엔드와 HTTP 통신에 사용하게 되면, 통신의 응답 값을 받을 수 있게되며,  
  React Router는 `loader`가 반환하는 모든 값을 자동으로 취하며,  
  `Promise`를 반환한다.

  - React Router는 이때, `Promise`가 반환되었는지 확인하고, `Promise`로 부터 resolving된 데이터를 받게된다.

    - resolving: 해결된

### React Router의 `useLoaderData` 훅을 사용해 `loader` 반환 값 접근하기

- `loader`의 값은 필요로하는 컴포넌트에 전달 할 수 있다.

  - React Router의 `useLoaderData` 훅을 사용하면 `loader`의 반환 값에 접근할 수 있다.

  ```jsx
  const loaderData = useLoaderData();
  ```

- `useLoaderData` 훅은 가장 가까운 `loader` 함수에 접근하며, `Promise`가 산출하는 최종 데이터를 받는다.
- `loader`를 사용하게 되면, 컴포넌트를 가볍게 만들 수 있다.

- `useLoaderData`는 `loader`를 정의한 라우트의 부모 라우트에서는 값을 받을 수 없다.

#### useRouteLoaderData를 사용하면, 상위 loader에 접근하기

- `id` 속성을 라우트 객체에 정의하고,  
  `useRouteLoaderData`에 `id` 값을 할당하면,
  상위 loader에 접근할 수 있다.

```jsx
{ path: ':eventId' loader: eventDetailLoader, children: [], id: accessId}
```

### `loader` 사용 시, 권장사항

- `loader`는 데이터가 필요한 컴포넌트의 간소화를 도와주지만,  
  라우터를 설정하는 App 파일의 복잡도를 향상시킬 수 있다.

  - 그렇기에 필요로하는 컴포넌트 파일에 `loader`를 정의하는 것이 권장된다.

- Component.js

  ```jsx
  function Component() {
    return <></>;
  }
  export default Component
  export const loader = async () => {...}

  ```

- App.js

  ```jsx
  import Component, { loader as componentLoader} from './pages/Component';
  ...
      {path: '/', element: <Component/>, loader:componentLoader }
  ...
  ```

### 응답 반환하기

- `loader`는 서버가 아닌 브러우저에서 실행되며,
  브라우저에 내장된, `new Response()`를 사용하면, 응답 객체를 커스텀할 수 있다.

  - `loader`의 내부에서 React 훅을 사용할 수 없다.

  - 어떤 브라우저 API도, `loader`에서 사용할 수 있다.

- `loader`와, `fetch`를 사용해, 응답 객체를 취하고 loader에서 리턴할 수 있다.

- `throw`를 사용해, 오류 메시지를 커스텀할 수 있다.

  - `throw`를 사용해 오류를 던지는 경우, React Router는 가장 근접한 오류 요소를 렌더링한다.

  ```jsx
     export const loader = async () => {
      const response = await fetch('http://localhost:8080/events');
      ...
     }
  ```

## 로딩 인디케이터를 렌더 하는 방법 `useNavigation` 훅

- `useNavigation` 훅을 사용하면, 현재 라우트의 전환 상태를 확인할 수 있다.

  ```jsx
  const navigation = useNavigation();
  navigation.state === '';
  ```

- `useNavigation`의 `state`는 idle, loading, submitting 세가지 값으로 비교할 수 있다.
  - 로딩 중인 경우 loading을 사용해 컴포넌트를 렌더링 할 수 있다.

## useRouterError와 json()을 사용한 유연한 오류 처리

- `new Response()`를 사용해, 오류를 구분할 수 있게 할 수 있다.

  ```jsx
  export const loader = async () => {
    ...
    if(!response.ok) {
      thorw new Response(JSON.stringify({message: '...'}, {status: ... }))
    }
  }
  ```

  - React Router의 훅인 `json`을 사용하면 위의 코드를 조금 더 간소화할 수 있다.

    - `json`은 json 형식의 데이터가 포함된 Response를 반환하며, 반환 값을 수동으로 파싱하지 않아도 된다.

      ```jsx
      return json(
        {message: ...}, {status: ...}
      )
      ```

- `useRouteError` 훅은 errorElement 내부에서, 로더 또는 렌더링 중에 던져지는 모든 것을 반환한다.

## `loader`에서 라우트 파라미터에 접근하기

- React Router는 `loader`를 호출 할 때 객체 하나를 함수에 전달한다.  
  그 객체는 요청 객체를 담고있는 `request`와, 라우트 파라미터가 담긴 `params` 두 가지 속성을 가지고 있다.

### `action`과 `<Form></Form>`을 사용해 입력 데이터 처리하기

- `Form` 태그는 백엔드로 요청을 전송하는 브라우저 기본 값을 생략할 수 있으며,  
  제출된 값을 `action`에 전달할 수 있다.

  - `Form`의 요청은 자동으로 백엔드로 전송되지 않는다.

- `action` 속성은 함수를 값으로 취급한다.

  `action` 함수는 객체를 값으로 받으며, 이 객체 속성으로 `request`와, `params`가 있다.

  - `request`는 Form에 제출된 데이터를 가지고 있다.

  ```jsx
  export const action = async = ({request, params}) => {
    const data = await request.fromData();
    // formData는 data 객체를 반환한다.

  const inputData = {
    inputValue: data.get('inputValue')
  // data.get() 을 사용하면, input의 값에 접근할 수 있다.
    ...
  }

    const response = await fetch('http://localhost:8080/events',
      {method: 'POST'},
      {headers: {'Content-Type': 'application/json'}}
      {body: JSON.stringify(inputData)})
    if(!response.ok) { throw json({...})}

    return redirect('/')
  }
  ```

#### action을 트리거 하는 방법

1. Form의 `action` 속성을 사용하는 방법

   - action의 값은 트리거 하려는 라우트 경로이다.

   ```jsx
   <Form action='action을 정의한 라우터 경로'></Form>
   ```

2. React Router의 `useSubmit`을 사용하는 방법

   - App.js

     ```jsx
     import Component, { loader as componentLoader} from './pages/Component';
     ...
       {path: '/', element: <Component/>, action: deleteAction}
     ...
     ```

   - Component.js

     ```jsx
     const submit = useSubmit()

     function startDeleteHandler () {
      ...
      if(procced) {
        submit({null, {
          method: 'delete',
          // action: 'action을 정의한 라우터 경로'
        }},)
        // submit()의 첫 번째 인자는 제출하기 위한 데이터이며, formData() 메서드로 추출할 수 있다.
        // 두 번째 인자는 객체로 form에서 설정할 수 있는 것과, 같은 값들을 설정할 수 있다.
      }
     }
     ```

     - `method`의 값을 설정한 경우, 동적으로 `method` 값을 `action`에 전달할 수 있다.

       ```jsx
       export const action = async ({paramsm request}) => {
         ...
         const response await fetch('...' + ... {
           method: request.method
         })
       }
       ```

#### action의 반환 값에 접근하기 `useActionData`

- `useActionData` 훅을 사용하면, action이 반환한 값에 접근할 수 있다.

### `useFetcher()`

- 레이아웃 같이, 재사용이 되는 컴포넌트에, `action`을 사용하는 경우,  
  필요한 모든 곳에 `action`을 추가해야하며, 다른 `action`과 충돌이 발생할 수도 있다.
  이때 `useFetcher` 훅을 사용하면 이를 해결할 수 있다.

  ```jsx
  const fetcher = useFetcher();

  return <fetcher.Form>...</fetcher.Form>;
  // `<fetcher.Form></fetcher.Form>`를 쓰면, 액션을 트리거하지만, 라우트 전환을 시작하진 않는다.
  ```

  - `fetcher.Form`은 action을 트리거하거나, loader 함수의 도움으로 loader를 트리거 할 수 있지만,  
    실제로 그 loader가 속한 페이지 또는, action 속한 페이지로 이동하지 않을 때 사용해야한다.

    - 즉, `useFetcher`는 전환하지 않은 채, action 혹은 loader와 상호작용하는 경우에 사용해야한다.

  - `useFetcher`는 `data` 속성을 사용해 `action` 혹은 `loader`가 반환한 데이터에 액세스 할 수 있다.

## React의 Suspense 훅과, React Router의 `defer`와, `Awiat` 훅 사용 하기

- 다수의 이미지를 로딩하는 경우, 렌더링이 다 되기전까지 빈화면을 노출한다.

  - 이때 React의 `Suspense` 훅과, React Router의 `defer`와,  
    `Awiat` 훅 사용해 이미지와 관련 없는 컴포넌트들을 렌더링 시킬 수 있다.

    - `Suspense` 훅은 데이터가 도착하길 기다리는 동안 fallback 값을 보여준다.

    - `defer`  
      `defer`를 사용하면 loader의 반환 값을 Resolving된 값 대신 Promise를 전달하여 지연 시킬 수 있다.
    - `Await` 지연된 값을 렌더링하는데 사용한다.
      - `Await`의 지연된 로더 값에서 반환된 Promise 를 확인하여 렌더링한다.

  - Events.js

    ```jsx
    function EventsPage () {
      const {events} = useLoaderData();
      return (
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={events}>
            {loadedEvents => <EventList events={loadedEvents}/>}
            // React Router가 실행 할 수 있는 함수여야한다.
           </Await>
        </Suspense>
       )
    };

    export default EventsPage

    async function loadEvents() {
      const response = await fetch('...');

      if (!response.ok) {
        throw ...
      }
    } else {
      const resData = await response.json();
      return resData.events
    }

    export function loader () {
      return defer({
        events: loadEvents()
      })
    }
    ```
