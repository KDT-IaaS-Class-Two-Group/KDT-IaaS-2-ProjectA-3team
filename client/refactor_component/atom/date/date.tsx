/**
 * @file format_date.tsx
 * @brief 날짜 포맷팅 함수 파일
 * @details 이 파일에는 문자열로 전달된 날짜를 "YYYY년 MM월 DD일" 형식으로 변환하는 함수가 포함되어 있다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

export const formatDate = (dateStr: string) => {
  // 전달된 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateStr);

  // 연도를 추출
  const year = date.getFullYear();

  // 월을 추출하고 두 자릿수 형식으로 변환
  const month = String(date.getMonth() + 1).padStart(2, "0");

  // 일을 추출하고 두 자릿수 형식으로 변환
  const day = String(date.getDate()).padStart(2, "0");

  // "YYYY년 MM월 DD일" 형식으로 날짜를 포맷팅하여 반환
  return `${year}년 ${month}월 ${day}일`;
};
