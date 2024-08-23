import React, { useState, useEffect } from "react";
import * as styles from "../../styles/team/team.css";
import * as button from "../../styles/templatebutton.css";
import {
  pageinput,
  pagemaincontainer,
  pagemainmain,
  pagemaintext,
  pageteamtext,
  pagetextarea,
  pagetextsub,
  pageul,
  teambuttoncontainer,
} from "client/styles/team/teampage.css";
import Button from "client/refactor_component/atom/button/button";
import fetchCheckTeamNameExists from "./service/checkTeamNameExist/fetchCheckTeamNameExists";
import fetchLeadersAndMembers from "./service/leaderAndMembers/fetchLeadersAndMembers";
import fetchSaveTeamData from "./service/saveTeamData/fetchSaveTeamData";
import { User } from "./interface/team.interface";

function UserSelection() {
  const [teamName, setTeamName] = useState<string>("");
  const [leaders, setLeaders] = useState<User[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<User | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [teamDescription, setTeamDescription] = useState<string>("");

  useEffect(() => {
    const initializeUsers = async () => {
      const { leadersData, membersData } = await fetchLeadersAndMembers();
      setLeaders(leadersData);
      setMembers(membersData);
    };

    initializeUsers();
  }, []);

  const addLeader = (user: User) => {
    setSelectedLeader(user);
  };

  const removeLeader = () => {
    setSelectedLeader(null);
  };

  const addMember = (user: User) => {
    if (!selectedMembers.some((member) => member.user_id === user.user_id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  const removeMember = (user: User) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.user_id !== user.user_id)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName) {
      alert("팀 이름을 입력해 주세요.");
      return;
    }

    const nameExists = await fetchCheckTeamNameExists(teamName);
    if (nameExists) {
      alert("이미 존재하는 팀 이름입니다. 다른 팀 이름을 입력해 주세요.");
      return;
    }

    if (!selectedLeader) {
      alert("팀장을 선택해 주세요.");
      return;
    }
    if (selectedMembers.length === 0) {
      alert("팀원을 선택해 주세요.");
      return;
    }

    const teamData = {
      team_name: teamName,
      description: teamDescription,
      teamLeader: selectedLeader ? { user_id: selectedLeader.user_id } : null,
      teamMembers: selectedMembers.map((member) => ({
        user_id: member.user_id,
      })),
    };

    try {
      const result = await fetchSaveTeamData(teamData);

      if (result.error) {
        alert(result.error);
      } else {
        alert(result.message || "팀 정보 저장 성공");
        resetForm();
      }
    } catch (error) {
      alert("오류 발생");
    }
  };

  const resetForm = () => {
    setTeamName("");
    setTeamDescription("");
    setSelectedLeader(null);
    setSelectedMembers([]);
  };

  return (
    <div className={pagemainmain}>
      <div className={pagemaincontainer}>
        <div className={pagemaintext}>팀 제작</div>
        <div className={pageinput}>
          <label htmlFor="teamName">팀 이름:</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <div className={pageteamtext}>
          <p> 팀장: {selectedLeader ? selectedLeader.user_id : "없음"}</p>

          <ul className={pageul}>
            {leaders.map((user) => (
              <li key={user.user_id} className={pagetextsub}>
                <strong>ID :</strong> {user.user_id}
                <Button
                  button_text="추가"
                  button_style={styles.yellowButton}
                  onClick={() => addLeader(user)}
                />
                {selectedLeader && selectedLeader.user_id === user.user_id && (
                  <Button
                    button_text="삭제"
                    button_style={styles.yellowButton}
                    onClick={removeLeader}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={pageteamtext}>
          <p>
            팀원:{" "}
            {selectedMembers.map((member) => member.user_id).join(", ") ||
              "없음"}
          </p>

          <div className={pageul}>
            {members.map((user) => (
              <div key={user.user_id} className={pagetextsub}>
                <strong>ID :</strong> {user.user_id}
                <Button
                  button_text="추가"
                  button_style={styles.yellowButton}
                  onClick={() => addMember(user)}
                />
                {selectedMembers.some(
                  (member) => member.user_id === user.user_id
                ) && (
                  <Button
                    button_text="삭제"
                    button_style={styles.yellowButton}
                    onClick={() => removeMember(user)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={pagetextsub}>
          <label htmlFor="teamDescription" className={pageteamtext}>
            팀 특징 서술:
          </label>
          <textarea
            id="teamDescription"
            name="teamDescription"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            className={pagetextarea}
          />
        </div>
        <div className={teambuttoncontainer}>
          <Button
            button_text="팀 생성"
            button_style={styles.blueButton}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default UserSelection;
