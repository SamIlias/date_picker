import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class TasksCalendarDecorator extends BaseCalendarDecorator {
  private storageKey = 'calendarTasks';
  private tasks: Record<string, string[]> = {};

  private getDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  public loadTasks(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        this.tasks = JSON.parse(data);
      } catch {
        this.tasks = {};
      }
    }
  }

  public addTask(date: Date, task: string): void {
    const key = this.getDateKey(date);
    if (!this.tasks[key]) {
      this.tasks[key] = [];
    }
    this.tasks[key].push(task);
    this.saveTasks();
  }

  public removeTask(date: Date, index: number): void {
    const key = this.getDateKey(date);
    if (!this.tasks[key]) return;
    this.tasks[key].splice(index, 1);
    if (this.tasks[key].length === 0) delete this.tasks[key];
    this.saveTasks();
  }

  public getTasks(date: Date): string[] {
    const key = this.getDateKey(date);
    return this.tasks[key] || [];
  }

  public clearAllTasks(): void {
    this.tasks = {};
    this.saveTasks();
  }
}
