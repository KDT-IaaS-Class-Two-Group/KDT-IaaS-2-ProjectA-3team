//!!!!login_input 파일은 atom 폴더에 존재할 것이 아님. 이동 필요
//!! [ ] 추후 수정 필요
import React from "react";
import InputProps from "./props/login_input.props";

/**
 * @file input.tsx
 * @brief 입력 필드 컴포넌트 파일
 * @details 이 파일은 다양한 타입의 입력 필드를 생성할 수 있는 재사용 가능한 Input 컴포넌트를 정의한다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  onKeyDown,
  className,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className={className} // 스타일 클래스 이름
    />
  );
};

export default Input;
