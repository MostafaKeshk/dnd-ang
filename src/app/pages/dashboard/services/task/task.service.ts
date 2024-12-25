import { Injectable, signal } from '@angular/core';
import { TaskApiService } from './task-api.service';
import { TaskStatus } from './task-status';

@Injectable()
export class TaskService {
  fetchLoading = signal(false);
  createLoading = signal(false);
  tasks = signal<
    {
      _id: string;
      name: string;
      description: string;
      status: TaskStatus;
      groupId: string;
    }[]
  >([]);

  constructor(private taskApiService: TaskApiService) {}

  async fetchTasks(groupId: string) {
    if (!groupId) return; // No need to fetch tasks if groupId is null

    this.fetchLoading.set(true);
    try {
      const rows = await this.taskApiService.get(groupId); // Pass the groupId to the API
      this.tasks.set(rows); // Assuming result is an array of tasks
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      this.fetchLoading.set(false);
    }
  }

  async handleAddTask({
    name,
    description,
    status,
    groupId,
  }: {
    name: string;
    description: string;
    status: TaskStatus;
    groupId: string;
  }) {
    this.createLoading.set(true);
    try {
      const { task: newTask } = await this.taskApiService.create({
        name,
        description,
        status,
        groupId,
      });

      const currentTasks = this.tasks();
      this.tasks.set([...currentTasks, newTask]);
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      this.createLoading.set(false);
    }
  }

  async handleSortTask({
    activeId,
    overId,
    activeNewPanel,
  }: {
    activeId: string;
    overId: string;
    activeNewPanel: TaskStatus;
  }) {
    try {
      await this.taskApiService.sort({
        activeId,
        overId,
        activeNewPanel,
      });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  }

  getInProgressTasks() {
    return this.tasks().filter((task) => task.status === TaskStatus.InProgress);
  }

  getDoneTasks() {
    return this.tasks().filter((task) => task.status === TaskStatus.Done);
  }

  getTodoTasks() {
    return this.tasks().filter((task) => task.status === TaskStatus.Todo);
  }
}
