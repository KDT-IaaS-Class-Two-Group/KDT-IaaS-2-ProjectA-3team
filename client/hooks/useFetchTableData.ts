import { useState, useEffect } from "react";

interface ColumnStructure {
  column_name: string;
  data_type: string;
}

interface UseFetchTableData {
  structure: ColumnStructure[];
  data: any[];
  error: string | null;
  fetchTableData: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useFetchTableData = (tableName: string): UseFetchTableData => {
  const [structure, setStructure] = useState<ColumnStructure[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    try {
      const structureResponse = await fetch(
        `http://localhost:3001/api/tables/${tableName}/structure`
      );
      const dataResponse = await fetch(
        `http://localhost:3001/api/tables/${tableName}/data`
      );
      if (!structureResponse.ok || !dataResponse.ok) {
        throw new Error("Failed to fetch data");
      }
      const structureData = await structureResponse.json();
      const tableData = await dataResponse.json();
      setStructure(structureData);
      setData(tableData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (tableName) {
      fetchTableData();
    }
  }, [tableName]);

  return { structure, data, error, fetchTableData, setData, setError };
};
