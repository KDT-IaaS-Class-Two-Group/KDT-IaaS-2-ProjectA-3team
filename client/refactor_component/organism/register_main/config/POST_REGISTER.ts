import { PendingUser } from "../interface/PendingData.interface"

export const POST_REGISTER_META = (userData: PendingUser) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  }
}