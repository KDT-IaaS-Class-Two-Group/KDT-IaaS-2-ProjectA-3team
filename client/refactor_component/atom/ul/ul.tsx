import UlProps from "./props/ul.props";

const Ul: React.FC<UlProps> = ({ ul_style, children }) => {
  return <ul className={ul_style}>{children}</ul>;
};
export default Ul;
