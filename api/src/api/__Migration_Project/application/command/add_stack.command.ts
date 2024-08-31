import { Stack } from '../../presentation/DTO/stack.dto';
import { ProjectName } from '../../domain/value-object/project_name.vo';

export class AddStackCommand {
  constructor(
    public readonly stack: Stack[],
    public readonly project_name: ProjectName,
  ) {}

  static createAddStackCommand(data: Stack[], project_name: string) {
    return new AddStackCommand(data, new ProjectName(project_name));
  }
}
