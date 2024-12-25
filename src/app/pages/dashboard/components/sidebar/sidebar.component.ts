import { Component, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { GroupService } from '../../services/group/group.service';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../../../shared/services/utility.service';
import { GroupCardComponent } from './group-card/group-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonComponent,
    GroupDialogComponent,
    CommonModule,
    GroupCardComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  trackById!: (index: number, item: any) => any;

  constructor(
    public groupService: GroupService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.groupService.fetchGroups();
    this.trackById = this.utilityService.trackById; // Assign trackById after utilityService is initialized
  }

  openDialog = signal(false);
  handleOpenDialog() {
    this.openDialog.set(true);
  }
}
