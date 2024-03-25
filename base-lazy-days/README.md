# TanStack Query 설정, 집중화, 커스텀 훅

// @ts-nocheck
// @ts-ignore

## @ alias

- @는 소스 디렉토리를 의미한다.
  @shared는 type defintions이 있는 한 수준 위의 공유 디렉토리를 의미한다.

  ```jsx
  import { AuthContextProvider } from "@/auth/AuthContext";
  ```

  - 이러한 alias를 사용하면 소스 폴더나 공유 폴더로 바로 이동할 수 있다.

  ```json
  "paths": {
    "@/*": ["src/*"],
    "@shared/*": ["../shared/*"]
  },
  ```

## 커스텀 쿼리 훅 useTreatments

- 커스텀 훅을 사용하는 이유

  - 여러 개의 쿼리 호출들을 사용하는 경우 사용중인 키가 혼동될 수 있어,
    커스텀 훅을 사용해 이를 방지할 수 있다.

  - 사용하려는 쿼리 함수를 혼동할 위험이 없다.

    - 커스텀 훅에 바로 넣을 수 있어, 여러 컴포넌트들에서 가져올 필요가 없다.

  - 데이터를 얻는 방법의 implementation을 변경하기로 결정한 경우, 훅을 업데이트하기만 하면 된다.

- compoenents > hooks > treatment.ts

  ```jsx
  import { useQuery } from "@tanstack/react-query";
  import type { Treatment } from "@shared/types";

  import { axiosInstance } from "@/axiosInstance";
  import { queryKeys } from "@/react-query/constants";

  // for when we need a query function for useQuery
  //  * 이 쿼리 함수는 Axios 인스턴스와 endpoint treatments를 사용하여, 데이터를 가져온다.
  async function getTreatments(): Promise<Treatment[]> {
    const { data } = await axiosInstance.get("/treatments");
    return data;
  }

  export function useTreatments(): Treatment[] {
    const fallback: Treatment[] = [];
    // data 초기 값 fallback

    // TODO: get data from server via useQuery
    const { data = fallback } = useQuery({
      queryKey: [queryKeys.treatments],
      queryFn: getTreatments,
    });

    return data;
  }
  ```

## `useIsFetching`을 사용하는 중장 집중식 페칭 인디케이터

- 소규모 앱에서는 `useQuery` 반환 객체에서 isFetching을 사용했다.

  - 더 큰 앱에서는 로딩 스피너를 표시해야한다.

- `useIsFetching`은 현재 가져오는 쿼리의 존재 유무를 알려주는 훅이다.

  - 즉, `useIsFetching`를 사용하면 각 커스텀 훅에 대한 isFetching을 사용할 필요가 없어진다.
  - 로딩 컴포넌트에서 . 이훅을 사용할 수 있으며, `useIsFetching`값은 스피너의 표시 여부이다.
  - `useIsFetching`은 현재 가져오기 상태인 쿼리 호출 수를 나타내는 정수를 반환한다.

    - `useIsFetching`의 반환 값이 0보다 큰 경우 참으로 평가되며, 이 경우 display는 inherit으로 설정되어, 로딩 스피너가 표시된다.

      - Loading.tsx

        ```jsx
        import { Spinner, Text } from "@chakra-ui/react";
        import { useIsFetching } from "@tanstack/react-query";

        export function Loading() {
          // will use React Query `useIsFetching` to determine whether or not to display
          const isFetching = useIsFetching(); // for now, just don't display
          const display = isFetching ? "inherit" : "none";

          return (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="olive.200"
              color="olive.800"
              role="status"
              position="fixed"
              zIndex="9999"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              display={display}
            >
              <Text display="none">Loading...</Text>
            </Spinner>
          );
        }
        ```

- 창을 클릭하면, 바로 로드 되는 이유

  - 기본적으로 TanStack Query와 함께 제공되는 리페치 구성으로,
    창에 다시 초점을 맞추면 데이터를 다시 가져온다.

## 쿼리 오류가 발생할 때마다 토스트 메시지를 표시하는 글로벌 콜백

- TanStack Query가 사용 오류 훅을 제공하지 않는 이유
  - 사용자에게 오류를 표시할시, 각 오류에 대한 문자열이 필요하지만, 언제든 나타날 수 있는 오류를 개별 문자열로 구현하는 방법은 불분명하다.
    중앙 집중식 훅 대신, TanStack Query는 캐시에 대해 설정할 수 있는 `onError` 콜백을 제공한다.

```jsx
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {handle the error}
  })
})

```

- `QueryCache` 추가한 다음 오류 콜백을 추가할 수 있으며, 오류 콜백 onError는 `useQuery`에서 발생하는 오류에 관계 없이 전달되며,  
  콜백 본문 내에서 오류를 처리할 수 있다.

  ```jsx
  import { toast } from "@/components/app/toast";
  import { QueryClient, QueryCache } from "@tanstack/react-query";

  // onError 콜백에 사용할 함수
  function errorHandler(errorMsg: string) {
    // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
    // one message per page load, not one message per query
    // the user doesn't care that there were three failed queries on the staff page
    //    (staff, treatments, user)
    const id = "react-query-toast";

    if (!toast.isActive(id)) {
      const action = "fetch";
      const title = `could not ${action} data: ${
        errorMsg ?? "error connecting to server"
      }`;
      toast({
        id,
        title,
        status: "error",
        variant: "subtle",
        isClosable: true,
      });
    }
  }

  export const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => errorHandler(error.message),
    }),
  });
  ```
