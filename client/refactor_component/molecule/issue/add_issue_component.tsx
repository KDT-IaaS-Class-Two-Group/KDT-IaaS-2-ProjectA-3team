/**
 * @file add_issue_component.tsx
 * @brief 이슈 추가 컴포넌트 파일
 * @details 이 컴포넌트는 사용자가 이슈 이름을 입력하고, 해당 이슈를 지정된 프로젝트에 추가할 수 있는 기능을 제공한다.
 *          사용자가 입력한 이슈 이름을 서버에 전송하여 이슈를 생성하고, 성공적으로 생성되면 컴포넌트를 닫는다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import { useState } from "react";
import { AddIssueProps } from "./props/add_issue.props";
import fetchCreateIssue from "./service/fetch_create_issue";

/**
 * @brief 이슈 추가 컴포넌트
 * @details 사용자가 이슈 이름을 입력하고 버튼을 클릭하여 새로운 이슈를 생성할 수 있는 컴포넌트.
 *          입력 필드와 생성 버튼을 제공하며, 생성 버튼 클릭 시 `fetchCreateIssue` 함수를 호출하여 이슈를 생성한다.
 *          이슈 생성이 성공하면 `onClose` 콜백이 호출된다.
 * @param {AddIssueProps} props 컴포넌트에 전달되는 속성들
 * @param {string} props.project_name - 이슈를 추가할 프로젝트의 이름
 * @param {() => void} props.onClose - 이슈 추가 후 호출되는 콜백 함수, 컴포넌트가 닫히는 등의 후처리를 수행
 * @return {JSX.Element} 이슈 이름을 입력할 수 있는 필드와 생성 버튼을 포함하는 JSX 요소
 */
const AddIssueComponent: React.FC<AddIssueProps> = ({
  project_name,
  onClose,
}) => {
  const [data, setData] = useState<string>("");

  /**
   * @brief 입력 필드의 값이 변경될 때 호출되는 핸들러
   * @details 입력 필드의 값이 변경될 때 호출되어 상태를 업데이트한다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 필드의 변경 이벤트
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="이슈 이름" onChange={handleChange} />
      <button
        onClick={async () => {
          try {
            const response = await fetchCreateIssue(project_name, data);
            if (response === true) {
              onClose(); // 이슈 생성 후 컴포넌트 닫기
              console.log("야호"); // 생성 성공 메시지
            }
          } catch (error) {
            console.error("이슈 생성 실패:", error); // 생성 실패 시 에러 로그
          }
        }}
      >
        생성
      </button>
    </div>
  );
};

export default AddIssueComponent;
