/**
 * * Class : SearchStacksQuery
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @class SearchStacksQuery
 * @param public readonly name: string
 * @description : 스택을 검색하기 위해 쿼리 정보를 캡슐화하였다. Database의 조회, 검색 과 같은 읽는 작업에 사용된다.
 * 쿼리핸들러는 해당 쿼리 클래스의 정보를 확인하고, 정해진 로직을 수행한다.
 * @EX :
 * const query = new SearchStacksQuery('js');
 * 해당 쿼리는 이름에 js가 포함된 스택을 검색한다.
 */
export class SearchStacksQuery {
  constructor(public readonly name: string) {}
}
