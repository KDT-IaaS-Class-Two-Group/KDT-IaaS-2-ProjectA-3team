import CardProps from "./props/card.props";

const Card: React.FC<CardProps> = ({ container_style, children }) => {
  return <div className={container_style}>{children}</div>;
};
export default Card;
