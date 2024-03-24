# TanStack Query

- TanStack Query는 클라이언트에서 서버 데이터 캐시를 관리한다.  
  React 에서, 서버 데이터가 필요할 때 axios, fetch를 사용해 바로 요청하지 않고,  
  TanStack Query 캐시를 요청한다.

## 클라이언트 상태와 서버 상태

### 클라이언트 상태 (Client State)

- 웹 브라우저 세션과 관련된 모든 정보를 의미한다.
  예) 다크모드와 같이 사용자의 상태를 추적하는 것

### 서버 상태 (Server State)

- 서버에 저장되지만, 클라이언트에 표시하는데 필요한 데이터를 의미한다.

## 역할

- TanStack Query 클라이언트를 어떻게 구성했느냐에 따라,  
  해당 캐시의 데이터를 유지 관리하는 것이다.
- 데이터를 관리하는 것은 TanStack Query이지만,  
  서버의 새 데이터로 캐시를 업데이트 하는 시기를 설정하는 건 사용자의 몫이다.

- 예를 들어, 캐시에는 blog-posts라는 키를 할당한 데이터가 있는 경우,  
  이 키는 데이터가 식별되는 방식이다.  
  클라이언트 캐시에 있는 이 데이터가, 서버의 데이터와 일치하는 지 확인하는 방법은 두 가지가 있다.

  1. 명령형으로 처리하는 방법  
     쿼리 클라이언트에 이 데이터를 무효화하고,  
     캐시에 교체할 새 데이터를 서버에서 가져오게 지시하는 방법

  2. 선언형으로 처리하는 방법  
     리페치(refetch)를 트리거하는 조건을 구성하는 방법 혹은  
     `staleTime`으로 다시 가져오기를 언제 트리거 할지도 구성하는 방법이 있다.

- TanStack Query는 데이터 관리 뿐만 아니라, 서버 상태 관리에 도움되는 많은 도구가 제공되며,  
  서버에 대한 모든 쿼리의 로딩 및 오류 상태를 유지해주기 때문에, 수동으로 할 필요가 없어진다.

- 또한, 사용자 데이터를 위해 데이터의 페이지 매김(Pageination) 또는 무한 스크롤이 필요한 경우,  
  데이터를 조각으로 가져올 수 있는 도구도 제공한다.

- 사용자가 언제 이를 필요로 할지, 예상해 프리페치(Prefetch)를 수행할 수도 있다.  
  데이터를 미리 가져와 캐시에 넣기에, 사용자에게 데이터가 필요할 때 사용자는 서버에 연결을 기다릴 필요가 없어진다.
- 데이터의 변이나, 업데이트를 관리할 수도 있다.

- 쿼리는 키로 식별되기에, TanStack Query는 요청을 관리할 수 있고,  
  페이지를 로드하고, 해당 페이지의 여러 구성 요소가, 동일한 데이터를 요청하는 경우  
  TanStack Query는 이를 한번에 보낼 수 있다.

- 기존 쿼리가 나가는 동안, 다른 구성 요소가 데이터를 요청하는 경우 또한,  
  TanStack Query는 중복 요청을 제거할 수도 있다.

- 서버에서 오류가 발생하는 경우에 대한, 재시도를 관리할 수 있다.

- 쿼리의 성공 혹은 오류를 구별해, 조치를 취할 수 있도록 콜백을 전달할 수도 있다.

## TanStack Query 컨셉

- 페칭 데이터 (Fetching data)

- 로딩과 에러 상태 (Loading / error states)

- 페이지네이션 (Pagination)

- 미리 가져오기 (Prefetching)

- 변이 (Mutation)

## `QueryClient`와, `QueryClientProbider`

- 쿼리를 관리하고, 서버 데이터도 저장하는 클라이언트

- 쿼리, 캐시, 그리고 쿼리 캐시를 조작하는 도구가 속하지만, 대개 직접적으로 사용하진 않는다.
  - 대신 `QueryClientProvider`를 사용한다.
    - `QueryClientProvider`의 자식 컴포넌트가 TanStack Query 훅을 사용한다.

```jsx
// 1. import QueryClient, QueryClientProbider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 2. create QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App"> ... </div>
    </QueryClientProvider>
  );
}
```

- `QueryClientProvider`자식은 캐시를 포함한 쿼리클라이언트에 접근 가능하다.

  - 자식 컴포넌트에 캐시 및 클라이언트 구성을 제공하는 쿼리 공급자
  - Provider는 query client를 값으로 사용한다.

## `useQuery`

