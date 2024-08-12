import React, { useEffect, useState } from "react";
import * as styles from "../../styles/userpersonal/userpersonal.css";

export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

interface Profile {
  user_id: string;
  bio: string;
}

interface UserPersonalProps {
  onSave?: (users: User[]) => Promise<void>; // onSave를 선택적으로 받도록 수정
}

const UserPersonal: React.FC<UserPersonalProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Map<string, string>>(new Map());
  const [bios, setBios] = useState<Map<string, string>>(new Map());
  const [disabledUsers, setDisabledUsers] = useState<Map<string, boolean>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [userResponse, profileResponse] = await Promise.all([
          fetch("http://localhost:3001/getUser/userpersonal", {
            credentials: "include",
          }),
          fetch("http://localhost:3001/getUser/userprofile", {
            credentials: "include",
          }),
        ]);

        if (!userResponse.ok || !profileResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const usersData: User[] = await userResponse.json();
        const profilesData: Profile[] = await profileResponse.json();

        if (Array.isArray(usersData) && Array.isArray(profilesData)) {
          setUsers(usersData);
          const profileMap = new Map<string, string>(
            profilesData.map((profile) => [profile.user_id, profile.bio])
          );
          setProfiles(profileMap);

          const biosMap = new Map<string, string>(
            usersData.map((user) => [
              user.user_id,
              profileMap.get(user.user_id) || "",
            ])
          );
          setBios(biosMap);

          const disabledMap = new Map<string, boolean>(
            usersData.map((user) => [user.user_id, false])
          );
          setDisabledUsers(disabledMap);
        } else {
          console.error("Unexpected response format:", usersData, profilesData);
        }
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

  const handleFieldChange = (field: keyof User, value: string) => {
    setEditFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  const handleSave = async () => {
    if (onSave) {
      try {
        await onSave(users);
        console.log("사용자 정보 저장 성공");
      } catch (error) {
        console.error("사용자 정보 저장 실패:", error);
      }
    } else {
      console.log("onSave 함수가 제공되지 않았습니다.");
    }
  };

  const handleDisableBio = (userId: string) => {
    setDisabledUsers((prevDisabled) => new Map(prevDisabled).set(userId, true));
    alert("비활성화되었습니다.");
  };

  const handleEditClick = (userId: string) => {
    setEditingUserId(userId);
    const user = users.find((user) => user.user_id === userId);
    if (user) {
      setEditFields({
        username: user.username,
        birth_date: user.birth_date,
        address: user.address,
        phone: user.phone,
        email: user.email,
        password: user.password,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditFields({});
  };

  const handleUpdateUser = async (userId: string) => {
    try {
      const updateuser = {
        user_id: userId,
        ...editFields,
      };

      await fetch("http://localhost:3001/getUser/insertuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateuser),
      });

      console.log("사용자 정보 입력 성공");
      handleCancelEdit();
    } catch (error) {
      console.error("사용자 정보 입력 실패:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.maincontainter}>
      <div className={styles.secondcontainer}>
        <h1>개인 프로필 조회</h1>
        <ul>
          {users.map((user) => (
            <li key={user.user_id} className={styles.listyle}>
              {editingUserId === user.user_id ? (
                <div className={styles.divstyle}>
                  <label>
                    아이디:
                    <input
                      type="text"
                      value={user.user_id}
                      readOnly
                      className={styles.input}
                    />
                  </label>
                  <label>
                    이름:
                    <input
                      type="text"
                      value={editFields.username || ""}
                      onChange={(e) =>
                        handleFieldChange("username", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    생년월일:
                    <input
                      type="text"
                      value={editFields.birth_date || ""}
                      onChange={(e) =>
                        handleFieldChange("birth_date", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    주소:
                    <input
                      type="text"
                      value={editFields.address || ""}
                      onChange={(e) =>
                        handleFieldChange("address", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    핸드폰 번호:
                    <input
                      type="text"
                      value={editFields.phone || ""}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    이메일:
                    <input
                      type="text"
                      value={editFields.email || ""}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    비밀번호:
                    <input
                      type="password"
                      value={editFields.password || ""}
                      onChange={(e) =>
                        handleFieldChange("password", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    자기소개:
                    <input
                      type="text"
                      value={bios.get(user.user_id) || ""}
                      onChange={(e) =>
                        handleBioChange(user.user_id, e.target.value)
                      }
                    />
                  </label>
                  <div>
                    <button
                      onClick={() => handleUpdateUser(user.user_id)}
                      className={styles.blueButton}
                    >
                      save
                    </button>
                    <button
                      onClick={() => handleCancelEdit()}
                      className={styles.yellowButton}
                    >
                      cancle
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <strong>아이디 : </strong> {user.user_id}
                  <strong>이름 : </strong> {user.username}
                  <strong>생년월일 : </strong> {user.birth_date}
                  <strong>주소 : </strong> {user.address}
                  <strong>핸드폰 번호 : </strong> {user.phone}
                  <strong>이메일 : </strong> {user.email}
                  <strong>비밀번호 : </strong> {user.password}
                  <div>
                    <strong>자기소개 : </strong>
                    <span>
                      {profiles?.get(user.user_id) || bios.get(user.user_id)}
                    </span>
                    {disabledUsers.get(user.user_id) && (
                      <span>(비활성화됨)</span>
                    )}
                    {!disabledUsers.get(user.user_id) && (
                      <div>
                        <button
                          onClick={() => handleEditClick(user.user_id)}
                          className={styles.yellowButton}
                        >
                          edit
                        </button>
                        <button
                          onClick={() => handleDisableBio(user.user_id)}
                          className={styles.greenButton}
                        >
                          secret
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button onClick={handleSave} className={styles.blueButton}>
          save
        </button>
      </div>
    </div>
  );
};

export default UserPersonal;
