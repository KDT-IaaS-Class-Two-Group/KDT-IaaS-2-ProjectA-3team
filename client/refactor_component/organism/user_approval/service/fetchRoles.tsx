// 서비스나 유틸 파일에서 권한 목록을 가져오는 함수
export const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/roles"); // 권한 목록을 가져오는 API 경로
      if (response.ok) {
        return await response.json(); // 권한 목록을 JSON 형태로 반환
      }
      throw new Error("Failed to fetch roles");
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  };
  // services/dataService.ts

// 분야 목록을 가져오는 함수
export const fetchFields = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/fields"); // 분야 목록을 가져오는 API 경로
      if (response.ok) {
        return await response.json(); // 분야 목록을 JSON 형태로 반환
      }
      throw new Error("Failed to fetch fields");
    } catch (error) {
      console.error("Error fetching fields:", error);
      return [];
    }
  };
  