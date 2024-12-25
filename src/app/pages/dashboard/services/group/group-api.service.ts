import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';

@Injectable()
export class GroupApiService {
  private groupEndpoint = '/group'; // Group-specific endpoint

  constructor(private apiService: ApiService) {}

  get(): Promise<any> {
    return this.apiService.getData(`${this.groupEndpoint}`);
  }

  create(data: { name: string }): Promise<any> {
    return this.apiService.postData(`${this.groupEndpoint}`, data);
  }
}
