import LiProps from "./props/li.props";

const Li: React.FC<LiProps> = ({ li_style, children }) => {
  return <li className={li_style}>{children}</li>;
};
export default Li;
