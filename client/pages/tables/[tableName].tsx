import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { useFetchTableData } from "../../hooks/useFetchTableData";
import AdminSidebar from "./../../components/SideBar/AdminSidebar";
import MainHeader from "client/components/common/header/mainheader";
import AdminMainContent from "client/components/adminMainPage/AdminMainPage";
import {
  contentcontainer,
  mainpagecontainer,
} from "client/styles/admin/admindashboard.css";
import {
  pagemaincontainer,
  pagemainmain,
  pagemaintext,
} from "client/styles/team/teampage.css";
import {
  listtable,
  pendinglist,
} from "client/styles/users/attendancestyle.css";
import { SessionData } from "client/ts/Interface/SessionData.interface";

interface Column {
  column_name: string;
  data_type: string;
}

interface Row {
  [key: string]: any;
}

const getIdField = (tableName: string) => {
  const idFields: { [key: string]: string } = {
    stack: "stack_name",
    field: "field_name",
    users: "user_id",
    pending_users: "user_id",
    checkusers: "user_id",
    Profile: "user_id",
    admin_role_users: "user_id",
    leader_role_users: "user_id",
    sub_admin_role_users: "user_id",
    employee_role_users: "user_id",
    users_salary: "user_id",
    relation_users_field_name: "user_id",
    role: "role_name",
    Team: "team_name",
    relation_team_users: "team_name",
    Project: "project_id",
    Kanban: "kanban_id",
    Issue: "issue_id",
    role_permission: "role_name",
  };
  return idFields[tableName] || "id";
};

const TablePage: React.FC = () => {
  const router = useRouter();
  const { tableName } = router.query;
  const { structure, data, error, fetchTableData, setData, setError } =
    useFetchTableData(tableName as string);
  const [formData, setFormData] = useState<Row>({});

  const handleInputChange = (column: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [column]: value }));
  };

  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(
    <AdminMainContent
      onclick={function (component: React.ReactNode): void {
        throw new Error("Function not implemented.");
      }}
    />
  );

  const handleMenuClick = (component: React.ReactNode) => {
    console.log("test");
    setCurrentComponent(component);
  };

  const handleSave = async () => {
    const idField = getIdField(tableName as string);
    const url = `http://localhost:3001/api/tables/${tableName}/rows${
      formData[idField] ? `/${formData[idField]}` : ""
    }`;
    const method = formData[idField] ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchTableData();
        setFormData({});
      } else {
        const errorData = await response.json();
        throw new Error(`Error saving data: ${errorData.message}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  const handleEdit = (row: Row) => {
    setFormData(row);
  };

  return (
    <div className={mainpagecontainer}>
      <AdminSidebar onMenuItemClick={handleMenuClick} />
      <div className={contentcontainer}>
        <MainHeader
          sessionData={null}
          setSessionData={function (
            value: SetStateAction<SessionData | null>
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className={pagemainmain}>
          {currentComponent} {/* 현재 선택된 컴포넌트가 렌더링되는 위치 */}
          <div className={pagemaincontainer}>
            <div className={pagemaintext}>Table: {tableName}</div>
            {error && <p>{error}</p>}
            <TableStructure structure={structure} />
            <TableData
              data={data}
              structure={structure}
              onEdit={handleEdit}
              idField={getIdField(tableName as string)}
            />
            <Form
              structure={structure}
              formData={formData}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TableStructure: React.FC<{ structure: Column[] }> = ({ structure }) => (
  <>
    <h2>Structure</h2>
    <ul className={listtable}>
      {structure.map((column) => (
        <li key={column.column_name} className={pendinglist}>
          {column.column_name} ({column.data_type})
        </li>
      ))}
    </ul>
  </>
);

const TableData: React.FC<{
  data: Row[];
  structure: Column[];
  onEdit: (row: Row) => void;
  idField: string;
}> = ({ data, structure, onEdit, idField }) => (
  <>
    <h2>Data</h2>
    <table>
      <thead>
        <tr>
          {structure.map((column) => (
            <th key={column.column_name}>{column.column_name}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row[idField]}>
            {structure.map((column) => (
              <td key={column.column_name}>{row[column.column_name]}</td>
            ))}
            <td>
              <button onClick={() => onEdit(row)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const Form: React.FC<{
  structure: Column[];
  formData: Row;
  onInputChange: (column: string, value: any) => void;
  onSave: () => void;
}> = ({ structure, formData, onInputChange, onSave }) => (
  <>
    <h2>{formData.id ? "Edit Data" : "Add Data"}</h2>
    {structure.map((column) => (
      <div key={column.column_name}>
        <label>{column.column_name}</label>
        <input
          type="text"
          value={formData[column.column_name] || ""}
          onChange={(e) => onInputChange(column.column_name, e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSave()}
        />
      </div>
    ))}
    <button onClick={onSave}>{formData.id ? "Update" : "Add"}</button>
  </>
);

export default TablePage;
