import React, { useState, useEffect } from "react";
import fetchNotices from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/service/fetch_notice_admin_list";
import { ListNotice } from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/interface/notice_admin_props";
import AuthListContent from "client/refactor_component/organism/notice_and_comment/notice_main_auth_content/notice_main_content";

/**
 * @function NoticeAuthContent
 * @description 게시물 데이터를 fetchNotices를 이용해 가져와 AuthListContent 컴포넌트에 전달
 */
const NoticeAuthContent = () => {
  const [authList, setAuthList] = useState<ListNotice[]>([]); // auth 서버에서 건너오는 게시물 데이터

  /**
   * @function useEffect
   * @description 컴포넌트가 처음 마운트될 때 fetchNotices 호출하여 게시물 리스트 설정
   */
  useEffect(() => {
    fetchNotices(setAuthList);
  }, []);

  /**
   * @returns {JSX.Element} AuthListContent 컴포넌트로 게시물 리스트를 렌더링
   */
  return (
    <AuthListContent authList={authList} />
  );
};

export default NoticeAuthContent;
