import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  @Input() taskToEdit: Task | null = null;
  @Input() isOpen = false;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: ['media', Validators.required],
      status: ['Pendiente'],
    });
  }

  // Detecta si recibimos una tarea para editar y rellena el formulario
  ngOnChanges() {
    if (this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit);
    } else {
      this.taskForm.reset({ priority: 'media', status: 'Pendiente' });
    }
  }

  submit() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        createdAt: this.taskToEdit ? this.taskToEdit.createdAt : Date.now(),
      };
      this.onSave.emit(taskData);
      this.close();
    }
  }

  close() {
    this.isOpen = false;
    this.onClose.emit();
  }
}
