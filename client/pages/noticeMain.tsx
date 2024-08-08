import NoticeTitle from 'client/components/userMainPage/noticeMainTitle';
import NoticeContent from 'client/components/userMainPage/noticeMainContent';
import NoticeFooter from 'client/components/userMainPage/noticeMainFooter';
import NoticeAuthContent from 'client/components/authNotice/noticeAuthContent';

const NoticeMainPage: React.FC = () => {
  return (
    <div>
      <div>
        <NoticeTitle />
      </div>
      <div>
        <NoticeAuthContent />
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
