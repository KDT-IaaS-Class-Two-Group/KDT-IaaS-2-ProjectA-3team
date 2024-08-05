import { useEffect, useState } from "react";

// 사용자 데이터 타입 정의
export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

// 프로필 데이터 타입 정의
interface Profile {
  user_id: string; // 외래 키
  bio: string; // 자기소개
}

interface UserPersonalProps {
  onSave: (users: User[]) => Promise<void>;
}

const UserPersonal: React.FC<UserPersonalProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Map<string, string>>(); // user_id와 bio를 매핑한 Map
  const [bios, setBios] = useState<Map<string, string>>(new Map()); // 사용자별 자기소개 입력 상태 초기화
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [userResponse, profileResponse] = await Promise.all([
          fetch("http://localhost:3001/getUser/userpersonal"),
          fetch("http://localhost:3001/getUser/userprofile"),
        ]);

        if (!userResponse.ok || !profileResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const usersData: User[] = await userResponse.json();
        const profilesData: Profile[] = await profileResponse.json();

        setUsers(usersData);

        // 프로필 데이터를 user_id를 키로 하는 Map으로 변환
        const profileMap = new Map<string, string>(
          profilesData.map((profile) => [profile.user_id, profile.bio]),
        );
        setProfiles(profileMap);

        // 사용자별 자기소개 입력 상태 초기화
        const biosMap = new Map<string, string>(
          usersData.map((user) => [
            user.user_id,
            profileMap.get(user.user_id) || "",
          ]),
        );
        setBios(biosMap);
      } catch (error) {
        console.error("사용자 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBioChange = (userId: string, value: string) => {
    setBios((prevBios) => new Map(prevBios).set(userId, value));
  };

  const handleSave = async () => {
    try {
      await Promise.all(
        Array.from(bios.entries()).map(([userId, bio]) =>
          fetch("http://localhost:3001/getUser/saveProfile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, bio: bio || "" }),
          }),
        ),
      );
      console.log("프로필 정보 저장 성공");
    } catch (error) {
      console.error("프로필 정보 저장 실패:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>개인 프로필 조회</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <strong>아이디 : </strong> {user.user_id}
            <strong>이름 : </strong> {user.username}
            <strong>생년월일 : </strong> {user.birth_date}
            <strong>주소 : </strong> {user.address}
            <strong>핸드폰 번호 : </strong> {user.phone}
            <strong>이메일 : </strong> {user.email}
            <strong>비밀번호 : </strong> {user.password}
            <div>
              <strong>자기소개 : </strong>
              {profiles?.has(user.user_id) ? (
                <span>{profiles.get(user.user_id)}</span>
              ) : (
                <input
                  type="text"
                  value={bios.get(user.user_id) || ""} // bios.get(user.user_id)이 undefined일 경우 빈 문자열로 대체
                  onChange={(e) =>
                    handleBioChange(user.user_id, e.target.value)
                  }
                  placeholder="자기소개를 입력하세요"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default UserPersonal;
