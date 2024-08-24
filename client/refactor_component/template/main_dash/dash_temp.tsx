import React from "react";
import DatabaseGUICard from "client/refactor_component/organism/gui_card/db_card";

interface DashTempProps {
  onDatabaseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  containerClassName?: string;
  buttonChildren?: React.ReactNode;
}

const DashTemp: React.FC<DashTempProps> = ({
  onDatabaseButtonClick,
  containerClassName,
  buttonChildren,
}) => {
  return (
    <div className={containerClassName}>
      <DatabaseGUICard
        onButtonClick={onDatabaseButtonClick}
        title="Database GUI"
        button_style={""}
      >
        {buttonChildren}
      </DatabaseGUICard>
    </div>
  );
};

export default DashTemp;
