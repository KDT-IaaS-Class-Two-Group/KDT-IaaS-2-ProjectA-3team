import * as style from 'client/styles/project/side.css';

import ProfileBoard from './profileBoard';
import NoticeBoard from './noticeBoard';
const Side = () => {
  return (
    <div className={style.container}>
      <ProfileBoard></ProfileBoard>
      <NoticeBoard></NoticeBoard>
    </div>
  );
};

export default Side;
