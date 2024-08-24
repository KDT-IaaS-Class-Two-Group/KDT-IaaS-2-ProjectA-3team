import React from "react";
import Input from "client/refactor_component/atom/register_input/register_input";
import Label from "client/refactor_component/atom/label/label";
import FormFieldProps from "./props/registr_form_field.props";

/**
 * @file form_field.tsx
 * @brief 폼 필드 컴포넌트 파일
 * @details 이 파일은 레이블과 입력 필드를 함께 렌더링하는 폼 필드 컴포넌트를 정의한다.
 * 사용자가 입력할 수 있는 폼 요소를 만들기 위해 레이블과 입력 필드를 결합하여 사용한다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  input_type,
  placeholder,
  onChange,
  className, // className 추가
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
        className={className} // className을 Input에 전달
      />
    </div>
  );
};

export default FormField;
