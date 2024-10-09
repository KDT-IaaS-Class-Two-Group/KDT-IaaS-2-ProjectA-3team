import { UseItem } from "client/components/MemberVerification/interface/UserItem.props.interface";
export const AdminFetchBody = (item: UseItem) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify(item),
  };
};