import React, { useState } from "react";
import Modal from "./modal";

interface ClockInOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string; // ClockInOutModal에서 사용하기 위해 userId 추가
}

const ClockInOutModal: React.FC<ClockInOutModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [status, setStatus] = useState("");

  const handleClockIn = async () => {
    try {
      const response = await fetch("http://localhost:3001/getUser/clockin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // userId를 서버로 전송
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Clock in successful:", result);
        setStatus("출근 처리되었습니다.");
      } else {
        console.error("Clock in failed:", response.statusText);
      }
    } catch (error) {
      console.error("Clock in error:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await fetch("http://localhost:3001/getUser/clockout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setStatus("퇴근 처리되었습니다.");
      } else {
        setStatus("퇴근 처리에 실패했습니다.");
      }
    } catch (error) {
      setStatus("퇴근 처리에 실패했습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>출근/퇴근 관리</h2>
      <button onClick={handleClockIn}>출근</button>
      <button onClick={handleClockOut}>퇴근</button>
      {status && <p>{status}</p>}
    </Modal>
  );
};

export default ClockInOutModal;
