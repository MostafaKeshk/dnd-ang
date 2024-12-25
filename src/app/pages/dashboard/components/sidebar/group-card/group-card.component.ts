import { Component, Input, OnInit, signal } from '@angular/core';
import { GroupService } from '../../../services/group/group.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-card.component.html',
})
export class GroupCardComponent {
  constructor(public groupService: GroupService) {}
  @Input() group!: { name: string; _id: string };

  handleSelectGroup() {
    this.groupService.handleSelectGroup(this.group._id); // Notify service of selected group
  }
}
