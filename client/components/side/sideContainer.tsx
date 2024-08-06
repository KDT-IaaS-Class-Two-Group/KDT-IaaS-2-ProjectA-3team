import * as style from './style/side.css';

import ProfileBoard from './item/profile/profileItem';
import NoticeBoard from './item/notice/noticeItem';
const Side = () => {
  return (
    <div className={style.container}>
      <ProfileBoard></ProfileBoard>
      <NoticeBoard></NoticeBoard>
    </div>
  );
};

export default Side;
