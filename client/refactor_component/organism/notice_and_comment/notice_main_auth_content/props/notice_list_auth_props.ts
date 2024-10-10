import { ListNotice } from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/interface/notice_admin_props";
/**
 * @interface NoticeAuthListProps
 * @description 관리자 게시판에서 사용되는 공지 리스트 속성을 정의한 인터페이스
 *
 * @property {ListNotice[]} authList - 공지사항 리스트. 각 공지사항의 상세 정보는 ListNotice 타입을 따름
 */
export interface NoticeAuthListProps {
  authList: ListNotice[];
}
