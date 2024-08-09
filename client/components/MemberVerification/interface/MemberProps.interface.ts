export interface MemberProps {
  memberData: { [key: string]: any }[];
  setMemberData: React.Dispatch<React.SetStateAction<{ [key: string]: string }[]>>;
}