import NoticeTitle from "client/components/userMainPage/noticeMainTitle";
import NoticeContent from "client/components/userMainPage/noticeMainContent";
import NoticeFooter from "client/components/userMainPage/noticeMainFooter";
import NoticeAuthContent from "client/components/authNotice/noticeAuthContent";
import { pagemainmain } from "client/styles/team/teampage.css";
import * as styles from "../styles/notice/notice.css";

const NoticeMainPage: React.FC = () => {
  return (
    <div className={pagemainmain}>
      <div>
        <NoticeTitle />
      </div>

      <div>
        <div className={styles.noticecontent}>
          <div className={styles.title}>
            <p className={styles.TagSize}>Number</p>
            <p className={styles.pTagTitle}>Title</p>
            <p className={styles.TagSize}>Author</p>
            <p className={styles.TagSize}>Creation Date</p>
          </div>
          <div>
            <NoticeAuthContent />
          </div>
          <div>
            <NoticeContent />
          </div>
        </div>
        <div>
          <NoticeFooter />
        </div>
      </div>
    </div>
  );
};

export default NoticeMainPage;
