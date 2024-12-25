import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group/group.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormControlService } from '../../../../shared/services/form-control.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [ButtonComponent, InputComponent, CommonModule],
  templateUrl: './group-dialog.component.html',
})
export class GroupDialogComponent {
  constructor(
    public groupService: GroupService,
    private formControlService: FormControlService
  ) {}
  @Input() open = signal(false);
  groupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  validationMessages = {
    required: 'This field is required',
    minlength: 'Minimum length is not met',
  };

  getFormControl(controlName: string): FormControl {
    return this.formControlService.getFormControl(this.groupForm, controlName);
  }

  async handleSubmit() {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }

    if (!this.groupService.createLoading()) {
      await this.groupService.handleAddGroup(
        this.groupForm.get('name')?.value as string
      );
      this.open.set(false);
    }
  }

  handleClose() {
    this.open.set(false);
  }
}
