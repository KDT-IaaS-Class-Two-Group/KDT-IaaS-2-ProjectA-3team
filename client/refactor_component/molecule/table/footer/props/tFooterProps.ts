import { HeaderGroup } from "@tanstack/react-table";

export default interface TfootProps<TData> {
  footerGroups: HeaderGroup<TData>[]; 
  // HeaderGroup의 제네릭 타입을 설정
}
