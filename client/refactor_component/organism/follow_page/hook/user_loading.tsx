/**
 * @file useLoading.ts
 * @brief 로딩 상태를 관리하는 커스텀 훅
 * @details 비동기 작업 중 로딩 상태를 쉽게 관리할 수 있도록 도와주는 커스텀 훅입니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import { useState } from "react";

/**
 * @brief 로딩 상태를 관리하는 커스텀 훅
 * @details 이 훅은 `loading` 상태와 `setLoading` 함수를 반환하여, 비동기 작업 중 로딩 상태를 쉽게 제어할 수 있습니다.
 * 
 * @return { { loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> } }
 * 로딩 상태와 해당 상태를 변경할 수 있는 `setLoading` 함수를 반환합니다.
 */
export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
};
