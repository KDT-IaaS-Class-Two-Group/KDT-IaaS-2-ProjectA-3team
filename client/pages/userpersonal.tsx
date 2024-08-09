import React, { useEffect, useState } from "react";

import UserPersonal, { User } from "client/model/services/userpersonal";
import { greenButton, purpleButton } from "client/styles/templatebutton.css";

const TestPage: React.FC = () => {
  const [status, setStatus] = useState<boolean>(false);

  const handleSave = async (users: User[]) => {
    try {
      const response = await fetch(
        "http://localhost:3001/getUser/userpersonal",
        //"http://localhost:3001/getUser/userprofile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ users }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("사용자 정보 저장 성공");
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
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
    <div>
      <h1>개인 프로필 조회</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {editingUserId === user.user_id ? (
              <div>
                <label>
                  아이디:
                  <input type="text" value={user.user_id} readOnly />
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
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                  />
                </label>
                <label>
                  이메일:
                  <input
                    type="text"
                    value={editFields.email || ""}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
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
                  <button onClick={() => handleUpdateUser(user.user_id)}>
                    저장하기
                  </button>
                  <button onClick={() => handleCancelEdit()}>취소</button>
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
                  {disabledUsers.get(user.user_id) && <span>(비활성화됨)</span>}
                  {!disabledUsers.get(user.user_id) && (
                    <div>
                      <button onClick={() => handleEditClick(user.user_id)}>
                        수정하기
                      </button>
                      <button onClick={() => handleDisableBio(user.user_id)}>
                        비활성화하기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default UserPersonal;
