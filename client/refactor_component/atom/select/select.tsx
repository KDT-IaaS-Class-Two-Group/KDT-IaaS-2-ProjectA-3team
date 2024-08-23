import React from "react";
import SelectProps from "./props/select.props";

const Select: React.FC<SelectProps> = ({ id, value, onChange, options }) => {
  return (
    <select id={id} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
