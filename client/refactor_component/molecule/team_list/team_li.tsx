interface TeamListItemProps {
  team_name: string;
  description: string;
  onSelect: () => void;
}
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
