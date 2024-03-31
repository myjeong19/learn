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
      const title = `could not ${action} data: ${errorMsg ?? "error connecting to server"}`;
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

## 캐시에 데이터 추가하기

- 캐시에 아직 데이터가 없는 경우, 미리 데이터를 채울 수 있다.
  - 유효한 데이터의 경우 캐시에 추가할 수 있지만, 자리 표시자인 경우 추가하지 않는다.

1. `prefetchQuery`

   - `queryClient`에 대한 메서드이다.
   - 데이터는 서버에서 가져오기 때문에, 데이터를 가져오기 위해 서버로 이동하고, 데이터는 캐시에 추가된다.

2. `setQueryData`

   - `queryClient`에 대한 메서드이다.
   - `useQuery`를 실행하지 않고, 쿼리 데이터를 캐시에 추가하는 또 다른 방법이다.
   - 클라이언트에서 데이터를 가져오므로, 서버에서 변이에 대한 응답으로 나온 데이터일 수 있다.
   - `useQuery`가 데이터를 요청할 때, 캐시가 해당 데이터를 제공하도록 할 수 있다.

3. `placeholderData`

   - `useQuery`에 대한 메서드이며, `useQuery`를 실행할 때 데이터를 제공하기 때문에 클라이언트에서 데이터를 가져오고,  
     캐시에는 추가되지 않는다.
   - 고정 값 또는 함수를 사용할 수 있다.
   - 자리 표시자 데이터 값을 동적으로 결정하는 함수를 사용하려는 경우, `placeholderData`를 사용하는 것이 가장 좋다.

4. `initialData`

   - `placeholderData`의 반대격이며, `useQuery`에 대한 메서드이다.
   - 클라이언트에서 제공되며, 캐시에 추가해야하는 데이터이다.

## 프리페칭(Pre-fetching) 처리

- 사용자가 홈 페이지를 로드할 때 어느 시점에서, treatment 탭 로드로 이어진다는 통계가 있다 가정해보자.

  - 따라서, 사용자가 treatment 탭을 클릭할 필요가 없도록 treatment 데이터를 미리 가져올 가치가 있다.
  - treatment 데이터는 비교적 안정적이기에, 캐시된 데이터에 의존하는 것이, 동적인 데이터(주식)를 볼 때 처럼 큰 문제가 되지 않기에, 프리페칭에 특히 좋은 옵션이다.
  - 물론 gcTime내에 useQuery에 의해 데이터가 호출되지 않으면, 가비지 수집된다.
    - 따라서, 기본 시간인 5분 내에 treatment 탭을 로드하지 않는 경우, 특정 쿼리에 대해 더 긴 시간을 지정할수도 있다.

- `prefetchQuery`는 가져오고 다시 가져와야하는 쿼리를 설정하는 `useQuery`와 달리, 클라이언트 캐시에 추가한다.

  - `prefetchQuery`는 일회성이다.
  - `queryClient`의 메소드이므로, `queryClient`를 검색해야하며,  
    이를 위해 쿼리 Provider 내에 있는 한 `queryClient`를 가져 올 수 있는 `useQueryClient` 훅을 사용한다.

    ```jsx
    export function usePrefetchTreatments(): void {
      const queryClient = useQueryClient();
      queryClient.prefetchQuery({ queryKey: [queryKeys.treatments], queryFn: getTreatments });
    }
    ```

  - `useQueryClient`를 호출하여 `queryClient`를 얻을 수 있으며, 쿼리 Provider에 대한 prop으로, 사용한 queryClient가 반환된다.
  - `prefetchQuery`의 `queryKey`는 매우 중요하며, 어떤 쿼리 어떤 `useQuery`가 캐시에서 이 데이터를 찾아야하는 지 알려준다.

    ```jsx
    import { Icon, Stack, Text } from "@chakra-ui/react";
    import { GiFlowerPot } from "react-icons/gi";

    import { usePrefetchTreatments } from "../treatments/hooks/useTreatments";
    import { BackgroundImage } from "@/components/common/BackgroundImage";

    export function Home() {
      usePrefetchTreatments();

      return (
        <Stack textAlign="center" justify="center" height="84vh">
          <BackgroundImage />
          <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
            <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
            Lazy Days Spa
          </Text>
          <Text>Hours: limited</Text>
          <Text>Address: nearby</Text>
        </Stack>
      );
    }
    ```

    - 왜 홈 컴포넌트의 모든 단일 렌더링에서 usePrefetchTreatments()를 실행하는 걸까?
      - 홈 컴포넌트는 동적이지 않아, 리렌더가 많이 발생하지 않는다.

- `usePrefetchTreatments`를 컴포넌트가 마운트 될 때 한 번만 실행하도록 할 때 `useEffect`를 사용하지 않는 이유
  - `useEffect` 내부에서 훅을 실행할 수 없기 떄문이다.
  - 훅이 아니면, 훅 내에서 `useQueryClient`를 사용할 수 없다.

## useAppointments 커스텀 훅 입문

