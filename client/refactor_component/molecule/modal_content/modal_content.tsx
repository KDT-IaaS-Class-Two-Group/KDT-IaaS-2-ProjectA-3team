import ModalContentProps from "./props/modal_content.props";
// [ ] Modal 컨텐츠 스타일 지정.
 
const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <div className=''>{children}</div>;
};

export default ModalContent;
