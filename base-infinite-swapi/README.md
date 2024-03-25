# 무한 쿼리

- 사용자가 스크롤할 때마다 새로운 데이터를 가져오는 것을 무한 스크롤이라고한다.

## `useInfiniteQuery`

- `useInfiniteQuery`는 다음 쿼리가 무엇인지 추적하며,
  이 경우 다음 쿼리는 데이터의 일부로 반환된다.

### `useQuery`와 다른 키포인트

- `useQuery`를 사용하면, `queryFn`에서 데이터가 data 속성에 담겨 반환되지만,  
  `useInfiniteQuery`는 객체에 data, pages 속성이 담겨 반환된다.

  - pages는 각 데이터 페이지를 나타내는 객체의 배열이다.  
    따라서, 배열의 각 요소는 `useQuery`를 사용했을 때 각각의 쿼리에서 받을 수 있는 데이터에 해당된다.
  - pageParams 는 각 페이지마다 사용하는 파라미터를 기록한다.
  - 각 쿼리는 pages배열의 자신만의 요소를 가지고 있고, 그 요소는 해당 쿼리의 데이터를 나타낸다.
  - 쿼리는 페이지를 진행함에 따라 변경되고, pageParams는 검색된 쿼리의 키를 추적한다.

- `useInfiniteQuery` 신택스도 useQuery와 다른 강력한 부분이며, 이를 통해 무한 스크롤을 계속 유지할 수 있다.

### 작동원리

- pageParams은 `queryFn`에 전달되는 매개변수이다.

  ```jsx
  useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
  });
  ```

  - 쿼리 함수는 객체에서 구조 분해된, pageParams를 받게 되며,이를 첫 번째 URL로 기본 설정된 값으로 초기화한다.
    그래서 이 함수는 기본 URL로 설정된 pageParams를 가져와 내가 정의한 fetch URL을 이. pageParams에 실행한다.

- pageParams의 현재 값은 TanStack Qeury에 의해 유지되며 이를 수행하는 방법은 `useInfiniteQuery`에 대한 옵션을 사용하는 것이다.

  ```jsx
  getNextPageParam: lastPage, allPages;
  ```

  - getNextPageParam는 마지막 페이지 데이터나, 모든 페이지의 데이터에서 다음 페이지를 가져오는 방법을 알려주는 함수이다.
    - lastPage는 다음 페이지 URLdl 무엇인지 알려주며, pageParam을 업데이트 한다.

- 반환 객체의 일부 속성은 `useQuery`와 다르며, 이를 사용해 무한 스크롤을 구현할 수 있다.
  - fetchNextPage 속성은 다음 페이지를 가져오는 기능이며,  
    사용자가 . 더많은 데이터를 필요할 때마다 호출하는 함수이다.
  - hasNextPage 속성은 다음 페이지 여부를 묻는 기능이며, getNexxtPageParam 함수의 반환 값에 기반한다.  
    `useInfiniteQuery` 전달하는 속성은 마지막 쿼리의 데이터를 사용해 다음 쿼리가 무엇이 될지 알려주는 속성이다.
    - 이 것이 undefined라면, 더 이상 데이터가 없다는 것을 의미하며, `useInfiniteQuery`에서 반환된 객체의 hasNextPage 속성은 false가 된다.
- isFetchingNextPage는 `useInfiniteQuery`는 다음 페이지를 가져오는 중인지, 아니면 일반적으로 데이터를 가져오는 중인지를 구별할 수 있다.

### `useInfiniteQuery`의 흐름과 다양한 구성 요소

1. 컴포넌트가 마운트 된다. (Component mounts)

   - 쿼리를 수행하기 전이므로, 이 시점에 `useInfiniteQuery`에서 반환된 객체의 data 속성은 undefined이다.

2. 첫 번째 페이지 패칭 (Fetch first page)

   - 그 다음, `useInfiniteQuery`는 `queryFn`을 사용해 첫 페이지를 가져오며, `queryFn`은 pageParam을 인수로 받는다.
   - 이 pageParam을 사용해, 첫 페이지를 가져오고, 그 다음 데이터 반환 객체의 pages속성을 설정한다.  
     특히 data 배열의 첫번째 요소를 설정하는데 이는 인덱스가 0이며, 이 값은 `queryFn`이 반환하는 것이된다.

3. getNextPageParam Update pageParam

   - 데이터를 받은 후, TanStack Query는 getNextPageParam을 실행하는데, 이 함수는 `useInfiniteQuery`에 옵션으로 전달했던 것이며,
     이 함수는 마지막 페이지와 모든 페이지를 받아 pageParam을 업데이트한다.

     - TanStack Query가 다음 페이지의 존재 여부를 결정하는 방법은 pageParam이 undefined인지 유무에 달려있다.
       - pageParam이 defined인 경우, 다음 페이지가 존재한다.

4. hasNextPage undefined 여부 확인

   - hasNextPage undefined인 경우, 이후 동작은 발생하지 않는다.

5. 버튼 클릭 혹은, 스크롤 트리거에 의한 fetchNextPage

   - 사용자가 다음 페이지의 데이터를 가져오도록 트리거한다 가정하는 경우 fetchNextPage 함수는 `useInfiniteQuery`에 의해 반환된 객체 속성이다.
   - 컴포넌트는 구조 분해된 객체에서 얻은 fetchNextPage를 호출한다.

     - 사용자가 더 많은 데이터를 필요로 할 때, TanStack Query는 pageParam이 뭐든, 두 번째 페이지를 요청하면서 `queryFn`을 실행하며,
       그걸 사용해 pages 배열에 다음 요소를 추가한다. 이때 pages는 data의 속성 중 하나이다.

   - 새로운 데이터를 받고나면, pageParam 설정을 위해, getNextPageParam을 실행한다.

### `useInfiniteQuery` 호출 작성하기

```jsx
import { useInfiniteQuery } from "@tanstack/react-query";
  ...

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    // next 프로퍼티는 결과의 다음 페이지로 가는데 필요한 URL을 알려준다.
  });

  ...
```

### infiniteScroll 컴포넌트

- 꼭 React Infinite Scroller를 사용할 필요는 없다.

- 무한 스크롤 컴포넌트에는 두 가지 속성을 채워야한다.

  - 로딩할 데이터의 여부를 나타내는 hasMore
    - hasMore는 부울 값이다.
  - 무한 스크롤로 반환된 객체에서 구조 분해할 수 있는 hasNextPage

    - hasNextPage는 부울 값이다.

  - 무한 스크롤 컴포넌트가 알아야 할 건 hasNextPage이다.

  - loadMore은 무한 스크롤러가 더 많은 데이터를 로딩할 때 실행 될 함수이다.

    - fetchNextPage와 유사하다.
    - isFetching 여부를 조건문으로 사용해, 중복 API 호출을 방지할 수 있다.

  - 무한 스크롤 컴포넌트는 사용자가 페이지의 특정 지점에 도달했을 때, fetchNextPage를 호출할 책임이 있다.

  - `useInfiniteQuery`에서 반환된 객체의 data 속성의 pages 속성으로 부터 데이터에 접근할 수 있다.

```jsx
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error">{error.toString()}</div>;
  }

  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) =>
          pageData.results.map((species) => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
```
