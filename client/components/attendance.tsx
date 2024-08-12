import React, { useState, useEffect } from "react";
import ClockInOutModal from "./modal/work.Modal";
import { userlist } from "client/styles/sidebar/SidebarStyles.css";
import {
  listinitial,
  listline,
  liststylemainattendance,
} from "client/styles/users/attendancestyle.css";

interface AttendanceRecord {
  user_id: string;
  username: string;
  clockintime: string; // camelCase로 수정
  clockouttime?: string; // camelCase로 수정
}
// clockouttime

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
      <div>
        <ul className={listinitial}>
          {attendanceRecords.map((record, index) => {
            console.log("Record:", record);
            console.log(record.user_id);
            console.log(new Date(record.clockintime).toLocaleString("ko-KR"));
            return (
              <li
                key={`${record.user_id}-${index}`}
                className={liststylemainattendance}
              >
                <p>
                  <strong>이름:</strong> {record.username}
                </p>
                <p>
                  <strong>출근 시간:</strong>{" "}
                  {new Date(record.clockintime).toLocaleString("ko-KR")}
                </p>
                <p className={listline}>
                  <strong>퇴근 시간:</strong>{" "}
                  {record.clockouttime
                    ? new Date(record.clockouttime).toLocaleString("ko-KR")
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
