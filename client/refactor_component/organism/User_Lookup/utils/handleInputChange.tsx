// userLookupHelpers.ts
import { User } from "../interface/usertypes";

export const handleInputChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  field_name: keyof User,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const value =
    field_name === "salary" ? Number(e.target.value) : e.target.value;
  const updatedUsers = users.map((u, i) =>
    i === index
      ? {
          ...u,
          [field_name]: value,
        }
      : u
  );
  setUsers(updatedUsers);
};
