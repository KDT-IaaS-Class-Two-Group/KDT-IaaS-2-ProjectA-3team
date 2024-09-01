export class PostTeamCommand {
  constructor(
    public readonly team_name: string,
    public readonly description: string,
    public readonly team_leader: { [key: string]: string },
    public readonly team_members: { [key: string]: string }[],
  ) {}
}
