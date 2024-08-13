interface Issue {
  issue_id: number;
  issue_name: string;
  status: '대기 ' | '완료';
}
export default Issue;
