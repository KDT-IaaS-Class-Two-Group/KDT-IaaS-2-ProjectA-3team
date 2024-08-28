/**
 * @file text_area.tsx
 * @brief 텍스트 영역 컴포넌트 파일
 * @details 이 파일은 사용자가 여러 줄의 텍스트를 입력할 수 있는 텍스트 영역 컴포넌트를 정의한다.
 * 주어진 클래스명과 자식 요소를 사용하여 텍스트 영역을 생성한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import TextAreaProps from "./props/text_area.props";

/**
 * @brief 텍스트 영역 컴포넌트
 * @details `value`, `onChange`, `name`, `id`, `placeholder`, `className` 속성을 받아 `textarea` 요소를 렌더링한다.
 *          주어진 `className`으로 스타일을 적용하고, `value`와 `onChange`로 입력 필드의 값과 변경 이벤트를 처리한다.
 * @param {TextAreaProps} props - 텍스트 영역 컴포넌트가 받는 속성들
 * @param {string} props.value - 텍스트 영역의 현재 값
 * @param {Function} props.onChange - 값이 변경될 때 호출되는 함수
 * @param {string} props.name - 텍스트 영역의 이름
 * @param {string} props.id - 텍스트 영역의 ID
 * @param {string} props.placeholder - 텍스트 영역의 placeholder 텍스트
 * @param {string} [props.className] - 텍스트 영역의 스타일 클래스 이름
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
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className} // 스타일 클래스 이름
    />
  );
};

export default TextArea;
