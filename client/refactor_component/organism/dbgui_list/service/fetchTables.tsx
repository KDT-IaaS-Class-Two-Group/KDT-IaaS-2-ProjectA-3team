export interface Table {
  table_name: string;
}

export const fetchTables = async (): Promise<Table[]> => {
  try {
    const response = await fetch("http://localhost:3001/api/tables");
    if (!response.ok) {
      throw new Error(`Error fetching tables: ${response.statusText}`);
    }
    const data: Table[] = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching tables:", err);
    throw err; // Error를 던져서 호출하는 쪽에서 처리할 수 있도록 함
  }
};
