/**
 * @file Input.tsx
 * @brief 입력 필드 컴포넌트 파일
 * @details 이 파일은 다양한 타입의 입력 필드를 생성할 수 있는 재사용 가능한 Input 컴포넌트를 정의한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import InputProps from "./props/input.props";

/**
 * @brief 입력 필드 컴포넌트
 * @details id, type, value, onChange 핸들러, placeholder를 받아 입력 필드를 렌더링한다.
 * @param {InputProps} props 입력 필드 컴포넌트가 받는 속성들
 * @return 다양한 속성이 적용된 input 요소를 반환
 */
const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className="" // [ ] input 기본 스타일 정의 필요
      id={id} // input 요소의 ID
      type={type} // input 요소의 타입 (예: text, password)
      value={value} // input 요소의 현재 값
      onChange={onChange} // 값이 변경될 때 호출되는 함수
      placeholder={placeholder} // placeholder 텍스트
    />
  );
};

export default Input;
