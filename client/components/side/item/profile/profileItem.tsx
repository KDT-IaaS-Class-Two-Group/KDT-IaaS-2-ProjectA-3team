import * as style from '../../style/side.css';
const ProfileBoard = () => {
  return (
    <div className={style.info}>
      <div>
        <p>프로필 영역</p>
      </div>

      <ul>
        <li>DashBoard</li>
        <li>Chat</li>
        <li>Team</li>
        <li>Project</li>
        <li>Task</li>
      </ul>
    </div>
  );
};
export default ProfileBoard;
