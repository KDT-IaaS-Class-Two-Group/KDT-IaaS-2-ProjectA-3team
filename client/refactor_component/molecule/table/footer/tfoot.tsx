/**
 * @file Tfoot.tsx
 * @brief 테이블 풋터 컴포넌트 파일
 * @details 이 파일은 테이블의 풋터를 렌더링하는 `Tfoot` 컴포넌트를 정의한다.
 *          `Tfoot` 컴포넌트는 `react-table` 라이브러리의 `flexRender`를 사용하여
 *          동적으로 생성된 테이블 풋터를 렌더링한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import { flexRender } from "@tanstack/react-table";
import TfootProps from "./props/tFooterProps";

/**
 * @brief 테이블 풋터 컴포넌트
 * @details `footerGroups`를 사용하여 테이블의 풋터를 렌더링하는 컴포넌트이다.
 *          `footerGroups`는 `react-table` 라이브러리의 `FooterGroup` 배열로, 각 `FooterGroup`은
 *          여러 개의 `Header`를 포함하며, 각 `Header`는 열의 풋터 제목과 렌더링 방식을 정의한다.
 * @param {TfootProps<TData>} props - 컴포넌트에 전달되는 속성들
 * @param {FooterGroup<TData>[]} props.footerGroups - 테이블 풋터 그룹 배열
 * @return {JSX.Element} 테이블 풋터를 포함하는 JSX 요소
 */
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
