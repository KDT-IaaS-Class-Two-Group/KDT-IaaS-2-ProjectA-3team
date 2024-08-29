/**
 * @file Tbody.tsx
 * @brief 테이블 바디 컴포넌트 파일
 * @details 이 파일은 테이블의 바디를 렌더링하는 `Tbody` 컴포넌트를 정의한다.
 *          `Tbody` 컴포넌트는 `react-table` 라이브러리의 `flexRender`를 사용하여
 *          동적으로 생성된 테이블 바디를 렌더링한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import { flexRender } from "@tanstack/react-table";
import TbodyProps from "./props/tbodyProps";

/**
 * @brief 테이블 바디 컴포넌트
 * @details `rowModel`을 사용하여 테이블의 바디를 렌더링하는 컴포넌트이다.
 *          `rowModel`은 `react-table` 라이브러리의 `RowModel` 배열로, 각 `RowModel`은
 *          여러 개의 `Cell`을 포함하며, 각 `Cell`은 열의 셀 데이터를 정의한다.
 * @param {TbodyProps<TData>} props - 컴포넌트에 전달되는 속성들
 * @param {Row<TData>[]} props.rowModel - 테이블 행 모델 배열
 * @return {JSX.Element} 테이블 바디를 포함하는 JSX 요소
 */
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
