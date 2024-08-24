export default interface DatabaseGUICardProps {
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    button_style: string;
    title: string;
    button_text?: string; // optional로 설정
    children?: React.ReactNode; // 버튼 내용으로 사용할 수 있는 children 추가
  }