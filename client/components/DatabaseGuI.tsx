import React, { useState, useEffect } from "react";

const DatabaseGUI: React.FC = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tables");
        if (!response.ok) {
          throw new Error("Failed to fetch tables");
        }
        const data = await response.json();

        // 데이터에서 테이블 이름만 추출
        const tableNames = data.map(
          (table: { table_name: string }) => table.table_name
        );

        // 테이블 목록 중 3개만 랜덤으로 선택
        const selectedTables = tableNames.slice(0, 3); // 여기서는 단순히 처음 3개를 선택
        setTables(selectedTables);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTables();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>Database GUI</p>
      <div>
        {tables.map((table, index) => (
          <div key={index}>{table}</div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseGUI;
