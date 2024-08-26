/**
 * @interface SectionConfig
 * @brief 카드 섹션의 레이아웃과 동작을 설정하는 구성 객체
 * @details 카드 섹션의 클래스명, 타이틀, 버튼 텍스트 및 클릭 이벤트 핸들러를 정의할 수 있다.
 * @property {string} sectionClassName - 카드 섹션의 CSS 클래스명
 * @property {string} title - 카드 섹션에 표시될 타이틀
 * @property {string} [buttonText] - 버튼에 표시될 텍스트 (옵션)
 * @property {(props: any) => void} [onClick] - 버튼 클릭 시 호출될 이벤트 핸들러 (옵션)
 */
export default interface SectionConfig {
  sectionClassName: string;
  title: string;
  buttonText?: string;
  onClick?: (props: any) => void;
}
