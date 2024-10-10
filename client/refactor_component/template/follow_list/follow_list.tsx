/**
 * @file follow_list.tsx
 * @brief 팔로우 중인 사용자 목록 페이지
 * @details 이 컴포넌트는 현재 사용자가 팔로우 중인 사용자 목록을 서버로부터 가져와서 화면에 표시합니다.
 * 로딩 상태를 관리하며, 데이터를 가져오는 동안 "로딩 중..." 메시지를 보여줍니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import React, { useState, useEffect } from "react";
import { User } from "../../organism/follow_list/props/user.props";
import { fetchFollowingList } from "../../organism/follow_list/service/fetch_following_list";
import { useLoading } from "../../organism/follow_list/hook/use_loading";
import Ul from "../../atom/ul/ul"; // 목록을 표시하는 커스텀 Ul 컴포넌트
import Li from "../../atom/li/li"; // 목록 항목을 표시하는 커스텀 Li 컴포넌트

/**
 * @function FollowingListPage
 * @brief 팔로우 중인 사용자 목록 페이지 컴포넌트
 * @details 팔로우 중인 사용자 목록을 로드하고 표시하는 페이지 컴포넌트입니다.
 * useEffect를 사용하여 컴포넌트가 마운트될 때 팔로우 중인 사용자 목록을 비동기로 가져옵니다.
 * 로딩 중일 때는 "로딩 중..." 메시지를 표시하고, 로딩이 완료되면 사용자 목록을 표시합니다.
 *
 * @returns {JSX.Element} 팔로우 중인 사용자 목록을 표시하는 JSX 요소
 */
const FollowingListPage: React.FC = () => {
  const { loading, setLoading } = useLoading(); // 로딩 상태와 로딩 상태를 업데이트하는 함수
  const [followingList, setFollowingList] = useState<User[]>([]); // 팔로우 중인 사용자 목록 상태

  useEffect(() => {
    // 팔로우 중인 사용자 목록을 로드하는 비동기 함수
    const loadFollowingList = async () => {
      setLoading(true); // 로딩 시작
      try {
        const data = await fetchFollowingList(); // 서버에서 팔로우 중인 사용자 목록을 가져옴
        setFollowingList(data); // 상태 업데이트
      } catch (error) {
        console.error("Error occurred while fetching following list", error); // 오류 처리
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    loadFollowingList(); // 데이터 로드 호출
  }, [setLoading]); // 컴포넌트가 마운트될 때 실행

  return (
    <div>
      <h1>팔로우 중인 사용자 목록</h1>
      {loading ? (
        <p>로딩 중...</p> // 로딩 상태일 때 표시되는 메시지
      ) : (
        <Ul ul_style={""}>
          {" "}
          {/* 스타일을 지정할 수 있는 Ul 컴포넌트 */}
          {followingList.map((user: User) => (
            <Li key={user.user_id} li_style={""}>
              {" "}
              {/* 스타일을 지정할 수 있는 Li 컴포넌트 */}
              {user.username} ({user.email})
            </Li>
          ))}
        </Ul>
      )}
    </div>
  );
};

export default FollowingListPage;
