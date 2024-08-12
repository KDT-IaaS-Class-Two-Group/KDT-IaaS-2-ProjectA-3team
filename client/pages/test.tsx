// pages/attendance.tsx

import { GetServerSideProps } from "next";
import React from "react";

interface AttendanceRecord {
  user_id: string;
  username: string;
  clockInTime: string;
  clockOutTime?: string;
}

interface AttendancePageProps {
  attendanceRecords: AttendanceRecord[];
}

const AttendancePage: React.FC<AttendancePageProps> = ({
  attendanceRecords,
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>출퇴근 기록</h1>
      {attendanceRecords.length === 0 ? (
        <p>출퇴근 기록이 없습니다.</p>
      ) : (
        <ul>
          {attendanceRecords.map((record, index) => (
            <li
              key={`${record.user_id}-${index}`}
              style={{ marginBottom: "20px" }}
            >
              <p>
                <strong>사용자 ID:</strong> {record.user_id}
              </p>
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendancePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await fetch("http://localhost:3001/getUser/attendance/random", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // 쿠키 등 인증 정보가 필요하다면 아래와 같이 설정합니다.
      // credentials: 'include',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch attendance records");
    }

    const attendanceRecords: AttendanceRecord[] = await res.json();

    return {
      props: {
        attendanceRecords,
      },
    };
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return {
      props: {
        attendanceRecords: [],
      },
    };
  }
};
