import { UserItem } from "client/components/MemberVerification/interface/UserItem.props.interface";
export const AdminFetchBody = (item: UserItem) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify(item),
  };
};