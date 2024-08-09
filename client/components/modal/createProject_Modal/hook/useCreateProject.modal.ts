import { useState } from 'react';
import { fetchProjectData } from '../service/fetchProjectData';
import { Project } from '../interface/ProjectData.interface';

const useCreateProjectModal = () => {
  // Modal On/Off 관리
  const [isOpen, setIsOpen] = useState(false);
  // Modal 내부 페이지 전환
  const [step, setStep] = useState(1);
  // Project의 이름 상태 변수
  const [projectName, setProjectName] = useState('');
  // 프로젝트 시작 날짜 및 마감 날짜 상태 변수
  const [projectStartDate, setProjectStartDate] = useState<Date | undefined>(undefined);
  const [projectEndDate, setProjectEndDate] = useState<Date | undefined>(undefined);

  // 팀 이름 설정
  const [team, setTeam] = useState<string>('');

  // openModal: 모달을 열 때 호출
  const openModal = () => setIsOpen(true);

  // closeModal: 모달을 닫고 기본값으로 초기화
  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setProjectName('');
    setProjectStartDate(undefined);
    setProjectEndDate(undefined);
  };

  // 다음 버튼으로 step을 변경하여, view를 전환
  const handleNext = () => {
    if (step === 1 && projectName) {
      setStep(2);
    } else if (step === 2 && projectStartDate && projectEndDate) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  // 프로젝트 생성 핸들러
  const handleCreate = async () => {
    const projectData: Project = {
      project_name: projectName,
      project_start_date: projectStartDate as Date,
      project_end_date: projectEndDate as Date,
      team_name : team
    };
    await fetchProjectData(projectData);
  };

  return {
    isOpen,
    step,
    projectName,
    projectStartDate,
    projectEndDate,
    openModal,
    closeModal,
    handleNext,
    team, setTeam,
    handleCreate,
    setProjectName,
    setProjectStartDate,
    setProjectEndDate,
  };
};

export default useCreateProjectModal;
