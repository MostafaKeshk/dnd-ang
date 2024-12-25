import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task/task.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormControlService } from '../../../../shared/services/form-control.service';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../services/task/task-status';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [ButtonComponent, InputComponent, CommonModule, SelectComponent],
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent {
  constructor(
    public taskService: TaskService,
    private groupService: GroupService,
    private formControlService: FormControlService
  ) {}

  @Input() open = signal(false);

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    status: new FormControl('', [Validators.required]),
  });

  validationMessages = {
    required: 'This field is required',
    minlength: 'Minimum length is not met',
  };

  TaskStatus = TaskStatus;

  getFormControl(controlName: string): FormControl {
    return this.formControlService.getFormControl(this.taskForm, controlName);
  }

  async handleSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (!this.taskService.createLoading()) {
      await this.taskService.handleAddTask({
        name: this.taskForm.get('name')?.value as string,
        description: this.taskForm.get('description')?.value as string,
        status: this.taskForm.get('status')?.value as TaskStatus,
        groupId: this.groupService.selectedGroup() as string,
      });
      this.open.set(false);
    }
  }

  handleClose() {
    this.open.set(false);
  }
}
