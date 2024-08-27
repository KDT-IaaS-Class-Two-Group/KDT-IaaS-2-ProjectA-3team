import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

// 서버에서 세션 데이터를 가져오는 비동기 함수입니다.
const fetchSessionData = async () => {
  try {
    // GET 요청을 통해 세션 데이터를 가져옵니다.
    const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터를 주고받기 위한 헤더 설정
      },
      credentials: "include", // 세션 쿠키를 포함하여 요청합니다.
    });

    // 응답이 성공적이면 세션 데이터를 JSON 형식으로 파싱합니다.
    if (response.ok) {
      const data = await response.json();
      return data.session; // 세션 정보를 반환합니다.
    } else {
      // 응답이 실패한 경우 콘솔에 에러 메시지를 출력합니다.
      console.error("Failed to fetch session data", response.statusText);
      return null; // 에러 발생 시 null을 반환합니다.
    }
  } catch (error) {
    // 요청 도중 에러가 발생하면 콘솔에 에러를 출력합니다.
    console.error("Error fetching session data", error);
    return null; // 에러 발생 시 null을 반환합니다.
  }
};
export default fetchSessionData;
