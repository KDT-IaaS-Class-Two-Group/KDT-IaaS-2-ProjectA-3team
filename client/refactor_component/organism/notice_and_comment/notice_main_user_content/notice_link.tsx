import React from "react";
import LinkTag from "client/refactor_component/organism/notice_and_comment/notice_main_user_content/notice_link_ptag";
import * as styles from "client/styles/notice/notice.css";
import { ListNotice} from "client/refactor_component/molecule/notice_and_comment/user/notice_main_user_content/interface/notice_main_interface";

/**
 * @interface NoticeListProps
 * @description 게시물 리스트 컴포넌트에 필요한 속성 정의
 * @property {ListNotice[]} userList - 공지사항 리스트 배열
 * @property {number} currentPage - 현재 페이지 번호
 */
interface NoticeListProps {
  userList: ListNotice[];
  currentPage: number;
}

/**
 * @function NoticeList
 * @description 전달된 공지사항 리스트를 기반으로 공지사항 항목을 각각의 링크 컴포넌트로 렌더링. 게시물이 없을 경우 "게시물 없음" 메시지를 표시
 * 
 * @param {NoticeListProps} userList - 공지사항 객체 리스트
 * @param {NoticeListProps} currentPage - 현재 페이지 번호로, 공지사항 리스트의 인덱싱에 사용
 * 
 * @returns 공지사항 리스트를 화면에 보여주는 JSX 요소
 */
const NoticeList: React.FC<NoticeListProps> = ({ userList, currentPage }) => {
  return (
    <div className={styles.usercontentdiv}>
      {userList.length > 0 ? (
        userList.map((notice, index) => (
          <LinkTag
            key={notice._id}
            notice={notice} // 게시물
            index={index}
            currentPage={currentPage}
          />
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeList;
