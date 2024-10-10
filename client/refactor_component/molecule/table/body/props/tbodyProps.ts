import { Row } from "@tanstack/react-table"; //

export default interface TbodyProps<TData> {
  rowModel: Row<TData>[]; // Row의 제네릭 타입 추가
}
