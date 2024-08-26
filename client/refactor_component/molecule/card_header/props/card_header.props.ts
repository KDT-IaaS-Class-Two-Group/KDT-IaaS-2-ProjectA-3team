export default interface CardHeaderProps {
  title: string; // 카드 헤더의 타이틀
  buttonText?: string; // 카드 헤더에 표시할 버튼 텍스트
  buttonStyle?: string; // 버튼의 스타일
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // 버튼 클릭 이벤트 핸들러
}
