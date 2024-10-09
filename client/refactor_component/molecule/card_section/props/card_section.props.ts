export default interface CardSectionProps {
  sectionClassName: string; // 카드 섹션의 스타일 클래스명
  title: string; // 카드 헤더의 타이틀
  buttonText?: string; // 카드 헤더에 표시할 버튼 텍스트
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // 버튼 클릭 이벤트 핸들러
  children: React.ReactNode; // 카드 콘텐츠
}
