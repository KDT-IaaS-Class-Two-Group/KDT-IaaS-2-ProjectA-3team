import React from "react";
import DatabaseGUICard from "client/refactor_component/organism/gui_card/db_card";

interface DashboardTemplateProps {
  onDatabaseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  containerClassName?: string;
  buttonChildren?: React.ReactNode; // 버튼 내용으로 사용할 수 있는 children 추가
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  onDatabaseButtonClick,
  containerClassName,
  buttonChildren,
}) => {
  return (
    <div className={containerClassName}>
      <DatabaseGUICard
        onButtonClick={onDatabaseButtonClick}
        title="Database GUI" button_style={""}      >
        {buttonChildren} {/* DatabaseGUICard에 children 전달 */}
      </DatabaseGUICard>
      {/* 다른 Organism들을 이곳에 추가할 수 있습니다 */}
    </div>
  );
};

export default DashboardTemplate;
