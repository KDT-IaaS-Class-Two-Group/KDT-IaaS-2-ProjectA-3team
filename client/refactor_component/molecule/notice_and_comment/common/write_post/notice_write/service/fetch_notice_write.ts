/**
 * @function send
 * @description
 * 공지사항을 서버에 제출하는 함수입니다. 서버의 `/notice/send` 엔드포인트로 POST 요청을 보내어 제목과 내용을 포함한 공지사항을 저장합니다.
 * 요청이 성공하면 성공 메시지를 콘솔에 출력하고, 실패하면 오류를 콘솔에 출력합니다.
 * 
 * @param {string} state - 공지사항의 제목을 나타내는 문자열
 * @param {string} stateContent - 공지사항의 내용을 나타내는 문자열
 * 
 * @returns {Promise<void>} - 함수는 반환 값이 없으며, Promise를 반환합니다.
 */
const send = (state:string, stateContent:string) => {
  return fetch("http://localhost:3001/notice/send", {
    method: "POST", // POST 요청 메서드 사용
    headers: {
      "Content-Type": "application/json",  // 요청 본문이 JSON 형식임을 명시
    },
    credentials: "include", // 쿠키 및 인증 정보 포함
    body: JSON.stringify({ title: state, content: stateContent }), // 요청 본문에 제목과 내용 포함
  })
    .then((response) =>response.text())
    .then((data) => {
      console.log("Success", data);
    })
    .catch((error) => {
      console.error("Server Data Error", error);
    });
};
export default send;