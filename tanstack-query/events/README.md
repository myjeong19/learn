# TanStack Query

## `fetch`와, React 훅 `useState`와, `useEffect` 사용한 HTTP 통신 시, 잠재적 단점

- 많은 양의 코드를 작성해야한다.

  - 많은 양의 상태 또한 관리해야한다.
    - 이러한 점은 커스텀 훅을 사용하면 해결할 수 있지만, 여전히 몇 가지 문제점과 누락된 기능이 있다.
      - refetch 탭 이동 시, 표시된 데이터를 다시 최신으로 업데이트 하는 기능
      - 가져온 데이터를 캐시 처리하는 기능
        - 이미 가져왔던 데이터를 모두 다시 가져오는 것이 아니라,
          메모리에 저장된 데이터를 재사용 하면서, 업데이트된 데이터를 자체적으로 가져오는 기능

- TanStack Query를 사용하면, 이러한 점들을 해결할 수 있다.

## TanStack Query 훅 `useQuery`

```jsx
const { data, isPending, isError, error } = useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents,
});
```

- `useQuery`는 자체적으로 작동하며, HTTP 요청을 전송하고  
  필요한 이벤트 데이터를 가져오며, 로딩 상태에 대한 정보를 제공한다.

  - `useQuery`는 객체를 받으며,  
    이 객체의 속성 `queryFn`에 요청을 전송할 때 실행할 코드를 정의하며,  
    반드시 Promise를 반환하는 함수를 값으로 주어야 한다.

    - TanStack Query는 HTTP 요청을 전송하는 로직이 내장돼어있지 않다.  
      대신, 요청을 관리하는 로직을 제공한다. (요청과 관련된 데이터, 발생 가능한 오류 추적 등 ...)

      - 전송하는 로직에, axios 혹은 `fetch`를 사용할 수 있다.

    - TanStack Query는 `queryKey` 속성을 이용해,  
      요청으로 생성된 데이터를 캐시처리하기에, 이전 요청의 응답을 재사용할 수 있다.

      - 재사용하는 기간을 구성할 수도 있다.

      - `queryKey`는 값을 배열로 받고, TanStack Query는 이를 내부적으로 저장하며,  
        유사한 배열을 사용할 때마다, 배열을 검토하고 기존 데이터를 재사용한다.

      - `queryKey` 값의 수는 제한이 없고, 유형 또한 제약이 없다.

    - `useQuery`는 호출 시, 객체를 반환하며,  
      이 객체에서, 구조 분해를 사용해 `data`와 같은 값을 얻을 수 있다.

      - `data`의 값은 실제 응답 데이터이며 커스텀 함수인 `queryFn`의 값을 통해  
        반환되지만, 즉각적으로 이루어지진 않는다.

        - 반환 단계

          1. 요청 전송
          2. 요청의 응답 대기

    - `isPending`은 요청의 상태를 값으로 가진다.

    - `isError`는 오류의 응답을 받은 경우 True를 반환하며,  
      이 값을 True가 되기 위해선, 요청을 전송하는 함수에서  
      잘못된 응답을 반환하는 경우, 오류를 throw 해야한다.

    - `error`는 `isError`가 true인 경우, 오류에 대한 정보를 가진 객체를 값으로 가진다.

    - `referch`는 상호작용이 발생할 때 동일한 쿼리를 다시 전송할 수 있다.

## `useQuery`를 사용하기 위한 Provider TanStack Query 훅 `QueryClientProvider`과 `QueryClient`

- `QueryClient` 캐시와 상호작용 하는데 사용한다.

- `QueryClient`를 `QueryClientProvider`의 속성 client에 할당해야한다.

```jsx
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
```

## TanStack Query 동작 이해하기

