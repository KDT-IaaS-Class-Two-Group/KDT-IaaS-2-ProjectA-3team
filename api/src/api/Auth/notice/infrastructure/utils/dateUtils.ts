/**
 * 날짜 객체를 문자열 형식으로 변환하는 함수입니다.
 * @param {Date} date - 변환할 날짜 객체.
 * @returns {string} - `YYYY-MM-DD|HH:MM` 형식의 날짜 문자열.
 *
 * - 년도는 4자리로 출력됩니다 (예: 2024).
 * - 월과 일, 시간, 분은 2자리로 출력되며, 한 자릿수일 경우 0으로 패딩됩니다 (예: 09, 05).
 * - 날짜 형식은 `YYYY-MM-DD|HH:MM`입니다.
 */
export function dateSet(date: Date): string {
  // 년도 추출
  const year = date.getFullYear();
  // 월 추출 및 2자리로 패딩 (1월은 01, 2월은 02, ...)
  const month = String(date.getMonth() + 1).padStart(2, '0');
  // 일 추출 및 2자리로 패딩 (1일은 01, 2일은 02, ...)
  const day = String(date.getDate()).padStart(2, '0');
  // 시간 추출 및 2자리로 패딩 (0시부터 23시까지)
  const hours = String(date.getHours()).padStart(2, '0');
  // 분 추출 및 2자리로 패딩 (0분부터 59분까지)
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // 형식에 맞게 문자열 조합 (예: 2024-09-08|14:05)
  return `${year}-${month}-${day}|${hours}:${minutes}`;
}
