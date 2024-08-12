import React, { useState, useEffect } from "react";
import ClockInOutModal from "./modal/work.Modal";

interface AttendanceRecord {
  user_id: string;
  username: string;
  clockInTime: string; // camelCase로 수정
  clockOutTime?: string; // camelCase로 수정
}

const Attendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    console.log("현재 시간:", now.toLocaleString("ko-KR"));

    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/getUser/attendance/random",
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
          console.log("Fetched data:", data); // 데이터 확인
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

  const handleOpenModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <h2>출퇴근 기록</h2>
      <div>
        <ul>
          {attendanceRecords.map((record, index) => {
            console.log("Record:", record);
            console.log(record.user_id);
            console.log(new Date(record.clockInTime).toLocaleString("ko-KR"));
            return (
              <li key={`${record.user_id}-${index}`}>
                <p>
                  <strong>이름:</strong> {record.username}
                </p>
                <p>
                  <strong>출근 시간:</strong>{" "}
                  {new Date(record.clockInTime).toLocaleString("ko-KR")}
                </p>
                <p>
                  <strong>퇴근 시간:</strong>{" "}
                  {record.clockOutTime
                    ? new Date(record.clockOutTime).toLocaleString("ko-KR")
                    : "퇴근 기록 없음"}
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