- TanStack Query는 응답 데이터를 캐시 처리한다.

  - TanStackQuery는 `queryKey`를 이용해, 처리된 캐시의 존재 유무를 확인할 수 있으며,  
    확인과 동시에, `queryFn`의 요청을 내부적으로 다시 전송해서 업데이트된 데이터의 존재 유무를 확인하고,
    업데이트된 데이터가 있을시, 자체적으로 교체한다.

    - `staleTime` 속성을 이용하면 이 동작의 실행 여부를 제어할 수 있다.
      - 업데이트된 데이터를 가져오기 위한 요청을 자체적으로 전송하기 전에 대기할 시간을 설정할 수 있다.
        0: 자체적인 요청을 항상 전송 | 기본 값
        5000: 자체적인 요청을 5000밀리초 이후 전송.
    - `staleTime`을 사용하면 불필요한 요청 전송을 방지할 수 있다.

    - `gcTime` 가비지 수집 시간
      - 데이터와 캐시를 얼마나 보관할지 제어
        - 기본 값은 5분

  - 커스텀 `fetch`를 사용하게 될 경우, 다녀온 라우트를 돌아갈 경우 다시 데이터를 요청해야 한다.

- FindEventSection.jsx

  ```jsx
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm }],
    queryFn: () => {
      fetchEvents(searchTerm);
    },
    // 값을 넘겨주기 위해, 익명 함수 안에서 호출
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSerchTerm(searchElement.current.value);
    // useRef는 인풋 값과 연결되지만, 컴포넌트의 재평가를 발생시키지 않아,
    // useState의 값으로 할당
  }
  ```

- http.js

  ```js
  export const fetchEvents = async searchTerm => {
    let url = 'http://localhost:3000/events';
    // 기본 값

    if (searchTerm) {
      // 쿼리 파라미터가 있을 경우 재할당
      url += '?search=' + searchTerm;
    }

    const response = await fetch(url);

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { events } = await response.json();

    return events;
  };
  ```

- TanStack Query는 `queryFn`에, 기본적으로 데이터를 전달한다.  
   그 데이터는 `queryFn`의 값인 함수에 전달된다.  
   이때, 전달되는 데이터는 쿼리에 사용된 `queryKey`와,
  신호에 대한 정보를 제공하는 signal 객체이다.

  - signal은 요청을 취소할 때 필요하다.  
    예) 요청이 나가기 전 사용자가 페이지에서 이탈하는 경우
    - React는 자동으로 요청을 취소할 수 있는데 이때 signal 객체를 사용한다.
  - React Query는 필요한 `queryKey`를 `queryFn`에 제공하기 위해, 객체를 전달한다.

  - http.js

    ```js
    export const fetchEvents = async ({ signal, searchTerm }) => {
      let url = 'http://localhost:3000/events';

      if (searchTerm) {
        url += '?search=' + searchTerm;
      }

      const response = await fetch(url, signal);

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;
    };
    ```

  - FindEventSection.jsx

    ```jsx
    const { data, isPending, isError, error } = useQuery({
      queryKey: ['events', { search: searchTerm }],
      queryFn: () => fetchEvents({ searchTerm }),
    });
    ```

    - React Query가 제공하는 기본 객체를 바로 사용할시, 익명함수를 사용하지 않고 바로 값으로 할당하면 된다.

## 쿼리 활성화 비활성화 `enabled`

- `enbled`의 기본 값은 true이며, 값이 true인 경우 요청이 전송된다.

  ```jsx
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== null,
  });
  ```

- `isPending`과 `isLoading`의 차이
  `isLoading`은 쿼리가 비활성화여도 true가 되지 않는다.

## HTTP POST 요청 `useMutation`

- `useMutation`는 컴포넌트가 렌더링 되어도 즉시 요청을 전송하지 않기에,  
  데이터를 변경하는 쿼리에 최적화 된다.

  - 객체 구조 분해를 사용해, `muteate`를 받을 수 있다.

    - `useMutation`은 렌더링시, 실행되지 않으므로, `mutate()`는
      필요해 의해 호출해 사용할 수 있다.

    - `isPending` 또한 객체 구조 분해를 통해 얻을 수 있으며,
      요청의 상태를 불리언 값으로 반환하며, 진행 중일시, true를 반환한다.

    - `isError`와, `error`는 `useQuery`의 `isError`와 `error`를 사용하는 것과 동일하다.

      ```jsx
      const { data, isError, isPending } = useQuery({
        queryKey: ['event-images'],
        queryFn: fetchSelectableImages,
      });
      ```

