# 쿼리 생성 및 로딩/에러 상태

## 클라이언트 상태(Client State)와 서버 상태(Server State)

- 클라이언트 상태란, 웹 브라우저 세션과 관련된 모든 정보를 의미한다.

  - 예) 다국어, 테마 등 서버에서 일어나는 일과 관련 없는 것.

- 서버 상태란, 서버에 저장되지만 클라이언트에 표시하는데 필요한 데이터를 의미한다.

  - 예) 블로그 포스트

## 리액트 쿼리가 해결하는 문제

리액트 쿼리는 클라이언트에서 서버 데이터 캐시를 관리한다.
리액트 코드에 서버 데이터가 필요할 떄 Fetch나, Axios를 사용해 서버로 바로 이동하지 않고,
서버 데이터에 대한 진짜 공급원인 리액트 쿼리 캐시를 요청한다.

## React Query는 데이터를 관리한다

리액트 쿼리 클라이언트를 어떻게 구성했느냐에 따라, 해당 캐시의 데이터를 유지 관리한다.
즉, 데이터를 관리하는 것은 리액트 쿼리지만, 서버의 새 데이터로 캐시를 업데이트하는 시기를 설정하는 것은 사용자의 몫이다.

클라이언트에 있는 데이터와 서버 데이터와 일치하는지 확인하는 방법은 두 가지가 있다.

- 명령형

  - 쿼리 클라이언트에 데이터를 무효화하고, 캐시에 교체할 새 데이터를 서버에서 가져오게 지시하는 것을 명령형 방법이라한다.

- 선언형
  - 리페치(Refetch)를 트리거하는 조건을 구성하는 것이다.

## 추가

- Loading/Error States

  - 서버에 대한 모든 쿼리의 로딩 및 오류 상태를 유지해준다.

- 페이지네이션(Pagination) / 무한 스크롤 (Infinite scroll)

  - 페이지네이션과 무한스크롤을 위한 데이터를 조각으로 가져 올 수 있는 도구를 제공해준다.

- Prefetching

  - 사용자가 데이터를 필요로할 시기를 예상해, 데이터를 미리 가져와 캐시에 넣을 수 있다.

- Mutations

  - 리액트 쿼리가 서버에서 데이터의 변이(Mutation)나 업데이트를 관리할 수 있다.

- De-duplication of requests

  - 리액트 쿼리는 요청을 관리할 수 있고, 페이지를 로드하고 해당 페이지의 여러 구성 요소가 동일한 데이터를 요청하는 경우 리액트 쿼리는 한 번에 보낼 수 있다.
    - 기존 쿼리가 나가는 동안 다른 구성 요소가 데이터를 요청하는 경우, 중복 요청을 제거할 수 있다.

- Retry on error

  - 서버에서 오류가 발생하는 경우에 대한 재시도를 관리할 수 있다.
  - 쿼리의 성공 여부를 구분해 조치를 취할 수 있다.

## Getting Started

1. 라이브러리를 설치한다.

   ```
   npm i @tanstack/react-query
   ```

2. `QueryClient`를 생성한다.

   - `QueryClient`는 쿼리를 관리하고, 서버 데이터도 저장하는 클라이언트이다.
   - 쿼리, 캐시 그리고 쿼리 캐시를 조작하는 도구가 속하며, 대게 이 도구를 직접 사용하지 않고, `QueryClientProvider`를 사용한다

   ```jsx
   import { QueryClientProvider } from '@tanstack/react-query';
   import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
   import { queryClient } from './utils/queryClient';

   function App() {
     return (
       <QueryClientProvider client={queryClient}>
         <div className="App">
           <h1>Blog Posts</h1>
           <Posts />
         </div>
         <ReactQueryDevtools />
       </QueryClientProvider>
     );
   }
   ```

3. 자식 컴포넌트에 캐시 및 클라이언트 구성을 제공할 `QueryClientProvider`를 사용해 자식 요소들을 감싸야한다.

   - `QueryClientProvider`는 `QueryClient`를 값으로 사용한다.

4. 서버에서 데이터를 받기 위해 `useQuery` 훅을 사용해야한다.

## Fetching data

```jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchPosts, deletePost, updatePost } from './utils/api';
import { PostDetail } from './PostDetail';
import { queryKeys } from './utils/queryKeys';
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // data는 useQuery에 전달할 쿼리 함수의 반환 값이다.
  // data는 queryFn에 전달한 함수의 결과가 반환 후 정의된다.
  // isLoading과, isError는 로딩 여부와 오류 발생 여부룰 알려주는 부울 값이다.
  // error는 실제 발생한 오류 값이다.
  const { data, isError, error, isLoading } = useQuery({
    // queryKey는 쿼리 캐시 내의 데이터를 정의하며, 4버전 이상부터, 항상 배열을 값으로 받는다.

    queryKey: [queryKeys.posts],
    // queryFn은 데이터를 가져오기 위해 실행할 함수이다.
    queryFn: fetchPosts,
    staleTime: 2000, // 2 seconds
  });
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <ul>
        {data.map(post => (
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
```

## `isFetching`과, `isLoading`

- `isFetching`은 비동기 쿼리가 아직 해결되지 않은 상태를 의미한다.

- `isLoading`은 `isFetching`의 하위 집합으로 로딩 상태를 의미한다.

  - 쿼리 함수가 아직 해결되지 않았으며, 이전에 쿼리를 실행한 적이 없어, 아직 캐시된 데이터가 없는 상태이다.
    이 점은 `isFetching`과 `isLoading`의 차이점이다.

- 리액트 쿼리는 기본적으로, 세 번 시도가 실패하면 데이터를 가져올 수 없는 상태로 판단하며,
  시도하는 동안 로딩이, 시도가 실패하면 오류가 발생한다.

## 리액트 쿼리 개발자 도구

- 모든 쿼리의 상태를 볼 수 있어, 쿼리가 예상대로 동작하지 않을 때 유용하다.

- 쿼리로 받은 데이터를 확인할 수 있다.

- 쿼리 자체를 볼 수 있다.

## staleTime과, gcTime

- stale은 오래된 상태를 의미한다.

  - 데이터가 오래됐다는 건, 유효기간이 만료됐다는 의미이며, 다시 가져올 준비가 된 상태를 의미한다.
  - stale로 표시된 데이터는 여전히 캐시에 존재하며, 그저 데이터를 다시 검증해야한다는 상태이다.

    - 데이터 prefetch는 데이터가 stale일 때만 트리거 된다.

    - 자동으로 발생하는 prefetch 트리거로, 쿼리를 포함하는 컴포넌트가 다시 마운트 될 때 혹은, 브라우저 창이 리포커싱 될 때가 그 예이다.
    - `useQuery`의 속성 `staleTime`으로, 그 시간을 조정할 수 있다.

      - 리액트 쿼리의 `staleTime`은 기본적으로 0초이다.

      ```jsx
      ...
      const { data, isError, error, isLoading } = useQuery({
          queryKey: [queryKeys.posts],
          queryFn: fetchPosts,
          staleTime: 2000, // 2 seconds
      });
      ...
      ```

- gcTime

  - gcTime과 staleTime의 차이

    - staleTime은 데이터를 다시 가져와야할 시기를 알려주고, gcTime은 데이터를 캐시에 유지할 시간을 결정한다.

  - 데이터와 연관된 활성 useQuery가 없고, 데이터가 현재 페이지에 표시되지 않으면, 쿨 스토리지(cold storage) 상태로 들어가는데,
    이 상태는 쿼리가 캐시에 있으나 사용되진 않고, 유효기간이 정해져 있는 상태를 의미하는데, gcTime은 그 유효기간을 의미한다.

  - 기본 gcTime의 값은 5분이며, 데이터가 페이지에 표시된 후부터 시간이 측정되기 시작하며,
    데이터가 페이지에 표시될 때는 측정되지 않는다.

## staleTime과, gcTime의 조합

1. 데이터가 fresh이며, 캐시에 존재하며, gcTime 시간도 지나지 않은 경우, 데이터를 refetch하지 않고, 캐시된 데이터를 표시한다.

2. 데이터가 stale이고, 캐시에 존재하며, refetch 트리거가 발생하면, 서버에서 새 데이터를 가져올 때 까지 캐시된 데이터를 표시한다.

3. 데이터가 캐시에 없고, gcTime이 지나 삭제된 경우, 새로 가져오는 동안 표시할 데이터가 없다.

## Building Better Wrapper Components with ComponentPropsWithoutRef

- `ComponentPropsWithoutRef<'input'>;`는 표준 내장 입력 요소 중 하나이며, input의 속성을 지원해준다.

```tsx
import { ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...props} />
    </p>
  );
}
```
