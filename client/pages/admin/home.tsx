import {
  mainpagecontainer,
  contentcontainer,
} from "client/styles/admin/admindashboard.css";
import { fullRowSection } from "client/styles/admin/greet/greet.css";
import AdminSidebar from "../../components/SideBar/AdminSidebar";
import MainHeader from "client/components/common/header/mainheader";
import AdminMainContent from "client/components/adminMainPage/AdminMainPage";
fullRowSection;
const Dash: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <AdminSidebar />
      <div className={contentcontainer}>
        <MainHeader />
        <AdminMainContent />
      </div>
    </div>
  );
};

export default Dash;