## 작업 완료 까지 대기 `onSuccess`

- `onSuccess`는 mutation이 완료 될 때까지, 대기 후 호출된다.

  - `mutationFn`의 함수는 mutation이 완료되면 호출 되고, mutation이 성공한 경우에만, 다음 코드를 실행시킨다.

## 쿼리 무효화를 이용헤, 쿼리가 최신 데이터를 이용하게 하기

- 이전의 데이터가 만료됐다 표시하고, 다시 가져오도록 트리거 하기 위해선, 하나 이상의 쿼리를 무효화해야한다.

- http.js  
  NewEvent.jsx 에서 사용하기 위해, http.js에서 `import` 후, `export` 한다.

  ```js
  import { QueryClient } from '@tanstack/react-query';
  export const queryClient = new QueryClient();
  ```

- app.js

  ```js
  import { queryClient } from './util/http.js';
  ...
      <QueryClientProvider client={queryClient}>
  ...
  ```

- NewEvent.jsx  
  http.js `export`한 `queryClient`를 `import` 하고,
  mutation이 성공했을 때 실행되는 `onSuccess`의 함수 내부에, `queryClient`의 메소드 `invalidateQueries`를 호출한다.

  - `invalidateQueries`는 이름 그대로, 쿼리를 무효화 하며,  
    현재 렌더링된 컴포넌트와 관련된 쿼리가 실행된 경우, 특정 쿼리로 가져온 기존의 데이터를 만료로 표시하고,
    다시 가져오기를 트리거 해야한다고, React Query에게 알려준다.

    - `invalidateQueries`는 특정 쿼리를 대상으로 하기 위해 객체를 인자로 받으며,
      객체의 속성인 `queryKey`를 정의해야한다.

      - `queryKey`는 모든 쿼리에서 사용 중인 형식과 동일 해야한다.
        `queryKey`는 배열 안의 문자열이 포함된 모든 쿼리를 무효화 한다.

        - 또 다른 속성 `exact`의 값이 true인 경우, 포함이 아닌 정확히 일치하는 쿼리만 무효화한다.

  ```jsx
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    },
  });
  ```

## 활성 쿼리를 다시 가져오지 않기 `refetchType`

- 이벤트를 삭제한 후 모든 이벤트 관련 쿼리가 무효화 되지만,  
  여전히 세부 정보 페이지에 있기 때문에, React Query가 즉시 세부 정보 쿼리의 다시 가져오기를 트리거한다.

- `invalidateQueries` 객체의 속성 `refetchType`을 `none`으로 설정하면,  
  `invalidateQueries` 를 호출 할때, 기존 쿼리가 자동으로 다시 트리거 되지 않고,
  다음 요청이 발생 할때, 다시 실행된다.

## 즉각적 업데이트 반영하기

- `onMutate`는 `mutate`를 호출하는 즉시 실행된다.

- 일반적으로는 캐시되는 새 응답을 받을 때마다 React Query에서 수정하지만, `setQueryData`를 사용해 직접 저장된 데이터를 수정할 수도 있다.

  - `queryClient`의 메소드 `setQueryData`는, 이미 저장된 데이터를 응답을 기다리지 않고 수정할 수 있다.

  - `setQueryData`는 두개의 매개변수를 받는다.

    1. 편집하려는 쿼리의 키
    2. 쿼리 키 아래에서 저장하려는 새 데이터

    - `onMutate`의 매개변수는 React Query에서 전달받으며, `onMutate`의 값으로 `mutate`에 전달된다.

    - `queryClient`의 속성 `cancelQueries`을 사용하면, 특정 키의 모든 활성 쿼리를 취소할 수 있다.
      - `cancelQueries`의 값으로 객체를 전달하고, 객체 안에 취소할 `queryKey`를 정의한다.
      - `cancelQueries`는 Promise를 반환한다.

```jsx
const { mutate } = useMutation({
  mutationFn: updateEvent,
  onMutate: async data => {
    const newEvent = data.event;
    await queryClient.cancelQueries({ queryKey: ['events', params.id] });
    queryClient.setQueryData(['events', params.id], newEvent);
  },
});
```
