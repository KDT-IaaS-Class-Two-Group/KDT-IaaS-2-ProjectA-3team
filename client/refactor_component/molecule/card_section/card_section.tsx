import Card from "client/refactor_component/atom/card/card";
import React from "react";
import CardHeader from "../card_header/card_header";
import Button from "client/refactor_component/atom/button/button";
const CardSection: React.FC<CardSectionProps> = ({
  sectionClassName,
  title,
  buttonText,
  onClick,
  content,
}) => {
  return (
    <Card container_style={sectionClassName}>
      <CardHeader title={title} />
      <Button button_text={buttonText} onClick={onClick} button_style={""} />
      <div className="cardContent">{content}</div>
    </Card>
  );
};

export default CardSection;
