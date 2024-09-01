export class CreateUserCommand {
  constructor(
    public readonly user_name: string,
    public readonly birth_date: string,
    public readonly address: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
