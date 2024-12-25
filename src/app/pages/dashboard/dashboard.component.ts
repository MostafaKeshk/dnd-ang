import { Component, signal, effect, computed } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { GroupService } from './services/group/group.service';
import { TaskService } from './services/task/task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop'; // Import for drag and drop

import { CommonModule } from '@angular/common';
import { UtilityService } from '../../shared/services/utility.service';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    DragDropModule,
    TaskDialogComponent,
    TaskCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  trackById!: (index: number, item: any) => any;
  openDialog = signal(false);

  taskEffect = effect(
    () => {
      const selectedGroupId = this.groupService.selectedGroup();

      if (selectedGroupId) {
        this.taskService.fetchTasks(selectedGroupId);
      }
    },
    { allowSignalWrites: true }
  );

  inProgressTasks = computed(() => this.taskService.getInProgressTasks());
  todoTasks = computed(() => this.taskService.getTodoTasks());
  doneTasks = computed(() => this.taskService.getDoneTasks());

  async drop(event: CdkDragDrop<any[]>) {
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move item between different lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const newList = event.container.data;
    console.log({ event });
    // await this.taskService.handleSortTask()
  }

  constructor(
    public groupService: GroupService,
    public taskService: TaskService,
    private utilityService: UtilityService
  ) {
    this.trackById = this.utilityService.trackById;
  }

  handleOpenDialog() {
    this.openDialog.set(true);
  }
}
