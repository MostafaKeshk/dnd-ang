import { Injectable, signal } from '@angular/core';
import { GroupApiService } from './group-api.service';

@Injectable()
export class GroupService {
  fetchLoading = signal(false);
  createLoading = signal(false);
  groups = signal<{ _id: string; name: string }[]>([]);
  selectedGroup = signal<string | null>(null);

  constructor(private groupApiService: GroupApiService) {}

  async fetchGroups() {
    this.fetchLoading.set(true);
    try {
      const result = await this.groupApiService.get();
      console.log({ result });
      this.groups.set(result.rows); // Assuming result is an array of groups
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    } finally {
      this.fetchLoading.set(false);
    }
  }

  async handleAddGroup(name: string) {
    this.createLoading.set(true);
    try {
      const { group: newGroup } = await this.groupApiService.create({ name });

      const currentGroups = this.groups();
      this.groups.set([...currentGroups, newGroup]);
    } catch (error) {
      console.error('Failed to create group:', error);
    } finally {
      this.createLoading.set(false);
    }
  }

  handleSelectGroup(id: string) {
    this.selectedGroup.set(id);
  }
}
