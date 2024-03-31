import { queryClient } from "./../../../react-query/queryClient";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  const queryClient = useQueryClient();
  useEffect(() => {
    const nextMonthYear = getNewMonthYear(monthYear, 1);
    queryClient.prefetchQuery({
      queryKey: [queryKeys.appointments, nextMonthYear.year, nextMonthYear.month],
      queryFn: () => getAppointments(nextMonthYear.year, nextMonthYear.month),
    });
  }, [queryClient, monthYear]);

  // Notes:
  //    1. appointments is an AppointmentDateMap (object with days of month
  //       as properties, and arrays of appointments for that day as values)
  //    * appointments는 AppointmentDateMap(월의 일을 속성으로 가지고 그 날의 예약 배열을 값으로 가진 객체)이다.
  //    2. The getAppointments query function needs monthYear.year and
  //       monthYear.month
  //    * getAppointments 쿼리 함수는 monthYear.year와 monthYear.month가 필요하다.
  const fallback: AppointmentDateMap = {};

  const { data: appointments = fallback } = useQuery({
    queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
    queryFn: () => getAppointments(monthYear.year, monthYear.month),
  });

  /** ****************** END 3: useQuery  ******************************* */
  // * 3. useQuery 사용

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
}
