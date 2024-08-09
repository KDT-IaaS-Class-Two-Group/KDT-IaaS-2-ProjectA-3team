export enum SERVICE_ERROR {
  __MIGRATION_FAILURE = 'Migration 실패',
  __SET_ROLE_FAILURE = '권한 추가 실패',
  __DELETE_FAILURE = '유저 삭제 실패',
  __CHECK_TEAM_ERROR = '팀 체크 에러 - team name',
  __DUPLICATION_TEAM_NAME = '해당 팀은 존재합니다.',
  __SAVE_TEAM_FAILURE = '팀 정보 저장 실패',
  __FETCHING_TEAM_FAILURE = '팀 정보를 가져오는 데 실패',
  __FETCHING_TEAM_MEMBER = '팀원 데이터를 가져오는 데 실패',
  __FAILURE_SEARCH_ERROR = '해당 프로젝트 이름으로 데이터를 가져오는 것에 실패',
  __FAILURE_PROJECT_CREATE = '프로젝트 생성 실패',
}
