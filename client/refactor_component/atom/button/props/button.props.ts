export default interface ButtonProps {
  button_text: string;
  button_style: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
