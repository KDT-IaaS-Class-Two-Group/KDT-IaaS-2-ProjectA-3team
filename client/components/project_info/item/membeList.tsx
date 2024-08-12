import { MemberList } from "../style/memberList.css";
interface MemberInfoProps {
  memberData: Member[];
}
interface Member {
  user_id: string;
  username: string;
  email: string;
  team_name: string;
  role_name: string;
}

const MemberInfoItem: React.FC<MemberInfoProps> = ({ memberData }) => {
  return (
    <div>
      {memberData.map((data: Member, index) => {
        return (
          <div className={MemberList}>
            <p>User_Name : {data.username}</p>
          </div>
        );
      })}
    </div>
  );
};
export default MemberInfoItem;
