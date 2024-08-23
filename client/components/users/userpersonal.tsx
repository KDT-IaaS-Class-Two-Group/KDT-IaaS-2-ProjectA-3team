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

import FormField from "../../refactor_component/molecule/form_field/form_field";
import Button from "../../refactor_component/atom/button/button";

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
                  <FormField
                    id="username"
                    label="이름 :"
                    value={editFields.username || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleFieldChange(
                        "username",
                        e.target.value,
                        setEditFields
                      )
                    }
                  />
                  <FormField
                    id="user_id"
                    label="아이디 :"
                    value={user.user_id}
                    input_type="text"
                    onChange={() => {}} // readOnly input, no change handler needed
                  />
                  <FormField
                    id="password"
                    label="비밀번호 :"
                    value={editFields.password || ""}
                    input_type="password"
                    onChange={(e) =>
                      handleFieldChange(
                        "password",
                        e.target.value,
                        setEditFields
                      )
                    }
                  />
                  <FormField
                    id="email"
                    label="이메일 :"
                    value={editFields.email || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleFieldChange(
                        "email",
                        e.target.value,
                        setEditFields
                      )
                    }
                  />
                  <FormField
                    id="phone"
                    label="핸드폰 번호 :"
                    value={editFields.phone || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleFieldChange(
                        "phone",
                        e.target.value,
                        setEditFields
                      )
                    }
                  />
                  <FormField
                    id="birth_date"
                    label="생년월일 :"
                    value={editFields.birth_date || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleFieldChange(
                        "birth_date",
                        e.target.value,
                        setEditFields
                      )
                    }
                  />
                  <FormField
                    id="address"
                    label="주소 :"
                    value={editFields.address || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleFieldChange(
                        "address",
                        e.target.value,
                        setEditFields
                      )
                    }
                  />
                  <FormField
                    id="bio"
                    label="자기소개 :"
                    value={bios.get(user.user_id) || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleBioChange(user.user_id, e.target.value, setBios)
                    }
                  />
                  <div className={buttonparent}>
                    <Button
                      button_text="수정 취소"
                      button_style={yellowButton}
                      onClick={() =>
                        handleCancelEdit(setEditingUserId, setEditFields)
                      }
                    />
                    <Button
                      key={user.user_id}
                      button_text="수정 요청 전송"
                      button_style={blueButton}
                      onClick={() =>
                        handleUpdateUser(user.user_id, editFields, () =>
                          handleCancelEdit(setEditingUserId, setEditFields)
                        )
                      }
                    />
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
                          <Button
                            button_text="자기소개 비활성화"
                            button_style={styles.greenButton}
                            onClick={() =>
                              handleDisableBio(user.user_id, setDisabledUsers)
                            }
                          />
                          <Button
                            button_text="개인 정보 수정"
                            button_style={styles.yellowButton}
                            onClick={() =>
                              handleEditClick(
                                user.user_id,
                                users,
                                setEditingUserId,
                                setEditFields
                              )
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPersonal;
