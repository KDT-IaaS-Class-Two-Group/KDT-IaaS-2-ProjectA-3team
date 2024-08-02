import NoticeTitle from 'client/components/authPage/noticeMainTitle';
import NoticeContent from 'client/components/authPage/noticeMainContent';
import NoticeFooter from 'client/components/authPage/noticeMainFooter';

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
