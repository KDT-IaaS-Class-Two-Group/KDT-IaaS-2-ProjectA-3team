import React, { useEffect, useState } from "react";
import * as styles from "../../styles/userpersonal/userpersonal.css";
import { mainpagecontainer } from "client/styles/admin/admindashboard.css";
import { pagemainmain, pagemaintext } from "client/styles/team/teampage.css";
import {
  buttonparent,
  listinitial,
  profilelistpadding,
} from "client/styles/users/attendancestyle.css";
import { flexcolcontainer } from "client/styles/standardcontainer.css";
import { blueButton, yellowButton } from "client/styles/templatebutton.css";
// 모듈
import { handleEditClick } from "./userpersonalmodule/handleEditClick";
import { handleUpdateUser } from "./userpersonalmodule/handleUpdateUser";
import { handleDisableBio } from "./userpersonalmodule/handleDisableBio";
import { handleFieldChange } from "./userpersonalmodule/handleFieldChange";
import { handleBioChange } from "./userpersonalmodule/handleBioChange";
import { handleCancelEdit } from "./userpersonalmodule/handleCancelEdit";
import { handleSave } from "./userpersonalmodule/handleSave";
import { User, Profile, UserPersonalProps } from "./userpersonalmodule/usertypes"; 
import { fetchUsers } from "./userpersonalmodule/fetchUsers";



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
    fetchUsers(setUsers, setProfiles, setBios, setDisabledUsers, setLoading);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className={pagemainmain}>
        <div className={pagemaintext}>개인 프로필 조회</div>
        <ul className={listinitial}>
          {users.map((user) => (
            <li key={user.user_id} className={listinitial}>
              {editingUserId === user.user_id ? (
                <div className={flexcolcontainer}>
                  <label className={profilelistpadding}>
                    이름 :
                    <input
                      type="text"
                      value={editFields.username || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "username",
                          e.target.value,
                          setEditFields
                        )
                      }
                    />
                  </label>
                  <label className={profilelistpadding}>
                    아이디 :
                    <input
                      type="text"
                      value={user.user_id}
                      readOnly
                      className={styles.input}
                    />
                  </label>
                  <label className={profilelistpadding}>
                    비밀번호 :
                    <input
                      type="password"
                      value={editFields.password || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "password",
                          e.target.value,
                          setEditFields
                        )
                      }
                    />
                  </label>
                  <label className={profilelistpadding}>
                    이메일 :
                    <input
                      type="text"
                      value={editFields.email || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "email",
                          e.target.value,
                          setEditFields
                        )
                      }
                    />
                  </label>
                  <label className={profilelistpadding}>
                    핸드폰 번호 :
                    <input
                      type="text"
                      value={editFields.phone || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "phone",
                          e.target.value,
                          setEditFields
                        )
                      }
                    />
                  </label>
                  <label className={profilelistpadding}>
                    생년월일 :
                    <input
                      type="text"
                      value={editFields.birth_date || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "birth_date",
                          e.target.value,
                          setEditFields
                        )
                      }
                    />
                  </label>
                  <label className={profilelistpadding}>
                    주소 :
                    <input
                      type="text"
                      value={editFields.address || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "address",
                          e.target.value,
                          setEditFields
                        )
                      }
                    />
                  </label>
                  <label className={profilelistpadding}>
                    자기소개 :
                    <input
                      type="text"
                      value={bios.get(user.user_id) || ""}
                      onChange={(e) =>
                        handleBioChange(user.user_id, e.target.value, setBios)
                      }
                    />
                  </label>
                  <div className={buttonparent}>
                    <button
                      onClick={() =>
                        handleCancelEdit(setEditingUserId, setEditFields)
                      }
                      className={yellowButton}
                    >
                      수정 취소
                    </button>
                    <button
                      key={user.user_id}
                      onClick={() =>
                        handleUpdateUser(user.user_id, editFields, () =>
                          handleCancelEdit(setEditingUserId, setEditFields)
                        )
                      }
                      className={blueButton}
                    >
                      수정 요청 전송
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={profilelistpadding}>
                    이름 :{user.username}
                  </div>
                  <div className={profilelistpadding}>
                    아이디 :{user.user_id}
                  </div>
                  <div className={profilelistpadding}>
                    비밀번호 :{user.password}
                  </div>
                  <div className={profilelistpadding}>이메일 :{user.email}</div>
                  <div className={profilelistpadding}>
                    핸드폰 번호 :{user.phone}
                  </div>
                  <div className={profilelistpadding}>
                    생년월일 :{user.birth_date}
                  </div>
                  <div className={profilelistpadding}>주소 :{user.address}</div>
                  <div>
                    <div className={profilelistpadding}>
                      자기소개 :
                      <span>
                        {profiles?.get(user.user_id) || bios.get(user.user_id)}
                      </span>
                    </div>

                    {disabledUsers.get(user.user_id) && (
                      <span>(비활성화됨)</span>
                    )}
                    {!disabledUsers.get(user.user_id) && (
                      <>
                        <div className={buttonparent}>
                          <button
                            onClick={() =>
                              handleDisableBio(user.user_id, setDisabledUsers)
                            }
                            className={styles.greenButton}
                          >
                            자기소개 비활성화
                          </button>
                          <button
                            onClick={() =>
                              handleEditClick(
                                user.user_id,
                                users,
                                setEditingUserId,
                                setEditFields
                              )
                            }
                            className={styles.yellowButton}
                          >
                            개인 정보 수정
                          </button>
                        </div>
                        <div></div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* <div className={buttonparent}>
     <button
                    onClick={() =>
                      handleUpdateUser(
                        user.user_id,
                        editFields,
                        () => handleCancelEdit(setEditingUserId, setEditFields)
                      )
                    }
                    className={blueButton}
                  >
                    수정 요청 전송
                  </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserPersonal;
