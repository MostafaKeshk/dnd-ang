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
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, RouterLink, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loading = signal(false);

  loginForm!: FormGroup;

  constructor(
    private formControlService: FormControlService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('mostafa4@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('Asdewq123@', [Validators.required]),
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.formControlService.getFormControl(this.loginForm, controlName);
  }

  validationMessages = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
  };

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true); // Start the loading spinner

    try {
      // Wait for the login process to complete
      await this.authService.login(this.loginForm.value);

      // If login is successful, navigate to home page
      this.router.navigate(['/']);
      this.toastr.success('Login successful!');
    } catch (error: any) {
      // Handle error case: log the error and show the error message
      console.log(error);
      this.toastr.error(error.error?.message || 'Login failed');
    } finally {
      // Always set loading to false, regardless of success or failure
      this.loading.set(false);
    }
  }
}
