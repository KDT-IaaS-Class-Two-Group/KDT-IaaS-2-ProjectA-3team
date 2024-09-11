import React from "react";
import TextArea from "client/refactor_component/atom/text_area/text_area";
import * as styles from "client/styles/notice/notice.css";
/**
 * @component ContentTextArea
 * @description
 * 사용자가 글 내용을 입력할 수 있는 텍스트 에어리어를 렌더링하는 React 컴포넌트입니다.
 * `value`는 텍스트 에어리어의 현재 값을 정의하고, `onChange`는 텍스트 에어리어의 값이 변경될 때 호출되는 함수입니다.
 * 텍스트 에어리어는 `name`과 `id` 속성을 가지고 있으며, 스타일은 `textareaSize` 클래스를 사용합니다.
 * 
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.value - 텍스트 에어리어의 현재 값
 * @param {Function} props.onChange - 텍스트 에어리어 값 변경 시 호출되는 함수
 * 
 * @returns {JSX.Element} - 렌더링된 텍스트 에어리어 컴포넌트
 */
const ContentTextArea: React.FC<{
  value: string;
  onChange: (ele: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <div className={styles.testsize}>
      <TextArea
        value={value}// 현재 값
        onChange={onChange} // 값 변경 시 호출되는 함수
        name="content"
        id="content"
        placeholder="글 내용"// 플레이스홀더 텍스트 설정
        className={styles.textareaSize} //스타일
      />
    </div>
  );
};

export default ContentTextArea;
