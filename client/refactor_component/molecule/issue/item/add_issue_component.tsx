import { useState } from "react";
import fetchCreateIssue from "../service/fetch_create_issue";
import { AddIssueProps } from "../props/add_issue.props";

const AddIssueComponent: React.FC<AddIssueProps> = ({
  project_name,
  onClose,
}) => {
  const [data, setData] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };
  return (
    <div>
      <input type="text" placeholder="이슈 이름" onChange={handleChange} />
      <button
        onClick={async () => {
          const response = await fetchCreateIssue(project_name, data);
          if (response === true) {
            onClose();
            console.log("야호");
          }
        }}
      >
        생성
      </button>
    </div>
  );
};

export default AddIssueComponent;
