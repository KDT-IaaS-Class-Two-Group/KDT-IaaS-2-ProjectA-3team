import { ProjectRepository } from 'src/api/project/infrastructure/repository/project.repository';
import { CreateProjectCommand } from '../project_create.command';
import { Project } from 'src/api/project/domain/entities/project.entity';
import { Injectable } from '@nestjs/common';
import { AddStackCommand } from '../add_stack.command';
@Injectable()
export class ProjectCommandHandler {
  constructor(private readonly repository: ProjectRepository) {}

  async createProjectExecute(command: CreateProjectCommand) {
    const domain = Project.create(command);
    return await this.repository.createProject(domain);
  }

  async addStackExecute(command: AddStackCommand) {
    const data = await this.repository.saveProjectStack(
      command.stack,
      command.project_name.getValue(),
    );
    return data;
  }
}
