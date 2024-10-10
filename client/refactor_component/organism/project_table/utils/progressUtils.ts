/**
 * @function calculateProgress
 * @brief 주어진 시작일과 종료일 사이의 경과 비율을 계산합니다.
 * @description 이 함수는 현재 날짜를 기준으로 시작일과 종료일 사이의 경과 비율을 계산하여 퍼센트로 반환합니다. 시작일과 종료일의 차이를 계산하여, 현재 날짜까지의 경과 비율을 구합니다. 비율은 0%에서 100% 사이로 제한됩니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @param {string} start - 프로젝트의 시작일을 나타내는 ISO 8601 형식의 날짜 문자열입니다.
 * @param {string} end - 프로젝트의 종료일을 나타내는 ISO 8601 형식의 날짜 문자열입니다.
 *
 * @returns {string} - 현재 날짜를 기준으로 계산된 경과 비율을 퍼센트 형식의 문자열로 반환합니다.
 *
 * @example
 * // 시작일이 2024년 1월 1일, 종료일이 2024년 12월 31일인 경우
 * const progress = calculateProgress('2024-01-01', '2024-12-31');
 * console.log(progress); // "xx%" - 현재 날짜에 따라 계산된 퍼센트 값이 출력됩니다.
 */
export const calculateProgress = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = now.getTime() - startDate.getTime();
  return `${Math.min((elapsedDuration / totalDuration) * 100, 100).toFixed(0)}%`;
};
