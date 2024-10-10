export default // props/card_header.props.ts
interface CardHeaderProps {
  title: string;
  onButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void; // 필수로 설정
  button_text?: string; // 선택적 속성
  button_style?: string; // 선택적 속성
  children?: React.ReactNode; // children 속성
}
