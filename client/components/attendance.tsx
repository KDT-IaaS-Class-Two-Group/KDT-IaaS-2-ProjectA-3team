import React, { useState, useEffect } from "react";
import {
  listinitial,
  listline,
  liststylemainattendance,
} from "client/styles/users/attendancestyle.css";
import ClockInOutModal from "./modal/work.Modal";

interface AttendanceRecord {
  user_id: string;
  username: string;
  clockInTime: string; // 대문자 I
  clockOutTime?: string; // 대문자 O
}

const Attendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // 시간 포맷팅 함수
  const formatTime = (timeString: string | undefined): string => {
    if (!timeString) return "퇴근 기록 없음";
    const date = new Date(timeString);
    return isNaN(date.getTime())
      ? "시간 형식 오류"
      : date.toLocaleString("ko-KR");
  };

  useEffect(() => {
    const now = new Date();
    console.log("현재 시간:", now.toLocaleString("ko-KR"));
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/user/attendance/random",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setAttendanceRecords(data);
        } else {
          console.error(
            "Failed to fetch attendance records",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <div>
        <ul className={listinitial}>
          {attendanceRecords.map((record, index) => {
            const clockInTime = formatTime(record.clockInTime); // 필드명 변경
            const clockOutTime = formatTime(record.clockOutTime); // 필드명 변경

            console.log("Record:", record);
            console.log("출근 시간:", clockInTime);
            console.log("퇴근 시간:", clockOutTime);

            return (
              <li
                key={`${record.user_id}-${index}`}
                className={liststylemainattendance}
              >
                <p>
                  <strong>이름:</strong> {record.username}
                </p>
                <p>
                  <strong>출근 시간:</strong> {clockInTime}
                </p>
                <p className={listline}>
                  <strong>퇴근 시간:</strong> {clockOutTime}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      {selectedUserId && (
        <ClockInOutModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={selectedUserId}
        />
      )}
    </div>
  );
};

export default Attendance;
