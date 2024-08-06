import React, { useState, useEffect } from "react";

interface User {
  user_id: string;
  username: string;
}

function UserSelection() {
  const [teamName, setTeamName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<User | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [teamDescription, setTeamDescription] = useState<string>("");

  useEffect(() => {
    const fetchLeadersAndMembers = async () => {
      try {
        const [leadersResponse, membersResponse] = await Promise.all([
          fetch("http://localhost:3001/getUser/leaders"),
          fetch("http://localhost:3001/getUser/members"),
        ]);

        const leaders = await leadersResponse.json();
        const members = await membersResponse.json();

        setUsers([...leaders, ...members]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchLeadersAndMembers();
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

  const fetchTeam = () => {
    const teamData = {
      teamName,
      teamLeader: selectedLeader,
      teamMembers: selectedMembers,
      teamDescription,
    };

    fetch("/team/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Team data saved:", data);
      })
      .catch((error) => console.error("Error saving team data:", error));
  };

  return (
    <div>
      <div>
        <label htmlFor="teamName">팀 이름:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <div>팀장: {selectedLeader ? selectedLeader.username : "없음"}</div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <strong>이름:</strong> {user.user_id}
              <button onClick={() => addLeader(user)}>추가</button>
              {selectedLeader && selectedLeader.user_id === user.user_id && (
                <button onClick={removeLeader}>삭제</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        팀원:{" "}
        {selectedMembers.map((member) => member.user_id).join(", ") || "없음"}
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              {user.username}
              <button onClick={() => addMember(user)}>추가</button>
              {selectedMembers.some(
                (member) => member.user_id === user.user_id
              ) && <button onClick={() => removeMember(user)}>삭제</button>}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label htmlFor="teamDescription">팀 특징 서술:</label>
        <textarea
          id="teamDescription"
          name="teamDescription"
          value={teamDescription}
          onChange={(e) => setTeamDescription(e.target.value)}
        />
      </div>
      <button onClick={fetchTeam}>전송</button>
    </div>
  );
}

export default UserSelection;
