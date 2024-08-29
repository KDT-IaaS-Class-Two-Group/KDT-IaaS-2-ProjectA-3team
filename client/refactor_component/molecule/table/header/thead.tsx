/**
 * @file Thead.tsx
 * @brief 테이블 헤더 컴포넌트 파일
 * @details 이 파일은 테이블의 헤더를 렌더링하는 `Thead` 컴포넌트를 정의한다.
 *          `Thead` 컴포넌트는 `react-table` 라이브러리의 `HeaderGroup` 및 `flexRender`를 사용하여
 *          동적으로 생성된 테이블 헤더를 렌더링한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";

// TheadProps 정의: headerGroups는 HeaderGroup 배열로 타입 설정
interface TheadProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

/**
 * @brief 테이블 헤더 컴포넌트
 * @details `headerGroups`를 사용하여 테이블의 헤더를 렌더링하는 컴포넌트이다.
 *          `headerGroups`는 `react-table` 라이브러리의 `HeaderGroup` 배열로, 각 `HeaderGroup`은
 *          여러 개의 `Header`를 포함하며, 각 `Header`는 열의 제목과 렌더링 방식을 정의한다.
 * @param {TheadProps<TData>} props - 컴포넌트에 전달되는 속성들
 * @param {HeaderGroup<TData>[]} props.headerGroups - 테이블 헤더 그룹 배열
 * @return {JSX.Element} 테이블 헤더를 포함하는 JSX 요소
 */
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
