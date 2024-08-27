import { flexRender } from "@tanstack/react-table";
import TbodyProps from "./props/tbodyProps";

const Tbody = <TData,>({ rowModel }: TbodyProps<TData>) => {
  return (
    <tbody>
      {rowModel.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
