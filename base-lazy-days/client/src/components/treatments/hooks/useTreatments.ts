import { useQuery, useQueryClient } from "@tanstack/react-query";
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

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({ queryKey: [queryKeys.treatments], queryFn: getTreatments });
}
