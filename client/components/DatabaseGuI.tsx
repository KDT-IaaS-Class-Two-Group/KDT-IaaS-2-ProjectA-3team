import {
  dbbuttonstyle,
  dblist,
  dblistitem,
} from "client/styles/databaseGUI/maindbgui.css";
import {
  userlist,
  userlistitem,
} from "client/styles/sidebar/SidebarStyles.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { tdn } from "client/styles/templatebutton.css";
import { DBButton } from "./common/elements/button";
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
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
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
      <ul className={dblist}>
        {tables.slice(0, 5).map((table, index) => (
          <li key={index} className={dblistitem}>
            {table.table_name}
            <DBButton link={`/tables/${table.table_name}`}>null</DBButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DBGUI;
