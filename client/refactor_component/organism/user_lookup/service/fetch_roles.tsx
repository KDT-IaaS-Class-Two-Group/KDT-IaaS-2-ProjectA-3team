// role 데이터를 불러오는 함수 (React에서 사용)
export const fetchRoles = async () => {
  try {
    const response = await fetch("http://localhost:3001/user/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response status:", response.status); // 상태 코드 출력
    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }
    const data = await response.json();
    console.log("Fetched roles:", data); // 응답 데이터 출력
    return data.map((role: { role_name: string }) => ({
      value: role.role_name,
      label: role.role_name,
    }));
  } catch (error) {
    console.error("Failed to fetch roles:", error);
    return [];
  }
};
