import React from "react";
import TextAreaProps from "./props/text_area.props";

/**
 * @brief 텍스트 영역 컴포넌트
 * @details `value`, `onChange`, `name`, `id`, `placeholder`, `className` 속성을 받아 `textarea` 요소를 렌더링한다.
 *          주어진 `className`으로 스타일을 적용하고, `value`와 `onChange`로 입력 필드의 값과 변경 이벤트를 처리한다.
 * @param {TextAreaProps} props - 텍스트 영역 컴포넌트가 받는 속성들
 * @return 스타일이 적용된 `textarea` 요소를 반환하여 텍스트 입력을 지원
 */
const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  name,
  id,
  placeholder,
  className,
}) => {
  return (
    <textarea
      value={value} // 텍스트 영역의 현재 값
      onChange={onChange} // 값이 변경될 때 호출되는 함수
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default TextArea;
