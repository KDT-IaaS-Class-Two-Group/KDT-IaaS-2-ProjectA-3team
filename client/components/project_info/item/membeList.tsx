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
      <h2>Member</h2>
      {memberData && memberData.length > 0 ? (
        memberData.map((data: Member, index) => (
          <div className={MemberList} key={index}>
            <p>{data.username}</p>
          </div>
        ))
      ) : (
        <p>멤버 정보가 없습니다.</p>
      )}
    </div>
  );
};
export default MemberInfoItem;
