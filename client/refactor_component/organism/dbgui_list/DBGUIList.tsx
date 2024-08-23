import React from "react";
import Ul from "client/atoms/ul";
import ListItemWithLink from "client/refactor_component/molecule/list_item_with_link/ListItemWithButton";

interface Table {
  table_name: string;
}

interface DBGUIListProps {
  tables: Table[];
  ul_style: string;
  li_style: string;
  link_style: string;
}

const DBGUIList: React.FC<DBGUIListProps> = ({
  tables,
  ul_style,
  li_style,
  link_style,
}) => {
  return (
    <Ul ul_style={ul_style}>
      {tables.map((table) => (
        <ListItemWithLink
          key={table.table_name}
          li_style={li_style}
          link_style={link_style}
          text={table.table_name}
          href={`/tables/${table.table_name}`}
        />
      ))}
    </Ul>
  );
};

export default DBGUIList;
