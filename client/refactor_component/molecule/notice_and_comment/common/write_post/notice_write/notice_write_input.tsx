import React from "react";
import Input from "client/refactor_component/atom/input/input";
import * as styles from "client/styles/notice/notice.css";
/**
 * @component TitleInput
 * @description
 * 사용자가 글 제목을 입력할 수 있는 텍스트 입력 필드를 렌더링하는 React 컴포넌트입니다.
 * `value`는 입력 필드의 현재 값을 정의하고, `onChange`는 입력 필드의 값이 변경될 때 호출되는 함수입니다.
 * 입력 필드는 `id`와 `placeholder` 속성을 가지고 있으며, 스타일은 `inputSize` 클래스를 사용합니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.value - 입력 필드의 현재 값
 * @param {Function} props.onChange - 입력 필드 값 변경 시 호출되는 함수
 *
 * @returns {JSX.Element} - 렌더링된 입력 필드 컴포넌트
 */
const TitleInput: React.FC<{
  value: string;
  onChange: (ele: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <div className={styles.checksize}>
      <Input
        id="title" // 입력 필드의 id 속성
        type="text" //입력 필드의 타입, 텍스트 입력 사용
        value={value} // 입력 필드의 현재 값
        onChange={onChange} // 입력 필드 값 변경 시 호출될 함수
        placeholder="글 제목" // 입력필드에 표시될 플레이스 홀더 텍스트
        className={styles.inputSize} // 입력 필드 스타일
      />
    </div>
  );
};

export default TitleInput;
