/**
 * @file use_loading.tsx
 * @brief 로딩 상태를 관리하는 커스텀 훅
 * @details 이 파일은 로딩 상태를 관리하는 `useLoading` 훅을 정의합니다. 
 * 로딩 상태를 나타내는 `loading` 상태와 상태를 변경하는 `setLoading` 함수를 제공합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import { useState } from "react";

/**
 * @function useLoading
 * @brief 로딩 상태를 관리하는 훅
 * @details 이 훅은 로딩 상태를 `false`로 초기화하고, 상태를 나타내는 `loading`과 상태를 변경하는 `setLoading`을 반환합니다.
 * 로딩 상태는 일반적으로 데이터 로드 중에 UI를 적절히 표시하기 위해 사용됩니다.
 *
 * @return {Object} 로딩 상태와 상태를 변경하는 함수를 포함하는 객체
 * @return {boolean} loading - 현재 로딩 상태를 나타내는 불리언 값
 * @return {Function} setLoading - 로딩 상태를 변경하는 함수
 */
export const useLoading = () => {
  // 로딩 상태를 나타내는 상태 변수
  const [loading, setLoading] = useState(false);

  // 상태와 상태 변경 함수를 객체 형태로 반환
  return { loading, setLoading };
};
