import { useState } from 'react';
import Project from "client/ts/Interface/project.interface";
import { fetchProjectData } from '../service/fetch_post_project';

/**
 * @author @naviadev
 * @date 2024/08/23
 * @version 1.4
 * @brief 프로젝트 생성 과정을 관리하는 커스텀 훅.
 * @details 프로젝트 생성 과정에서 필요한 상태와 동작을 관리한다. 프로젝트 이름, 시작 날짜, 종료 날짜, 팀 정보를 상태로 관리하며, 다음 단계와 이전 단계로의 이동, 그리고 최종 프로젝트 생성을 처리한다.
 *
 * @returns {object} 프로젝트 상태와 관련된 제어 함수들을 반환한다.
 * @returns {string} projectName 프로젝트 이름.
 * @returns {function} setProjectName 프로젝트 이름을 설정하는 함수.
 * @returns {Date | undefined} projectStartDate 프로젝트 시작 날짜.
 * @returns {function} setProjectStartDate 프로젝트 시작 날짜를 설정하는 함수.
 * @returns {Date | undefined} projectEndDate 프로젝트 종료 날짜.
 * @returns {function} setProjectEndDate 프로젝트 종료 날짜를 설정하는 함수.
 * @returns {string} team 선택된 팀 이름.
 * @returns {function} setTeam 선택된 팀 이름을 설정하는 함수.
 * @returns {number} step 현재 프로젝트 설정 단계.
 * @returns {function} setStep 현재 단계를 설정하는 함수.
 * @returns {function} handleNext 다음 단계로 진행하는 함수.
 * @returns {function} handlePrevious 이전 단계로 돌아가는 함수.
 * @returns {function} handleCreate 프로젝트 생성 API 호출 함수.
 */

const useProjectState = () => {
  /** 
   * @brief 프로젝트 이름을 관리하는 상태값. 
   * @details 프로젝트 이름을 문자열로 저장한다.
   */
  const [projectName, setProjectName] = useState<string>('');

  /** 
   * @brief 프로젝트 시작 날짜를 관리하는 상태값. 
   * @details 프로젝트 시작 날짜를 `Date` 객체로 저장한다.
   */
  const [projectStartDate, setProjectStartDate] = useState<Date | undefined>(undefined);

  /** 
   * @brief 프로젝트 종료 날짜를 관리하는 상태값. 
   * @details 프로젝트 종료 날짜를 `Date` 객체로 저장한다.
   */
  const [projectEndDate, setProjectEndDate] = useState<Date | undefined>(undefined);

  /** 
   * @brief 선택된 팀을 관리하는 상태값. 
   * @details 선택된 팀의 이름을 문자열로 저장한다.
   */
  const [team, setTeam] = useState<string>('');

  /** 
   * @brief 현재 프로젝트 설정 단계를 관리하는 상태값. 
   * @details 단계는 숫자로 표현되며, 각 숫자는 특정 프로젝트 설정 단계를 나타낸다.
   */
  const [step, setStep] = useState(1);

  /**
   * @brief 다음 단계로 진행하는 함수.
   * @details 현재 단계를 1 증가시켜 다음 프로젝트 설정 단계로 이동한다.
   */
  const handleNext = () => setStep((prevStep) => prevStep + 1);

  /**
   * @brief 이전 단계로 돌아가는 함수.
   * @details 현재 단계를 1 감소시켜 이전 프로젝트 설정 단계로 돌아간다.
   */
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  /**
   * @brief 프로젝트 생성 API 호출 함수.
   * @details 현재 상태에 저장된 데이터를 기반으로 프로젝트 생성 API를 호출한다.
   * @throws Error API 호출 실패 시 에러를 던질 수 있다.
   */
  const handleCreate = async () => {
    const projectData: Project = {
      project_name: projectName,
      project_start_date: projectStartDate as Date,
      project_end_date: projectEndDate as Date,
      team_name: team,
    };
    await fetchProjectData(projectData);
  };

  return {
    projectName,
    setProjectName,
    projectStartDate,
    setProjectStartDate,
    projectEndDate,
    setProjectEndDate,
    team,
    setTeam,
    step,
    setStep,
    handleNext,
    handlePrevious,
    handleCreate,
  };
};

export default useProjectState;
