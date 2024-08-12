import React, { useState, useEffect } from "react";
import ClockInOutModal from "./modal/work.Modal";
import { userlist } from "client/styles/sidebar/SidebarStyles.css";

interface AttendanceRecord {
  user_id: string;
  username: string;
  clockInTime: string;
  clockOutTime?: string;
}

const Attendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    // 랜덤 3명의 출퇴근 데이터를 가져오기
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/getUser/attendance/random",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 쿠키가 필요할 경우 포함
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAttendanceRecords(data);
        } else {
          console.error("Failed to fetch attendance records");
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
      <div>
        <ul className={userlist}>
          {attendanceRecords.map((record) => (
            <li key={record.user_id}>
              <p>{record.username}</p>
              <p>출근: {new Date(record.clockInTime).toLocaleString()}</p>
              <p>
                퇴근:{" "}
                {record.clockOutTime
                  ? new Date(record.clockOutTime).toLocaleString()
                  : "퇴근 기록 없음"}
              </p>
            </li>
          ))}
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
