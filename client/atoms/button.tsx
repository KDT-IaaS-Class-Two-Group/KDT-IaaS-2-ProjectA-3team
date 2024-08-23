interface ButtonProps {
  button_text: string;
  button_style: string;
}
const Button: React.FC<ButtonProps> = ({ button_text, button_style }) => {
  return <button className={button_style}>{button_text}</button>;
};
export default Button;
