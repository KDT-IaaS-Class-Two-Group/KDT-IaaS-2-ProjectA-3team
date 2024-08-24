/**
 * @file UserPersonal.tsx
 * @brief 이 파일은 사용자 개인 정보를 조회하고 수정할 수 있는 컴포넌트를 포함하고 있습니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

import React, { useEffect, useState } from "react";
import * as styles from "../../../styles/userpersonal/userpersonal.css";
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
import { handleEditClick } from "../../organism/Profile_user/hook/handleEditClick";
import { handleUpdateUser } from "../../organism/Profile_user/service/handleUpdateUser";
import { handleDisableBio } from "../../organism/Profile_user/hook/handleDisableBio";
import { handleFieldChange } from "../../organism/Profile_user/hook/handleFieldChange";
import { handleBioChange } from "../../organism/Profile_user/hook/handleBioChange";
import { handleCancelEdit } from "../../organism/Profile_user/hook/handleCancelEdit";
import { handleSave } from "../../organism/Profile_user/utils/handleSave";
import {
  User,
  Profile,
  UserPersonalProps,
} from "../../organism/Profile_user/interface/usertypes";
import { fetchUsers } from "../../organism/Profile_user/service/fetchUsers";

import FormField from "../../molecule/form_field/form_field";
import Button from "../../atom/button/button";

/**
 * @brief 사용자 개인 정보를 조회하고 수정할 수 있는 컴포넌트입니다.
 *
 * 이 컴포넌트는 사용자 목록을 표시하며, 사용자의 정보를 수정할 수 있는 폼을 제공합니다.
 * 사용자는 자신의 프로필을 조회하고, 자기소개를 비활성화하거나 개인 정보를 수정할 수 있습니다.
 *
 * @param {UserPersonalProps} props - 컴포넌트의 props로 `onSave` 콜백 함수를 포함합니다.
 * @returns React.FC 이 컴포넌트는 React 함수형 컴포넌트입니다.
 */
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
    /**
     * @brief 사용자 데이터를 비동기적으로 불러오는 함수입니다.
     *
     * `fetchUsers`를 호출하여 사용자 데이터, 프로필, 자기소개, 비활성화 상태를 불러오고 상태에 저장합니다.
     */
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
                    placeholder={""}
                  />
                  <FormField
                    id="user_id"
                    label="아이디 :"
                    value={user.user_id}
                    input_type="text"
                    onChange={() => {}} // 읽기 전용 입력, 변경 핸들러 필요 없음
                    placeholder={""}
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
                    placeholder={""}
                  />
                  <FormField
                    id="email"
                    label="이메일 :"
                    value={editFields.email || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleFieldChange("email", e.target.value, setEditFields)
                    }
                    placeholder={""}
                  />
                  <FormField
                    id="phone"
                    label="핸드폰 번호 :"
                    value={editFields.phone || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleFieldChange("phone", e.target.value, setEditFields)
                    }
                    placeholder={""}
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
                    placeholder={""}
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
                    placeholder={""}
                  />
                  <FormField
                    id="bio"
                    label="자기소개 :"
                    value={bios.get(user.user_id) || ""}
                    input_type="text"
                    onChange={(e) =>
                      handleBioChange(user.user_id, e.target.value, setBios)
                    }
                    placeholder={""}
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
