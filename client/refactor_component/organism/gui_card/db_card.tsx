import React from "react";
import CardHeader from "client/refactor_component/molecule/card_header/card_header";
import DBGUI from "client/components/DatabaseGuI";
import DatabaseGUICardProps from "./props/db_card.props";

const DatabaseGUICard: React.FC<DatabaseGUICardProps> = ({
  onButtonClick,
  title,
  button_text,
  children,
}) => {
  return (
    <div>
      <CardHeader
        title={title}
        onButtonClick={onButtonClick}
        button_text={button_text}
        button_style={""}
      >
        {children}
      </CardHeader>
      <div>
        <DBGUI />
      </div>
    </div>
  );
};

export default DatabaseGUICard;
