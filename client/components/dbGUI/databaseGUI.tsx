import React, { useState, useEffect } from "react";
import * as styles from "../../styles/admin/databaseGUI/databasegui.css";
import { pagemainmain, pagemaintext } from "client/styles/team/teampage.css";
import { fetchTables } from "./fetchTables";
interface Table {
  table_name: string;
}

const DBGUI = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTables()
      .then(setTables)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Unknown error occurred")
      );
  }, []);

  return (
    <div className={pagemainmain}>
      <div className={pagemaintext}>DB Table 조회</div>
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
