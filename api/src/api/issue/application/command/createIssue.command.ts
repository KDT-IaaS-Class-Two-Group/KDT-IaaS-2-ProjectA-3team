export class CreateIssueCommand {
  constructor(
    public readonly issue_name: string,
    public readonly project_name: string,
  ) {}
}
