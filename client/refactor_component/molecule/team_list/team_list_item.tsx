/**
 * @file TeamListItem.tsx
 * @brief 팀 목록 아이템 컴포넌트 파일
 * @details 이 파일은 팀 목록을 표시하는 `TeamListItem` 컴포넌트를 정의한다.
 *          `TeamListItem` 컴포넌트는 팀의 이름과 설명을 표시하고,
 *          팀을 선택할 수 있는 버튼을 제공한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */
interface TeamListItemProps {
  team_name: string;
  description: string;
  onSelect: () => void;
}
/**
 * @brief 팀 목록 아이템 컴포넌트
 * @details 팀의 이름과 설명을 표시하며, 팀을 선택할 수 있는 버튼을 제공하는 컴포넌트이다.
 * @param {TeamListItemProps} props - 컴포넌트에 전달되는 속성들
 * @param {string} props.team_name - 팀의 이름
 * @param {string} props.description - 팀에 대한 설명
 * @param {() => void} props.onSelect - 팀 선택 버튼 클릭 시 호출되는 함수
 * @return {JSX.Element} 팀의 이름, 설명, 및 선택 버튼을 포함하는 JSX 요소
 */
const TeamListItem: React.FC<TeamListItemProps> = ({
  team_name,
  description,
  onSelect,
}) => {
  return (
    <li className="">
      {team_name} : {description}
      <button className="" onClick={onSelect}>
        해당 팀 선택
      </button>
    </li>
  );
};
export default TeamListItem;
