import React from "react";
import SelectProps from "./props/select.props";

const Select: React.FC<SelectProps> = ({ id, value, onChange, options, label }) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} value={value} onChange={onChange} aria-labelledby={id}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
