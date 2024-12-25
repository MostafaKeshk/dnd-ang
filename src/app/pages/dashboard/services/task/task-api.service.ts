import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { TaskStatus } from './task-status';

@Injectable()
export class TaskApiService {
  private taskEndpoint = '/task';

  constructor(private apiService: ApiService) {}

  get(groupId: string): Promise<any> {
    return this.apiService.getData(`${this.taskEndpoint}/${groupId}`);
  }

  create(data: {
    name: string;
    description: string;
    status: TaskStatus;
    groupId: string;
  }): Promise<any> {
    return this.apiService.postData(`${this.taskEndpoint}`, data);
  }

  sort(data: {
    activeId: string;
    overId: string;
    activeNewPanel: TaskStatus;
  }): Promise<any> {
    return this.apiService.put(`${this.taskEndpoint}/sort-tasks`, data);
  }
}
