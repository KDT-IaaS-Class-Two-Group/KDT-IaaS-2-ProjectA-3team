enum REQUEST_URL {
  __VERIFY_SESSION = "http://localhost:3001/verify-session", 
  __GET_PENDING_USERS = "http://localhost:3001/getUser/pending",
  __LOGIN = "http://localhost:3001/login",
  __PENDING_APPROVE = 'http://localhost:3001/approve',
  __PENDING_CANCLE = 'http://localhost:3001/cancle'
}
export default REQUEST_URL;