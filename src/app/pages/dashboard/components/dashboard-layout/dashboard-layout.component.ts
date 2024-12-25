import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TaskService } from '../../services/task/task.service';
import { TaskApiService } from '../../services/task/task-api.service';
import { GroupService } from '../../services/group/group.service';
import { GroupApiService } from '../../services/group/group-api.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  providers: [TaskService, TaskApiService, GroupService, GroupApiService],
})
export class DashboardLayoutComponent {}
