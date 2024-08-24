import React from "react";
import InputProps from "./props/register_input.props";

/**
 * @file input.tsx
 * @brief 입력 필드 컴포넌트 파일
 * @details 이 파일은 다양한 타입의 입력 필드를 생성할 수 있는 재사용 가능한 Input 컴포넌트를 정의한다.
 *
 * @author @zoeznm
 * @date 2024-08-23
 */

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  onKeyDown,
  className, // className 추가
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className={className} // className 적용
    />
  );
};

export default Input;
