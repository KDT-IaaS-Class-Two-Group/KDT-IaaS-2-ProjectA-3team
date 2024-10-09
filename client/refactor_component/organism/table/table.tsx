import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Tbody from "client/refactor_component/molecule/table/body/tbody";
import Tfoot from "client/refactor_component/molecule/table/footer/tfoot";
import Thead from "client/refactor_component/molecule/table/header/thead";
interface TableProps<TData> {
  data: [];
  columns: ColumnDef<TData>[];
}
const Table = <TData,>({ columns, data }: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table>
      <Thead headerGroups={table.getHeaderGroups()}></Thead>
      <Tbody rowModel={table.getRowModel().rows}></Tbody>
      <Tfoot footerGroups={table.getFooterGroups()}></Tfoot>
    </table>
  );
};
