/**
 * @file handleFollow.ts
 * @brief 사용자 팔로우 및 언팔로우 처리 함수
 * @details 사용자가 다른 사용자를 팔로우하거나 언팔로우할 때 호출되는 함수로, 서버와 통신하여 해당 작업을 수행합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

/**
 * @brief 팔로우/언팔로우 처리 함수
 * @details 주어진 사용자 ID와 현재 세션 정보를 바탕으로 팔로우 또는 언팔로우 요청을 서버로 보냅니다.
 * 사용자가 팔로우 상태를 변경하려 할 때 확인 메시지를 표시하며, 요청이 성공하면 목록을 갱신합니다.
 *
 * @param {string} userId 팔로우/언팔로우 대상 사용자의 ID
 * @param {boolean} isFollowing 현재 팔로우 상태 (true: 팔로우 중, false: 팔로우 아님)
 * @param {Object} sessionData 현재 세션 데이터 (사용자 ID를 포함)
 * @param {function} handleSearch 팔로우/언팔로우 후 호출되는 목록 갱신 함수
 *
 * @return {Promise<void>} 서버 요청의 성공 여부에 따라 목록을 갱신하거나 오류 메시지를 출력합니다.
 */
export const handleFollow = async (
  userId: string,
  isFollowing: boolean,
  sessionData: { user_id: string } | null,
  handleSearch: () => void
): Promise<void> => {
  if (!sessionData) {
    console.error("Session data is not available");
    return;
  }

  const action = isFollowing ? "unfollow" : "follow";
  const confirmMessage = isFollowing
    ? "팔로우를 취소하시겠습니까?"
    : "팔로우 하시겠습니까?";

  if (!window.confirm(confirmMessage)) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:3001/getUser/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        followerId: sessionData.user_id, // 현재 사용자 ID
        followingId: userId,
      }),
    });

    if (response.ok) {
      // 팔로우/언팔로우 후 목록을 다시 로드합니다.
      handleSearch();
    } else {
      console.error(`Failed to ${action} user`);
    }
  } catch (error) {
    console.error(`Error occurred while trying to ${action} user`, error);
  }
};
