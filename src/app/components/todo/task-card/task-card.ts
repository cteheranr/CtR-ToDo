import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;

  // Emite eventos al padre para que Firebase haga el trabajo sucio
  @Output() onMove = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<Task>();

  // Determina el texto del botón según el flujo: Pendiente -> En Ejecución -> Finalizada
  get nextStepLabel(): string {
    if (this.task.status === 'Pendiente') return 'Empezar';
    if (this.task.status === 'En proceso') return 'Terminar';
    return '';
  }
}
