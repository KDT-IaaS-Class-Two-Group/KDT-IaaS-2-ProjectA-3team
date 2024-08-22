export class TeamName {
  value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('');
    }
    this.value = value;
  }

  private isValid(value: string): boolean {
    return value.length > 0 && value.length <= 255;
  }
}
