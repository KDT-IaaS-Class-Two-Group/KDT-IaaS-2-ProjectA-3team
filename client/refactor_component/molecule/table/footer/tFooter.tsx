import { flexRender } from "@tanstack/react-table";
import TfootProps from "./props/tFooter";

const Tfoot = <TData,>({ footerGroups }: TfootProps<TData>) => {
  return (
    <tfoot>
      {footerGroups.map((footerGroup) => (
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
  );
};

export default Tfoot;
