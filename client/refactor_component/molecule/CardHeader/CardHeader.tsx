import React from 'react';
import Text from 'client/refactor_component/atom/Text/Text';

interface CardHeaderProps {
  title: string;
  button_style: string;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  button_text?: string; // optional로 설정
  children?: React.ReactNode; // 버튼 내용으로 사용할 수 있는 children 추가
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
}) => {
  return (
    <div>
      <Text content={title} />
    </div>
  );
};

export default CardHeader;
