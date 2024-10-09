export default interface CardHeaderProps {
  title: string;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  button_text?: string; // 이 속성이 필요하다면 추가하세요
  button_style?: string; // 이 속성이 필요하다면 추가하세요
  children?: React.ReactNode; // children 속성 추가
}