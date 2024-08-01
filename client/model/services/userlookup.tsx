import { useEffect } from "react";

// fetch -> services 디렉토리
// form -> component 디렉토리
// 로드 -> pages 디렉토리
const UserLookup = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("사용자 조회 및 권한 부여");
      const response = await fetch("http://localhost:3001/getUser/all");
      const resJson = await response.json();
      console.log(resJson);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h1>사용자 조회</h1>
    </div>
  );
};

export default UserLookup;
