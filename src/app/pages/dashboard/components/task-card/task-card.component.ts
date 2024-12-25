import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task!: { name: string; description: string; _id: string };
}
