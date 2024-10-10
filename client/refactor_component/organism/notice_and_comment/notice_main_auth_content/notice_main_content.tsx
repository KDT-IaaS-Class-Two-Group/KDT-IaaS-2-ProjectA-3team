import React from "react";
import * as styles from "client/styles/notice/notice.css";
import LinkTag from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/notice_admin_link_tags";
import { NoticeAuthListProps } from "./props/notice_list_auth_props";
/**
 * @component NoticeAuthList
 * @description 관리자 공지사항 리스트를 렌더링하는 컴포넌트
 *
 * @param {NoticeAuthListProps} authList - 공지사항 리스트를 담고 있는 props
 *
 * @returns 공지사항이 존재하면 리스트를, 존재하지 않으면 '게시물 없음'을 표시
 */
const NoticeAuthList: React.FC<NoticeAuthListProps> = ({ authList }) => {
  return (
    <div className={styles.authcontentdiv}>
      {authList.length > 0 ? (
        authList.map((notice, index) => (
          <div key={notice._id}>
            <LinkTag
              noticeId={notice._id} // 공지사항 ID
              index={index} // 공지사항 번호
              title={notice.title} // 공지사항 제목
              userId={notice.user_id} //공지사항 작성자
              createdAt={notice.createdAt} // 공지사항 작성일
            />
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeAuthList;
