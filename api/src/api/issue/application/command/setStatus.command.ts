export class SetStatusCommand {
  constructor(
    public readonly issue_id: string,
    public readonly status: string,
  ) {}
}
