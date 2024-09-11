import React, { useState, useEffect } from "react";
import fetchNotices from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/service/fetch_notice_admin_list";
import { ListNotice } from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/interface/notice_admin_props";
import AuthListContent from "client/refactor_component/organism/notice_and_comment/notice_main_auth_content/notice_main_content";

const NoticeAuthContent = () => {
  const [authList, setAuthList] = useState<ListNotice[]>([]); // auth 서버에서 건너오는 게시물 데이터

  useEffect(() => {
    fetchNotices(setAuthList);
  }, []);

  return (
    <AuthListContent authList={authList} />
  );
};

export default NoticeAuthContent;
