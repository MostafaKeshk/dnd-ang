import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule], // Importing ReactiveFormsModule directly
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() control!: FormControl; // The FormControl passed from the parent
  @Input() label!: string; // Label for the select field
  @Input() options: { value: string | number; label: string }[] = []; // Options for the select dropdown
  @Input() placeholder: string = 'Select an option'; // Placeholder for the select field
  @Input() validationMessages: { [key: string]: string } = {}; // Validation error messages
  @Input() customClass: string = ''; // Custom classes for the select

  // Function to retrieve the error message if the control is invalid and touched
  getErrorMessage(): string | null {
    if (this.control.invalid && this.control.touched) {
      const firstErrorKey = Object.keys(this.control.errors || {})[0];
      return this.validationMessages[firstErrorKey] || 'This field is invalid';
    }
    return null;
  }
}
