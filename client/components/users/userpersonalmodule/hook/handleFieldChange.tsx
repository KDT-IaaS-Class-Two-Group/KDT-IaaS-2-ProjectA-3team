// handleFieldChange.tsx

import React from "react";
import { User } from "../interface/usertypes";

export const handleFieldChange = (
  field: keyof User,
  value: string,
  setEditFields: React.Dispatch<React.SetStateAction<Partial<User>>>
) => {
  setEditFields((prevFields) => ({
    ...prevFields,
    [field]: value,
  }));
};
