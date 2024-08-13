enum REQUEST_URL {
  __VERIFY_SESSION = "http://localhost:3001/verify-session",
  __GET_PENDING_USERS = "http://localhost:3001/getUser/pending",
  __LOGIN = "http://localhost:3001/login",
  __PENDING_APPROVE = "http://localhost:3001/pending-process/approve",
  __PENDING_CANCEL = "http://localhost:3001/pending-process/cancel",
  __CREATE_PROJECT = "http://localhost:3001/project/create",
  __REGISTER = "http://localhost:3001/register",
  __GET_PROJECT_LIST = "http://localhost:3001/project/list",
  __GET_TEAM_ALL = "http://localhost:3001/team/all",
  __GET_SEARCH_STACK = "http://localhost:3001/stack/search",
  __POST_SAVE_STACK = "http://localhost:3001/save/stack",
  __GET_PROJECT_INFO = "http://localhost:3001/project/getTeamMember",
  __API = "__API",
  __USER = "__USER",
}
export default REQUEST_URL;
