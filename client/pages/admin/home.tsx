import Link from "next/link";
import Sidebar from "./../../components/SideBar/Sidebar";
import { mainpagecontainer } from "client/styles/sidebar/SidebarStyles.css";
import Project from "client/components/auth_Component/project/project";
import PendingUser from "client/components/MemberVerification/utils/PendingUser";
import StateUsers from "client/components/StateUsers";
import Attendance from "client/components/attendance";
import NoticeBoard from "client/components/Notice/NoticeBoard";
import DatabaseGUI from "client/components/DatabaseGuI";
const Dash: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <Sidebar />
      <div>
        <p>Hello state</p>
        <p>권한 나타내기</p>
      </div>
      <Project
        projectName="프로젝트 이름"
        necessaryPeriod="필요한 기간"
        team="팀 이름"
      />
      <PendingUser Management="" AuthorizeStateUsers="" state="" />
      <div>
        <p>Edit Requests</p>
        <button>크게 보기</button>
        <div>
          <p>img</p>
          <p>Requeted by state users</p>
          <div>state</div>
        </div>
      </div>
      <StateUsers img="" StateUsers="" state="" />
      <Attendance />
      <NoticeBoard />
      <DatabaseGUI />
      <button>
        <Link href={"/admin/pendingRegister"}>대기</Link>
      </button>
      <button>
        <Link href={"/user/home"}>홈</Link>
      </button>
    </div>
  );
};

export default Dash;
