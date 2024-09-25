import {
  centeredflexrowcontainer,
  flexrowcontainer,
} from "client/styles/standardcontainer.css";
import {
  cholbtn,
  choltwediv,
  purpleButton,
  twebtn,
  yellowButton,
} from "client/styles/templatebutton.css";
import { buttonparent } from "client/styles/users/attendancestyle.css";
import React, { useState } from "react";

interface ClockInButtonProps {
  userId: string;
}

const ClockInButton: React.FC<ClockInButtonProps> = ({ userId }) => {
  const [status, setStatus] = useState("");

  const handleClockIn = async () => {
    try {
      const response = await fetch("http://localhost:3001/attendance/clockin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Clock in successful:", result);
        setStatus("출근 처리되었습니다.");
      } else {
        console.error("Clock in failed:", response.statusText);
        setStatus("출근 처리에 실패했습니다.");
      }
    } catch (error) {
      console.error("Clock in error:", error);
      setStatus("출근 처리에 실패했습니다.");
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await fetch("http://localhost:3001/attendance/clockout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        console.log("Clock out successful");
        setStatus("퇴근 처리되었습니다.");
      } else {
        console.error("Clock out failed:", response.statusText);
        setStatus("퇴근 처리에 실패했습니다.");
      }
    } catch (error) {
      console.error("Clock out error:", error);
      setStatus("퇴근 처리에 실패했습니다.");
    }
  };

  return (
    <>
      <div className={choltwediv}>
        <button onClick={handleClockIn} className={cholbtn}>
          출근
        </button>
        <button onClick={handleClockOut} className={twebtn}>
          퇴근
        </button>
      </div>
      {status && <p className={centeredflexrowcontainer}>{status}</p>}
    </>
  );
};

export default ClockInButton;
