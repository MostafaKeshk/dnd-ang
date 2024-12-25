import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  getFormControl(form: FormGroup, controlName: string): FormControl {
    const control: AbstractControl | null = form.get(controlName);

    if (control instanceof FormControl) {
      return control;
    }

    throw new Error(
      `Form control with name '${controlName}' is not found or not a FormControl instance`
    );
  }

  passwordMatchValidator(
    firstName: string,
    secondName: string,
    errorKey: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(firstName);
      const confirmPassword = formGroup.get(secondName);

      if (password && confirmPassword) {
        const errors = confirmPassword.errors || {}; // Get existing errors

        if (password.value !== confirmPassword.value) {
          confirmPassword.setErrors({ ...errors, passwordsDoNotMatch: true }); // Merge errors
        } else {
          // If passwords match, remove the passwordsDoNotMatch error, but keep other errors
          if (errors[errorKey]) {
            delete errors[errorKey];
            // Set errors to null if no other errors exist
            confirmPassword.setErrors(
              Object.keys(errors).length ? errors : null
            );
          }
        }
      }
      return null;
    };
  }
}
