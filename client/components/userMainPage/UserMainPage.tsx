import {
  cardContent,
  cardHeader,
  maincontentcontainer,
  projectSection,
  section,
} from "client/styles/admin/admindashboard.css";
import {
  calendarsection,
  companybutton,
  favsection,
  kanbansection,
  todolistsection,
  usernoticesection,
  usersection,
} from "client/styles/users/userdashboard.css";
import CalendarComponent from "../Calendar/calendar";
import NoticeBoard from "../Notice/NoticeBoard";
import Button from "../common/elements/button";
interface UserMainContentProps {
  onclick: (component: React.ReactNode) => void;
}

const UserMainContent: React.FC<UserMainContentProps> = ({ onclick }) => {
  return (
    <>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${kanbansection}`}>
        <div className={cardHeader}>kanban board</div>
        <div className={cardContent}>Requested by 3 users</div>
      </div>
      <div className={`${usersection} ${calendarsection}`}>
        <CalendarComponent />
      </div>
      <div className={`${usersection} ${todolistsection}`}>
        <div className={cardHeader}>todolist</div>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${usernoticesection}`}>
        <div className={cardHeader}>noticeboard</div>
        <Button onClick={() => onclick(<NoticeBoard />)} />
        <NoticeBoard />
      </div>
      <div className={`${usersection} ${companybutton}`}>
        <div className={cardHeader}>출퇴근 버튼</div>
        <div className={cardContent}>Authorize 5 users</div>
      </div>
    </>
  );
};

export default UserMainContent;
