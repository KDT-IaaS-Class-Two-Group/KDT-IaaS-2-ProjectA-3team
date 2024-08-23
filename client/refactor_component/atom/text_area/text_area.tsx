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
 * @details className과 children을 받아 textarea 요소를 렌더링한다.
 * 주어진 className으로 스타일을 적용하고, children으로 전달된 내용을 텍스트 영역 안에 표시한다.
 * @param {TextAreaProps} props 텍스트 영역 컴포넌트가 받는 속성들 (className, children)
 * @return 스타일이 적용된 textarea 요소를 반환하여 텍스트 입력을 지원
 */
const TextArea: React.FC<TextAreaProps> = ({ children, className }) => {
  return <textarea className={className}>{children}</textarea>;
};

export default TextArea;
