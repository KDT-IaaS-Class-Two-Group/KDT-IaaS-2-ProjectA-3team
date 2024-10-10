/**
 * @file team_submit_handle.tsx
 * @brief 팀 생성 폼 제출 처리 함수
 * @details 팀 이름, 팀장, 팀원, 팀 설명을 서버로 전송하는 API 요청을 처리한다.
 */

const submitHanlde = async ({
  teamName,
  selectedLeader,
  selectedMembers,
  teamDescription,
  resetForm,
}: {
  teamName: string;
  selectedLeader: { user_id: string } | null;
  selectedMembers: { user_id: string }[];
  teamDescription: string;
  resetForm: () => void;
}) => {
  try {
    // 팀 데이터를 서버로 전송
    const response = await fetch("http://localhost:3001/user/saveTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_name: teamName,
        description: teamDescription,
        teamLeader: selectedLeader ? { user_id: selectedLeader.user_id } : null, // 객체로 전달
        teamMembers: selectedMembers.map((member) => ({
          user_id: member.user_id,
        })), // 객체로 전달
      }),
    });

    if (!response.ok) {
      throw new Error("팀 생성 실패");
    }

    const result = await response.json();
    console.log("서버 응답:", result);

    // 폼 초기화
    resetForm();
    alert("팀이 성공적으로 생성되었습니다!");
  } catch (error) {
    console.error("팀 생성 중 오류 발생:", error);
    alert("팀 생성에 실패했습니다.");
  }
};

export default submitHanlde;
