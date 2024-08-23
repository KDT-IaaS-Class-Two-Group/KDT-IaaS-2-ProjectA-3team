/**
 * @file Select.tsx
 * @brief 셀렉트 박스 컴포넌트 파일
 * @details 이 파일은 옵션을 선택할 수 있는 셀렉트 박스를 렌더링하는 재사용 가능한 Select 컴포넌트를 정의한다.
 * 라벨과 함께 옵션 목록을 제공하며, 선택된 값과 변경 이벤트를 처리한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import SelectProps from "./props/select.props";

/**
 * @brief 셀렉트 박스 컴포넌트
 * @details id, value, onChange, options, label을 받아 셀렉트 박스를 렌더링한다.
 * 라벨이 제공되면, 라벨을 포함한 셀렉트 박스를 생성하며, 각 옵션을 동적으로 생성한다.
 * @param {SelectProps} props 셀렉트 박스 컴포넌트가 받는 속성들 (id, value, onChange, options, label)
 * @return 선택 가능한 옵션 목록을 포함한 select 요소를 반환
 */
const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  label,
}) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      {/* 라벨이 존재할 경우 렌더링 */}
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
