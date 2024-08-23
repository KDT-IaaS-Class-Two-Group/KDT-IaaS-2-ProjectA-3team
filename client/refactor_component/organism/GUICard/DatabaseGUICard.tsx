import React from "react";
import CardHeader from "client/refactor_component/molecule/card_header/card_header";
import DBGUI from "client/components/DatabaseGuI";

interface DatabaseGUICardProps {
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  button_style: string;
  title: string;
  button_text?: string; // optional로 설정
  children?: React.ReactNode; // 버튼 내용으로 사용할 수 있는 children 추가
}

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