- `useQuery` 훅을 사용하면 서버에서 데이터를 받을 수 있다.

  - `useQuery`는 많은 속성을 가진 객체를 반환한다.

    - 객체의 `data` 속성은 `useQuery`에 전달할 쿼리 함수의 반환 값이다.

      ```jsx
      const { data } = useQuery();
      ```

- `useQuery`는 옵션 객체를 받는다.

  - 옵션 객체의 `queryKey` 속성은 쿼리 캐시 내의 데이터를 정의한다.
    - React Query 4버전 이상 부터 `queryKey`의 값은 항상 배열이다.
  - 옵션 객체의 `queryFn` 속성의 값은 데이터를 가져오기 위해 호출할 함수이다.

    ```jsx
    const { data } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
    });
    ```

- 이때, data는 비동기 함수 fetch posts의 결과를 반환 후, 정의되므로,

  - `Uncaught TypeError: Cannot read properties of undefined (reading 'map')` 오류가 반환된다.

- React Query 훅을 사용하지 않는 방법으로 data의 유무를 확인하는 방법이있다.

  ```jsx
  if (!data) {
    return <div />;
  }
  ```

### `isLoading`과, `isError`

- `isLoading`과, `isError`은 데이터 로딩중, 혹은 에러 발생 여부를 알려주는 부울 값이다.

  - `isLoading`은 페이지가 로딩 중인 경우 true, 아닌 경우 false를 반환한다.

#### `isLoading`과,`isFetching`의 차이점

- `isFetching`은 비동기 쿼리가 아직 해결되지 않았음을 의미한다.

  - 아직 fetch가 완료되지 않았지만, Axios 호출이나 GraphQL 호출 같은 다른 종류의 데이터를 가져오는 작업일 수 있다.

- `isLoading`은 그 하위 집합으로, 로딩 중을 의미한다.
  - 쿼리 함수가 아직 미해결이지만, 캐시된 데이터도 없음을 의미한다.

별 차이가 없어보이지만, 페이지네이션 같은 경우 캐시된 데이터의 유무를 구분하는 것이 중요하다.

```jsx
if (isLoading) {
  return <h3>Loading ...</h3>;
}
```

#### `isError`

- 쿼리 함수를 통해 fetchPosts에서 오류가 발생한 경우, data는 undefined이다.  
  그때, isError를 활용해, 오류 화면을 렌더링할 수 있다.

```jsx
if (isError) {
  return <h3>Oops, something went wrong</h3>;
}
```

- 하지만, 오류 화면은 즉각적으로 렌더링 되지 않는데, 이러한 이유는,
  시스템이 쿼리함수를 여러번 시도하기 때문이다.

  - 기본적으로 React Query는 세 번의 시도에도 데이터를 가져 올 수 없을 때, 오류를 발생시킨다.

    - `error` 속성을 사용하면 오류 객체를 반환하며, 실제 오류 내용을 알 수 있다.

    ```jsx
    return <h3>{error.toString()}</h3>;
    ```

## 개발자 도구

```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

...
function App () {
  return (
    <QueryClientProvider client={queryClient}>
      ...
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}
```

- stale: 오래된 상태

  - 데이터가 오래됐다는건, 유효기간이 만료됨과,
    다시 가져올 준비된 상태를 의미한다.
  - 데이터가 stale로 표시되어도, 캐시에서 삭제된 것은 아니다. 즉, 데이터는 여전히 캐시에 있다.

    - 그저, 데이터를 다시 검증해야한다는 의미이다.

  - prefetch는 데이터가 stale일 때만 트리거 된다.

    - 자동 데이터 prefetch는 몇가지 트리거가 있다.
      - 트리거의 예시로 쿼리를 포함하는 컴포넌트가 다시 마운트 되거나 혹은, 브라우저 창이 리포커싱 될 때가 있다.

  - stale 시간을 데이터의 최대 수명으로 생각할 수도 있다.

- 옵션 객체의 속성 `staleTime`의 값은 밀리초 단위 시간이다.

  - 데이터가 stale이 되면, refetch 트리거에 의해 서버에서 데이터를 다시 가져온다.
  - Lindsley는 React Query의 stale시간이 기본적으로 0밀리세컨드라고 주장했다.

### `staleTime`과, `gcTime`의 차이

- `staleTime`은 데이터를 다시 가져와야 할 때를 알려주고, `gcTime`은 데이터를 캐시에 유지할 시간을 결정한다.
  - 데이터와 연관된 활성 `useQuery`가 없고, 데이터가 현재 페이지에 표시되어 있지 않는 경우,  
    데이터는 콜드 스토리지 상태에 들어가게 되는데, 이때 유효기간이 `gcTime`이다.
    - `gcTime`이 만료되면 데이터는 캐시에서 사라지게 되며, 기본 `gcTime`의 값은 5분이다.
    - `gcTime`은 데이터가 페이지에 표시되지 않을 때 부터 시간이 측정된다.
    - `gcTime`이 만료되면 데이터는 gc처리 되며, TanStack Query에서 더 이상 사용할 수 없다.

