import NoticeTitle from "client/components/userMainPage/noticeMainTitle";
import NoticeContent from "client/components/userMainPage/noticeMainContent";
import NoticeFooter from "client/components/userMainPage/noticeMainFooter";

const NoticeMainPage: React.FC = () => {
  return (
    <div>
      <div>
        <NoticeTitle />
      </div>
      <div>
        <NoticeContent />
      </div>
      <div>
        <NoticeFooter />
      </div>
    </div>
  );
};

export default NoticeMainPage;
