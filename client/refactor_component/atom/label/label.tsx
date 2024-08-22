import React from "react";
import LabelProps from "./props/label.props";
const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};
export default Label;
