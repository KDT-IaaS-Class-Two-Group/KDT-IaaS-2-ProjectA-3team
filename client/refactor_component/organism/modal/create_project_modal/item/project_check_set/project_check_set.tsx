import Button from "client/refactor_component/atom/button/button";
import { bold24Text, bold32Text } from "client/styles/standardtextsize.css";

/**
 * @author @naviadev
 * @date 2024/08/23
 * @version 1.4
 * @brief 프로젝트 생성 확인 화면을 출력하는 컴포넌트.
 * @details 이 컴포넌트는 사용자가 프로젝트 생성 정보를 확인하고, 최종적으로 프로젝트를 생성할 수 있는 버튼을 제공한다.
 *
 * @param {string} projectName - 프로젝트 이름.
 * @param {Date | undefined} projectStartDate - 프로젝트 시작 날짜.
 * @param {Date | undefined} projectEndDate - 프로젝트 종료 날짜.
 * @param {string} team - 선택된 팀 이름.
 * @param {function} handleCreateProject - 프로젝트 생성을 처리하는 함수.
 * @returns {JSX.Element} 프로젝트 생성 확인 UI를 반환한다.
 */

interface ProjectSetCheckProps {
  /** @brief 프로젝트 이름. */
  projectName: string;

  /**
   * @brief 프로젝트 시작 날짜.
   * @details 시작 날짜가 설정되지 않았을 경우 '설정되지 않음'이라는 메시지를 표시한다.
   */
  projectStartDate: Date | undefined;

  /**
   * @brief 프로젝트 종료 날짜.
   * @details 종료 날짜가 설정되지 않았을 경우 '설정되지 않음'이라는 메시지를 표시한다.
   */
  projectEndDate: Date | undefined;

  /** @brief 선택된 팀 이름. */
  team: string;

  /**
   * @brief 프로젝트 생성을 처리하는 함수.
   * @details 프로젝트 데이터를 서버로 전송하여 프로젝트를 생성한다.
   * @returns {Promise<void>} 비동기 함수로, 성공 시 아무것도 반환하지 않는다.
   */
  handleCreateProject: () => Promise<void>;
}

const ProjectSetCheck: React.FC<ProjectSetCheckProps> = ({
  projectName,
  projectStartDate,
  projectEndDate,
  team,
  handleCreateProject,
}) => {
  return (
    <div>
      {/* 프로젝트 생성 확인 제목 */}
      <div className={bold32Text}>프로젝트 생성 확인</div>

      {/* 프로젝트 이름 표시 */}
      <p className={bold24Text}>프로젝트 이름: {projectName}</p>

      {/* 프로젝트 시작 날짜 표시 */}
      <p className={bold24Text}>
        시작 날짜:{" "}
        {projectStartDate ? projectStartDate.toDateString() : "설정되지 않음"}
      </p>

      {/* 프로젝트 종료 날짜 표시 */}
      <p className={bold24Text}>
        마감 날짜:{" "}
        {projectEndDate ? projectEndDate.toDateString() : "설정되지 않음"}
      </p>

      {/* 선택된 팀 이름 표시 */}
      <p className={bold24Text}>팀: {team}</p>

      {/* 프로젝트 생성 버튼 */}
      <Button
        button_text="생성"
        button_style=""
        onClick={handleCreateProject}
      />
    </div>
  );
};

export default ProjectSetCheck;
