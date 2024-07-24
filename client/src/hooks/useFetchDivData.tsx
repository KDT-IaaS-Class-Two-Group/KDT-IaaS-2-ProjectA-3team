import { useState, useEffect } from "react";

const useFetchInputData = () => {
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/divMake");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Fetching");
        const result = await response.json();
        // console.log(result);
        setColumns(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchColumns();
  }, []);

  return {
    columns,
  };
};

export default useFetchInputData;
