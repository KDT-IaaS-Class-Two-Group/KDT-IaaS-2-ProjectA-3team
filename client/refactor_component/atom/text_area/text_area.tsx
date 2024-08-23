import TextAreaProps from "./props/text_area.props";

const TextArea: React.FC<TextAreaProps> = ({ children, className }) => {
  return <textarea className={className}>{children}</textarea>;
};
export default TextArea;