### `staleTime`과, `gcTime`의 조합

- 예를 들어, 데이터가 fresh이며, `staleTime`이 남고, 캐시가 있으며,  
  `gcTime`도 만료되지 않은 경우, 데이터를 refetch 하지 않고, 캐시된 데이터를 표시한다.

  - refetch는 트리거가 발생할 때만 실행된다.

- 데이터가 stale이고 캐시에 있는 경우, refetch 트리거가 발생하면  
  서버에서 새 데이터를 가져올 때 까지, 캐시된 데이터를 표시한다.

- 데이터가 캐시에 없고, `gcTime`이 만료되어 데이터가 삭제 된 경우,  
  데이터를 새로 가져오는 동안 표시할 데이터가 없게 된다.

- 서버에서 데이터를 가져오기 전까지 쿼리는 어떠한 데이터도 반환하지 않고,  
  데이터가 캐시에 있을 때는 `useQuery`는 필요한 조건에 따라,
  캐시된 데이터를 반환하고 refetch한다.

## `queryKey`는 식별자 역할뿐만아니라, 종속성 배열로서의 역할도 가지고있다

- 동일한 `queryKey`를 사용하게 될 경우, 업데이트가 원하는 대로 동작하지 않을 수 있다.
  예) 게시물 상세보기

  ```js
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(post.id),
  });
  ```

- comments의 트리거가 있을 때, 새로 값을 가져온다.

  - 예시 트리거로는 컴포넌트를 다시 마운트 할 때, 혹은 창에 다시 포커싱을 할 때,  
    `useQuery`에서 반환된 Refetch 함수를 수동으로 실행하거나, 지정된 간격에서 자동으로 재검색이 일어나거나,  
    변형 후 쿼리를 무효화 하는 것이 있다. 이 때 클라이언트 데이터가 서버의 데이터와 다르다는 것을 알게된다.  
    하지만, 위의 코드에서는 이러한 동작이 없기에, 데이터가 stale이어도, 재검색이 발생하지 않는다.

    - 이때, 데이터를 무효화 하는 등의 방식으로 재검색을 트리거할 수 있지만, 이러한 방식은 쉽지 않고 원하는 동작이 아니다.

      - 왜냐하면 실제 데이터를 제거할 필요가 없기 때문이다.

        - `queryKey`는 데이터 식별자로써 역할뿐만 아니라, 종속성 배열로서의 역할도 한다.  
          그러므로, `queryKey` `post.id`속성을 추가해, 각기 다른 쿼리 아이디를 부여해 쿼리마다 캐시를 할 수 있게 할 수 있다.
        - 종속성 배열의 값이 다르면, 두 쿼리는 완전히 다른 것으로 분류 되어,  
          이 경우, post.id가 업데이트 될 때 TanStack Query는 새로운 쿼리를 생성해  
          각 쿼리는 개별적인 stale 시간과 개별적인 캐시 시간을 가질 수 있다.

          - 이 때문에, 데이터를 가져올 때 쓰는 `queryFn`의 값인 쿼리 함수의 모든 값은 키의 일부여야한다.

  - 이전에 불러왔지만, 현재 화면에 표시 되지 않는 쿼리를 비활성 쿼리라고 한다.
    - 비활성 상태가 활성되면, `gcTime`이 흘러가기 시작한다.

## 페이지네이션 (Pagination)

1. 컴포넌트 state를 사용해, 현재 페이지를 추적할 수 있다.

   ```jsx
   // 컴포넌트 외부 변수
   const maxPostPage = 10;
   ...
   // state
   const [currentPage, setCurrentPage] = useState(1);
   ```

2. 이때, 각 페이지마다 고유한 쿼리키를 가져야한다.

   ```jsx
   const { data, isLoading, isError, error } = useQuery({
     queryKey: ["posts", currentPage],
     queryFn: () => fetchPosts(currentPage),
   });
   ```

3. 사용자가 버튼을 클릭해, 이전 혹은 다음 페이지로 이동시, 현재 상태를 업데이트 해야한다.

   ```jsx
   <button disabled={currentPage <= 1} onClick={() => setCurrentPage(previousValue => previousValue - 1)}>
   ```

- TanStack Query는 이를 감지하고, 새 쿼리를 실행 시킨다.

## 데이터 프리페칭(Pre-fetching)

