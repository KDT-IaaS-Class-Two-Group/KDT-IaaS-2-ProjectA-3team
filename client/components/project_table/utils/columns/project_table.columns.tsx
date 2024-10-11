import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { ResponseProject_WithTeam } from "../../interface/project.interface";

const columnHelper = createColumnHelper<ResponseProject_WithTeam>();

/**
 * * columns : Array
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-08
 * Issue :
 * @description : Project Table을 출력하기 위해 정의된 Columns
 * project_name | project_start_date | project_end_date
 */
const columns = [
  columnHelper.accessor("project_name", {
    header: () => "Project Name",
    cell: (info) => {
      const projectName = info.getValue();
      return (
        <Link href={"user/project/[id]"} as={projectName}>
          {projectName}
        </Link>
      );
    },
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("project_start_date", {
    header: () => "Start Date",
    cell: (info) => {
      const isoString = info.getValue() as string;
      const dateObject = new Date(isoString);

      if (!isNaN(dateObject.getTime())) {
        return new Intl.DateTimeFormat("en-US").format(dateObject);
      } else {
        return "Date 변환 실패";
      }
    },
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("project_end_date", {
    header: () => "End Date",
    cell: (info) => {
      const isoString = info.getValue() as string;
      const dateObject = new Date(isoString);

      if (!isNaN(dateObject.getTime())) {
        return new Intl.DateTimeFormat("en-US").format(dateObject);
      } else {
        return "Date 변환 실패";
      }
    },
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("team_name", {
    header: () => "team",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

export default columns;
