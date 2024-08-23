/**
 * @file form_field.tsx
 * @brief 폼 필드 컴포넌트 파일
 * @details 이 파일은 레이블과 입력 필드를 함께 렌더링하는 폼 필드 컴포넌트를 정의한다.
 * 사용자가 입력할 수 있는 폼 요소를 만들기 위해 레이블과 입력 필드를 결합하여 사용한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import Input from "client/refactor_component/atom/input/input";
import Label from "client/refactor_component/atom/label/label";
import FormFieldProps from "./props/form_field.props";

/**
 * @brief 폼 필드 컴포넌트
 * @details id, label, value, input_type, placeholder, onChange를 받아
 * 레이블과 입력 필드를 함께 렌더링한다. 사용자가 입력할 수 있는 폼 요소를 생성한다.
 * @param {FormFieldProps} props 폼 필드 컴포넌트가 받는 속성들 (id, label, value, input_type, placeholder, onChange)
 * @return 레이블과 입력 필드를 포함한 div 요소를 반환
 */
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
