import React from 'react';

interface SubHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ children, className }) => (
  <h2 className={className}>{children}</h2>
);

export default SubHeader;
