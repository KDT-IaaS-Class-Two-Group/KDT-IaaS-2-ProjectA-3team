/**
 * !!Card와 같은 형식, modalcontent로 분리한 이유?
 * @file modal_content.tsx
 * @brief 모달 컨텐츠 컴포넌트 파일
 * @details 이 파일은 모달의 내용을 표시하는 `ModalContent` 컴포넌트를 정의한다.
 *          `children` 속성으로 전달된 내용을 모달의 콘텐츠로 렌더링한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import ModalContentProps from "./props/modal_content.props";

/**
 * @brief 모달 컨텐츠 컴포넌트
 * @details 모달의 내용을 표시하는 컴포넌트로, `children` 속성을 통해 전달된 내용을 렌더링한다.
 *          추가적인 스타일 지정이 필요하다.
 * @param {ModalContentProps} props 컴포넌트에 전달되는 속성들
 * @param {React.ReactNode} props.children - 모달의 내용으로 렌더링할 자식 요소들
 * @return {JSX.Element} 모달의 내용을 포함하는 JSX 요소
 */
const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default ModalContent;
