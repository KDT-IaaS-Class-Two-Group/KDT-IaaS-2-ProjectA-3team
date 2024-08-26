export default interface CardButtonProps {
  buttonText?: string;
  buttonStyle?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
