import { MemberList } from "../style/memberList.css";
interface MemberInfoProps {
  user_name : string;
  className : string | {}
}

const MemberInfoItem : React.FC<MemberInfoProps>= ({user_name})=>{
  return (
    <div className={MemberList}>
      <p>Member : {user_name}</p>
    </div>
  )
}
export default MemberInfoItem;