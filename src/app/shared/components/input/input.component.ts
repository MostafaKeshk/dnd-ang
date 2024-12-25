import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass], // Importing ReactiveFormsModule directly
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() control!: FormControl; // The FormControl passed from the parent
  @Input() label!: string; // Label for the input field
  @Input() type: string = 'text'; // Default input type
  @Input() placeholder: string = ''; // Placeholder for the input field
  @Input() validationMessages: { [key: string]: string } = {}; // Validation error messages
  @Input() customClass: string = ''; // Custom classes for the buttonc

  // Function to retrieve the error message if the control is invalid and touched
  getErrorMessage(): string | null {
    if (this.control.invalid && this.control.touched) {
      const firstErrorKey = Object.keys(this.control.errors || {})[0];
      return this.validationMessages[firstErrorKey] || 'This field is invalid';
    }
    return null;
  }
}
