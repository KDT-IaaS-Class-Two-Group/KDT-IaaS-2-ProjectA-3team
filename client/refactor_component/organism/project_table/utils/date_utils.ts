/**
 * @function formatDate
 * @brief 주어진 날짜 문자열을 읽기 쉬운 형식으로 포맷합니다.
 * @description 이 함수는 ISO 8601 형식의 날짜 문자열을 읽기 쉬운 형식으로 변환합니다. 변환된 날짜는 "월 일, 연도" 형식으로 출력됩니다. 날짜 문자열이 유효하지 않을 경우, 기본 날짜 형식으로 변환됩니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 * 
 * @param {string} dateString - 포맷할 날짜를 나타내는 ISO 8601 형식의 문자열입니다. 예: "2024-08-25".
 * 
 * @returns {string} - 포맷된 날짜를 나타내는 문자열입니다. 예: "Aug 25, 2024".
 * 
 * @example
 * // 날짜 문자열 "2024-08-25"를 포맷할 경우
 * const formattedDate = formatDate('2024-08-25');
 * console.log(formattedDate); // "Aug 25, 2024"
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
