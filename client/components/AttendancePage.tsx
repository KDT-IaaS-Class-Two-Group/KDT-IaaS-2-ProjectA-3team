import React, { useEffect, useState } from "react";

interface AttendanceRecord {
  user_id: string;
  username: string;
  clockInTime: string;
  clockOutTime?: string;
}

const AttendancePage: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  useEffect(() => {
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

  return (
    <div>
      <h1>Attendance Records</h1>
      <ul>
        {attendanceRecords.map((record, index) => (
          <li key={`${record.user_id}-${index}`}>
            <p>User ID: {record.user_id}</p>
            <p>Username: {record.username}</p>
            <p>Clock In: {new Date(record.clockInTime).toLocaleString()}</p>
            <p>
              Clock Out:{" "}
              {record.clockOutTime
                ? new Date(record.clockOutTime).toLocaleString()
                : "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendancePage;
