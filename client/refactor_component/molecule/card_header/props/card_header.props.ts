export default interface CardHeaderProps {
  title: string; // 카드 헤더의 타이틀
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // 버튼 클릭 이벤트 핸들러
}
