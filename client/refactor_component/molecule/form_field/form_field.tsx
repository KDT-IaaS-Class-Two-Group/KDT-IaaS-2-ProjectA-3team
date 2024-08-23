// src/components/molecule/formField/FormField.tsx
import React from "react";
import Input from "client/refactor_component/atom/input/Input";
import Label from "client/refactor_component/atom/label/Label";
import FormFieldProps from "./props/form_field.props";

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  input_type,
  placeholder,
  onChange,
}) => {
  return (
    <div className="">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={input_type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;
