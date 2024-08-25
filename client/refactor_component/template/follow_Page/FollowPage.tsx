/**
 * @file FollowPage.tsx
 * @brief 사용자 검색 및 팔로우 기능을 제공하는 페이지 컴포넌트입니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 * 
 */

import React from "react";
import { useFollowPage } from "../../organism/follow_page/hook/use_follow_page";
import { handleFollow } from "../../organism/follow_page/service/handleFollow";
import Ul from "../../atom/ul/ul";
import Li from "../../atom/li/li";
import Button from "../../atom/button/button";
import Input from "../../atom/input/input";

/**
 * @brief 사용자 검색 및 팔로우 기능을 담당하는 React 컴포넌트입니다.
 *
 * `useFollowPage` 훅을 통해 상태를 관리하며, 사용자가 다른 사용자를 검색하고 팔로우 또는 언팔로우할 수 있는 기능을 제공합니다.
 *
 * @returns {React.FC} 사용자 검색 및 팔로우 페이지 컴포넌트
 */
const FollowPage: React.FC = () => {
  // 커스텀 훅을 사용하여 상태 및 함수 관리
  const {
    searchQuery,   ///< 사용자 검색어 상태
    setSearchQuery, ///< 검색어를 업데이트하는 함수
    users,         ///< 검색된 사용자 목록
    handleSearch,  ///< 검색 버튼 클릭 시 호출되는 함수
    loading,       ///< 검색 중 로딩 상태
    sessionData,   ///< 현재 세션 데이터
  } = useFollowPage();

  return (
    <div>
      <h1>사용자 검색 및 팔로우</h1>
      {/* 검색어 입력 필드 */}
      <Input
        id="searchQuery"
        type="text"
        placeholder="사용자 이름 또는 ID 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* 검색 버튼 */}
      <Button
        button_text={loading ? "검색 중..." : "검색"}
        button_style="" // 버튼 스타일을 적용
        onClick={handleSearch}
        disabled={loading}
      />
      {/* 검색된 사용자 목록 */}
      <Ul ul_style="">
        {users.map((user) => (
          <Li key={user.user_id} li_style="">
            <span>
              {user.username} ({user.email})
            </span>
            {/* 팔로우/언팔로우 버튼 */}
            <Button
              button_text={user.isFollowing ? "언팔로우" : "팔로우"}
              button_style="" // 버튼 스타일을 적용
              onClick={() =>
                handleFollow(user.user_id, user.isFollowing, sessionData, handleSearch)
              }
            />
          </Li>
        ))}
      </Ul>
    </div>
  );
};

export default FollowPage;
