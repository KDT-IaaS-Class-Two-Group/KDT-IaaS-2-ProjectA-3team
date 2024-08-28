import React, { useState, useEffect } from "react";
import DBGUIList from "client/refactor_component/organism/dbgui_list/DBGUIList";
import { fetchTables, Table } from "client/refactor_component/organism/dbgui_list/service/fetchTables";
import * as styles from "../../../styles/admin/databaseGUI/databasegui.css";
import { pagemainmain, pagemaintext } from "client/styles/team/teampage.css";

const DbGui: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTables()
      .then(setTables)
      .catch(err => setError(err instanceof Error ? err.message : "Unknown error occurred"));
  }, []);

  return (
    <div className={pagemainmain}>
      <div className={pagemaintext}>DB Table 조회</div>
      {error && <p>{error}</p>}
      <DBGUIList
        tables={tables}
        ul_style={styles.ulliststlye}
        li_style={""}
        link_style={styles.astyle}
      />
    </div>
  );
};

export default DbGui;
