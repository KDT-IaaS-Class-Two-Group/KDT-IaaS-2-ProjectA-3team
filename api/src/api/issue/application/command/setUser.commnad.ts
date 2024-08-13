export class SetUserCommand {
  constructor(
    public readonly issue_id: string,
    public readonly user_id: string,
  ) {}
}
