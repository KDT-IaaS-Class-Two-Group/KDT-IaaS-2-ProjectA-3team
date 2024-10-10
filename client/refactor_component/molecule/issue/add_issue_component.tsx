import { useState } from "react";
import { AddIssueProps } from "./props/add_issue.props";
import fetchCreateIssue from "./service/fetch_create_issue";

interface AddIssueComponentProps extends AddIssueProps {
  user_id: string; // user_id 추가
}

const AddIssueComponent: React.FC<AddIssueComponentProps> = ({
  project_name,
  user_id, // user_id를 props로 받음
  onClose,
}) => {
  const [data, setData] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="이슈 이름" onChange={handleChange} />
      <button
        onClick={async () => {
          try {
            // user_id를 이슈 생성 요청에 포함하여 전달
            const response = await fetchCreateIssue(
              project_name,
              data,
              user_id
            );
            if (response === true) {
              onClose(); // 이슈 생성 후 컴포넌트 닫기
              console.log("이슈가 성공적으로 생성되었습니다.");
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
