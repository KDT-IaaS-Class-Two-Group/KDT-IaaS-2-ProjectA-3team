/**
 * !!링크 포함, 사용 파일 체크 및 로직 수정 필요
 * @file list_item_with_link.tsx
 * @brief 링크가 포함된 리스트 아이템 컴포넌트 파일
 * @details 이 컴포넌트는 리스트 아이템(`Li`) 안에 링크(`Link`)를 포함시켜 리스트 아이템을 클릭하면 지정된 링크로 이동할 수 있도록 한다.
 *          주어진 텍스트와 스타일을 사용하여 링크를 렌더링한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import Li from "client/refactor_component/atom/li/li";
import Link from "client/refactor_component/atom/link/link";
import ListItemWithLinkProps from "./props/list_link.props";

/**
 * @brief 링크가 포함된 리스트 아이템 컴포넌트
 * @details 리스트 아이템을 렌더링하고, 내부에 링크를 포함하여 클릭 시 지정된 URL로 이동할 수 있도록 한다.
 *          리스트 아이템과 링크 각각에 스타일을 적용할 수 있는 속성을 제공한다.
 * @param {ListItemWithLinkProps} props 컴포넌트에 전달되는 속성들
 * @param {string} props.li_style - 리스트 아이템의 스타일 클래스 이름
 * @param {string} props.link_style - 링크의 스타일 클래스 이름
 * @param {string} props.text - 링크에 표시될 텍스트
 * @param {string} props.href - 링크의 URL
 * @return {JSX.Element} 리스트 아이템을 포함하고 링크를 렌더링하는 JSX 요소
 */
const ListItemWithLink: React.FC<ListItemWithLinkProps> = ({
  li_style,
  link_style,
  text,
  href,
}) => {
  return (
    <Li li_style={li_style}>
      <Link href={href} link_style={link_style}>
        {text}
      </Link>
    </Li>
  );
};

export default ListItemWithLink;
