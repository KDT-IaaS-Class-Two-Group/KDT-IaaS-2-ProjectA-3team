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
} from "client/styles/users/userdashboard.css";
import CalendarComponent from "../Calendar/calendar";

const UserMainContent: React.FC = () => {
  return (
    <div className={maincontentcontainer}>
      <div className={`${section} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${section} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${section} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${section} ${kanbansection}`}>
        <div className={cardHeader}>kanban board</div>
        <div className={cardContent}>Requested by 3 users</div>
      </div>
      <div className={`${section} ${calendarsection}`}>
        <CalendarComponent />
      </div>
      <div className={`${section} ${todolistsection}`}>
        <div className={cardHeader}>todolist</div>
        <div className={cardContent}></div>
      </div>
      <div className={`${section} ${usernoticesection}`}>
        <div className={cardHeader}>noticeboard</div>
        <div className={cardContent}>asd</div>
      </div>
      <div className={`${section} ${companybutton}`}>
        <div className={cardHeader}>출퇴근 버튼</div>
        <div className={cardContent}>Authorize 5 users</div>
      </div>
    </div>
  );
};

export default UserMainContent;
