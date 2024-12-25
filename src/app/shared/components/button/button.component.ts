import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = 'Submit'; // Button label
  @Input() isLoading = signal(false); // Signal to manage loading state
  @Input() customClass: string = ''; // Custom classes for the buttonc

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>(); // Custom event emitter

  handleClick() {
    if (!this.isLoading()) {
      this.onClick.emit(); // Emit the event to the parent
    }
  }
}
