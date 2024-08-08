import Link from "next/link";
import Sidebar from "./../../components/SideBar/Sidebar";
import { mainpagecontainer } from "client/styles/sidebar/SidebarStyles.css";
const Dash: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <Sidebar />
      <div>
        <p>Hello state</p>
        <p>권한 나타내기</p>
        <div>
          <div>
            <p>project</p>
            <button>크게 보기</button>
          </div>
          <div>
            <p>project name</p>
            <p>necessary period</p>
            <p>team</p>
          </div>
          <div>{/* 프로젝트 하나씩 나오게 */}</div>
        </div>
        <div>
          <div>
            <p>User Management</p>
            <button>크게 보기</button>
          </div>
          <div>
            <p>img</p>
            <p>Authorize state users</p>
            <div>state</div>
          </div>
        </div>
        <div>
          <p>Edit Requests</p>
          <button>크게 보기</button>
          <div>
            <p>img</p>
            <p>Requested by state users</p>
            <div>state</div>
          </div>
        </div>
        <div>
          <p>work attendance</p>
          <button>크게 보기</button>
          <div>{/* !랜덤 3명 근태 조회 !기능 미구현*/}</div>
        </div>
        <div>
          <p>notice board</p>
          <button>크게 보기</button>
          <div>
            <p>별Manager</p>
            {/* 최신 순 글 3개 조회 */}
          </div>
          <div>
            <p>별User</p>
            {/* 최신 순 글 3개 조회 */}
          </div>
        </div>
        <div>
          <p>Database GUI</p>
          <div>{/* div 조회 4개 */}</div>
        </div>
        <button>
          <Link href={"/admin/pendingRegister"}>대기</Link>
        </button>
        <button>
          <Link href={"/user/home"}>홈</Link>
        </button>
      </div>
    </div>
  );
};

export default Dash;