- 데이터를 미리 가져와, 캐시에 저장하는 것을 프리페칭이라 한다.
  - 데이터는 기본적으로 stale로 간주된다.
  - 가져온 데이터를 사용할 때, 데이터는 여전히 stale 상태로 다시 데이터를 가져와야하지만,  
    TanStack Query는 다시 가져오는 동안 캐시에 있는 데이터를 제공한다.
    - 이때 캐시는 만료되지 않아야한다.
- 프리페칭은 페이지네이션뿐 아니라, 사용자가 원하는 모든 데이터에 사용할 수 있다.

  - 예를 들어 웹 사이트 방문시 통계적으로 다음에 방문할 특정 탭이 있는 경우 그 데이터를 프리페칭 할 수 있다.

- `prefetchQuery`는 `useQueryClient`의 메소드다.

  - `prefetchQuery`를 어디서 사용하는 것이 좋을지 고려해봐야한다.
    상태 업데이트가 비동기적이라, 업데이트 적용 여부를 정확하게 알 수 없는  
    다음 버튼의 `onClick` 이벤트에서 실행하는 것은 좋은 판단이 아니다.

  - 그러므로, 상태가 변경 될 때마다 이를 추적할 수 있는 `useEffect`를 고려해볼 수 있다.

- `prefetchQuery`의 인수는 `useQuery`인수와 매우 유사하며,
  이때 queryKey는, `useQuery`에 사용된 것과 같은 형태여야 한다.

  ```jsx
  useEffect(() => {
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery({
      queryKey: ["posts", nextPage],
      queryFn: () => fetchPosts(nextPage),
    });
  }, [currentPage, queryClient]);
  ```

## `isFetching`과, `isLoading`

- `isFetching`은 비동기 쿼리 함수가 아직 해결되지 않았을 때(데이터를 아직 가져오고 있는 상태) true이다.
- `isLoading`은 `isFetching`이 true이고, 해당 쿼리에 대한 캐시된 데이터가 없는 상태를 의미한다.

- `isLoading`은 `isFetching`의 하위 집합이다.
  - `isLoading`일 때, `isFetching`은 true이다.
  - 즉, 실제로 캐시된 데이터가 없고 데이터를 가져오고 있는 상태를 의미한다.

## 프리페칭 작동 방식

- 프리페칭 작동 방식은 `queryKey`로 사용한 상태가,  
  업데이트 될 때 `useQuery`가 업데이트 된 상태를 `queryKey`로 설정하는 것이다.
- 프리페치의 데이터 stale 시간은 기본적으로 0초 이다.

## 변이(Mutation) 입문

- 서버에 네트워크 호출해, 서버에서 실제 데이터를 업데이트 하는 것을 변이라고 한다.

- 변경 사항을 실제로 보여주거나, 사용자가 볼 수 있게 변경 사항이 발생했다는 것을 등록하는 방법은 세 가지가 있다.

  1. 낙관적 업데이트

     - 서버 호출이 잘될거라 가정하고 잘 안됐을 경우, 되돌리는 방법을 낙관적 업데이트(Optimistic updates)라고 한다.

  2. 서버에서 받은 데이터를 가져오는 방법

     - 변이 호출을 실행할 때 업데이트 된 데이터를 가져와, TanStack Query 캐시를 업데이트 하는 것이다.

  3. 관련 쿼리를 무효화 하는 방법

     - 쿼리를 무효화 하면, 클라이언트의 데이터를 서버의 데이터와 동기화 하기 위해, 서버에 재요청(re-fetch)이 발생한다.

## `useMutation`

```jsx
const deleteMutation = useMutation({
  mutationFn: postId => deletePost(postId),
});
```

- `useMutation`은 `useQuery`와 매우 유사하지만, 몇 가지 차이점이 있다.

  - `useMutation`은 `mutate` 함수를 반환하며, 반환된 `mutate` 함수는 실제로 서버에 변경 사항을 호출할 때 사용한다.
  - 데이터를 저장하지 않으므로 `queryKey`가 필요 없다.
  - `isLoading`은 있지만, `isFetching`은 없다.
    - 캐시된 것이 없으므로 `isFetching`이 의미 없기 때문이다.
  - 기본적으로 재시도가 없지만, 설정을 통해 자동 재시도를 할 수 있다.
  - `mutationFn`은 `useQuery`와 다르게, 실제로 인수를 가질수 있다.

- PostDetail이 아닌, Posts에 변이를 넣은 이유

  - 클릭 할 때마다, 변이를 초기화 하기 위해서이다.

    ```jsx
    <ul>
      {data.map(post => (
        <li
          key={post.id}
          className="post-title"
          onClick={() => {
            deleteMutation.reset();
            setSelectedPost(post);
          }}
        >
          {post.title}
        </li>
      ))}
    </ul>
    ```
