import { Component, OnInit, signal } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormControlService } from '../../../shared/services/form-control.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, RouterLink, ReactiveFormsModule, ButtonComponent],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  loading = signal(false);

  signupForm!: FormGroup;

  constructor(
    private formControlService: FormControlService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('mostafa', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('mostafa@gmail.com', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('Asdewq123@', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('Asdewq123@', [Validators.required]),
      },
      {
        validators: this.formControlService.passwordMatchValidator(
          'password',
          'confirmPassword',
          'passwordsDoNotMatch'
        ),
      }
    );
  }

  getFormControl(controlName: string): FormControl {
    return this.formControlService.getFormControl(this.signupForm, controlName);
  }

  validationMessages = {
    required: 'This field is required',
    minlength: 'Minimum length is not met',
    email: 'Please enter a valid email address',
    passwordsDoNotMatch: 'Passwords do not match',
  };

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading.set(true); // Start loading indicator

    try {
      // Wait for the signup process to complete
      await this.authService.signup(this.signupForm.value);

      // If signup is successful, navigate to home page
      this.router.navigate(['/']);
      this.toastr.success('Signup successful!');
    } catch (error: any) {
      // Handle error case: log the error and show the error message
      this.toastr.error(error.error?.message || 'Signup failed');
    } finally {
      // Always set loading to false, regardless of success or failure
      this.loading.set(false);
    }
  }
}
