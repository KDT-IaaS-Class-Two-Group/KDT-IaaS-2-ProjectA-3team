import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import REQUEST_URL from "client/ts/enum/REQUEST_URL.ENUM";

interface Project {
  project_name: string;
  project_start_date: string;
  project_end_date: string;
}

const columnHelper = createColumnHelper<Project>();

const columns = [
  columnHelper.accessor("project_name", {
    header: () => "Project Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("project_start_date", {
    header: () => "Start Date",
    // cell: (info) => info.getValue(),
    cell: (info) => {
      const isoString = info.getValue() as string;
      const dateObject = new Date(isoString);

      if (!isNaN(dateObject.getTime())) {
        return new Intl.DateTimeFormat("en-US").format(dateObject);
      } else {
        console.error("Invalid date value:", isoString);
        return "Invalid Date";
      }
    },
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("project_end_date", {
    header: () => "End Date",
    // cell: (info) => new Intl.DateTimeFormat("en-US").format(info.getValue()),
    cell: (info) => {
      const isoString = info.getValue() as string;
      const dateObject = new Date(isoString);

      if (!isNaN(dateObject.getTime())) {
        return new Intl.DateTimeFormat("en-US").format(dateObject);
      } else {
        console.error("Invalid date value:", isoString);
        return "Invalid Date";
      }
    },
    footer: (info) => info.column.id,
  }),
];

const fetchData = async () => {
  try {
    const res = await fetch(REQUEST_URL.__GET_PROJECT_LIST, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const tests = await res.json();
    return tests;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

const TableComponent: React.FC = () => {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default TableComponent;
