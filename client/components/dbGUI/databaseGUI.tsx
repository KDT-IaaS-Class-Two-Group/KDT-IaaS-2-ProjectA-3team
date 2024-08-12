import React, { useState, useEffect } from "react";
import * as styles from "../../styles/admin/databaseGUI/databasegui.css";

interface Table {
  table_name: string;
}

const DBGUI = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tables");
        if (!response.ok) {
          throw new Error(`Error fetching tables: ${response.statusText}`);
        }
        const data: Table[] = await response.json();
        setTables(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      }
    };

    fetchTables();
  }, []);

  return (
    <div className={styles.maincontainter}>
      <h1>Database Tables</h1>
      {error && <p>{error}</p>}
      <ul className={styles.ulliststlye}>
        {tables.map((table) => (
          <li key={table.table_name}>
            <a href={`/tables/${table.table_name}`} className={styles.astyle}>
              {table.table_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DBGUI;
