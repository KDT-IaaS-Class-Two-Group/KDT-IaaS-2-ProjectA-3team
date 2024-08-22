import ButtonProps from "./props/button.props";

const Button: React.FC<ButtonProps> = ({
  button_text,
  button_style,
  onClick,
}) => {
  return (
    <button className={button_style} onClick={onClick}>
      {button_text}
    </button>
  );
};
export default Button;