```jsx
import dayjs from "dayjs";
import { useState } from "react";

import { AppointmentDateMap } from "../types";
import { getAvailableAppointments } from "../utils";
import { getMonthYearDetails, getNewMonthYear } from "./monthYear";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// for useQuery call
async function getAppointments(year: string, month: string): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
}

// The purpose of this hook:
//   1. track the current month/year (aka monthYear) selected by the user
//      * 연도의 현재 월 또는 현재 월과 연도를 추적 사용자가 선택한 monthYear
//     1a. provide a way to update state
//      * 월을 앞당기기 위해 버튼 중 하나를 클릭했을 때 컴포넌트가 훅에 알릴 수 있도록 monthYear를 업데이트 하는 방법을 제공
//   2. return the appointments for that particular monthYear
//     * 특정 monthYear에 대한 예약(Appointments)을 반환
//     2a. return in AppointmentDateMap format (appointment arrays indexed by day of month)
//      * AppointmentDateMap 형식으로 반환 (월의 일에 따라 인덱싱된 예약 배열)
//     2b. prefetch the appointments for adjacent monthYears
//      * 인접한 monthYears에 대한 예약을 미리 가져오기
//   3. track the state of the filter (all appointments / available appointments)
//     * 필터 상태를 추적 (모든 예약 / 가능한 예약)
//     3a. return the only the applicable appointments for the current monthYear
//      * 현재 monthYear에 해당하는 예약만 반환
export function useAppointments() {
  /** ****************** START 1: monthYear state *********************** */
  // get the monthYear for the current date (for default monthYear state)
  //  * 현재 날짜의 monthYear를 가져온다. (기본 monthYear 상태를 위해)
  const currentMonthYear = getMonthYearDetails(dayjs());

  // state to track current monthYear chosen by user
  //  * 사용자가 선택한 현재 monthYear를 추적하는 상태
  // state value is returned in hook return object
  // * 상태 값은 훅 반환 객체에 반환된다.
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  // setter to update monthYear obj in state when user changes month in view,
  // * 사용자가 뷰에서 월을 변경할 때 상태의 monthYear 객체를 업데이트하는 setter
  // returned in hook return object
  // * 훅 반환 객체에 반환된다.
  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
  }
  /** ****************** END 1: monthYear state ************************* */
  // * 1. 사용자가 선택한 monthYear를 추적하는 상태
  /** ****************** START 2: filter appointments  ****************** */
  // * 2. 예약 필터링
  // State and functions for filtering appointments to show all or only available
  //  * 모든 예약 또는 가능한 예약만 표시하기 위한 상태 및 함수
  const [showAll, setShowAll] = useState(false);

  // We will need imported function getAvailableAppointments here
  //  * 여기에 가져온 함수 getAvailableAppointments가 필요하다.
  // We need the user to pass to getAvailableAppointments so we can show
  //  * 사용자가 전달되어야 하므로 getAvailableAppointments를 통해 표시할 수 있다.
  //   appointments that the logged-in user has reserved (in white)
  //  * 로그인한 사용자가 예약한 예약을 표시한다. (흰색으로)
  const { userId } = useLoginData();

  /** ****************** END 2: filter appointments  ******************** */
  // * 2. 예약 필터링
  /** ****************** START 3: useQuery  ***************************** */
  // * 3. useQuery 사용
  // useQuery call for appointments for the current monthYear
  //  * 현재 monthYear에 대한 예약을 위한 useQuery 호출

  // TODO: update with useQuery!
  // Notes:
  //    1. appointments is an AppointmentDateMap (object with days of month
  //       as properties, and arrays of appointments for that day as values)
  //    * appointments는 AppointmentDateMap(월의 일을 속성으로 가지고 그 날의 예약 배열을 값으로 가진 객체)이다.
  //    2. The getAppointments query function needs monthYear.year and
  //       monthYear.month
  //    * getAppointments 쿼리 함수는 monthYear.year와 monthYear.month가 필요하다.
  const appointments: AppointmentDateMap = {};

  /** ****************** END 3: useQuery  ******************************* */
  // * 3. useQuery 사용

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
}
```

## useAppointments를 위한 `useQuery`와 의존성 배열로서의 쿼리 키

- 모든 쿼리에 동일한 쿼리 키를 사용하고 있어, 업데이트가 예상대로 진행되지 않는다.

  - 이를 좀 더 세부적으로 보자면, 새 달을 로드하기 위해 버튼을 클릭해도, 쿼리에 대한 데이터가 최신은 아니지만,  
    트리거하거나 다시 가져올 값이 없다.

- 리페치(Re-fetching)

  - 기본적으로 컴포넌트를 다시 마운트하고, 창 초점을 다시 맞추고, 리페치 함수를 수동으로 실행하여 리페치 함수를 실행하거나,
    자동화된 리페치를 사용하여 리페치를 트리거할 수 있다.

    - TanstackQuery가 작동하는 방식은 알려진 키에 대해서만 새 데이터를 가져온다는 것이다.  
      만약 알 수 없는 키나 새 키가 있다면, 리페치가 아니라 초기 가져오기이므로, 이러한 트리거가 필요하지 않다.  
      따라서, 해결책은 매달 새 키를 사용하는 것이다.

      ```jsx
      const fallback: AppointmentDateMap = {};

      const { data: appointments = fallback } = useQuery({
        // queryKey: [queryKeys.appointments], Before
        queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
        queryFn: () => getAppointments(monthYear.year, monthYear.month),
      });
      ```

- 데이터가 변경될 경우, 새 쿼리를 수행하기 위해 새 데이터를 가져올 수 있도록,  
  키가 변경되었는지 확인하기 위해 항상 키를 종속성 배열로 처리해야한다.

- `uesEffect`를 사용한 pre-fetch

  ```jsx
  const queryClient = useQueryClient();
  useEffect(() => {
    const nextMonthYear = getNewMonthYear(monthYear, 1);
    queryClient.prefetchQuery({
      queryKey: [queryKeys.appointments, nextMonthYear.year, nextMonthYear.month],
      queryFn: () => getAppointments(nextMonthYear.year, nextMonthYear.month),
    });
  }, [queryClient, monthYear]);
  ```
