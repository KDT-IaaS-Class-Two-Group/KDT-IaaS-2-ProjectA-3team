import {
  userlist,
  userlistitem,
} from "client/styles/sidebar/SidebarStyles.css";
import React, { useState, useEffect } from "react";

interface Table {
  table_name: string;
}

const DBGUI: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tables");
        if (!response.ok) {
          throw new Error("Failed to fetch tables");
        }
        const data: Table[] = await response.json();
        setTables(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul className={userlist}>
        {tables.slice(0, 3).map((table, index) => (
          <li key={index} className={userlistitem}>
            {table.table_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DBGUI;
