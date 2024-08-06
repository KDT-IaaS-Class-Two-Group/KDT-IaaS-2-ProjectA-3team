enum REQUEST_URL {
  __VERIFY_SESSION = "http://localhost:3001/verify-session", 
  __GET_PENDING_USERS = "http://localhost:3001/getUser/pending",
  __LOGIN = "http://localhost:3001/login",
  __PENDING_APPROVE = 'http://localhost:3001/pending-process/approve',
  __PENDING_CANCEL = 'http://localhost:3001/pending-process/cancel'
}
export default REQUEST_URL;