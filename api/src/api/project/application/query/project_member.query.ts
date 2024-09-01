import { ProjectName } from '../../domain/value-object/project_name.vo';

export class ProjectMemeberQuery {
  project_name: ProjectName;
  constructor(project_name: string) {
    try {
      this.project_name = new ProjectName(project_name);
    } catch (error) {
      throw error;
    }
  }
}
