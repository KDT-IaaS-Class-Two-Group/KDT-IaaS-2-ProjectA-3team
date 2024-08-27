import React from "react";
import { flexRender, HeaderGroup, Column } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table"; // 필요한 경우 추가

// TheadProps 정의: headerGroups는 HeaderGroup 배열로 타입 설정
interface TheadProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

const Thead = <TData,>({ headerGroups }: TheadProps<TData>) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
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
  );
};

export default Thead;
