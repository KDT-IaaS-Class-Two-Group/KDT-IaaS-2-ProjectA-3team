import Issue from "../interface/issue.interface";

interface IssueListProps {
  issues: Issue[] | null;
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <div>
      <p>ㅁㄴㅇF</p>
    </div>
  );
};
export default IssueList;
