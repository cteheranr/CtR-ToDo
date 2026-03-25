import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../../../services/TaskService';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-board',
  imports: [TaskCard, TaskForm],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {
  private taskService = inject(TaskService);
  tasks: Task[] = [];
  isFormOpen = false;
  selectedTask: Task | null = null;
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  // Filtros reactivos para las columnas
  get todoTasks() {
    return this.tasks.filter((t) => t.status === 'Pendiente');
  }
  get doingTasks() {
    return this.tasks.filter((t) => t.status === 'En proceso');
  }
  get doneTasks() {
    return this.tasks.filter((t) => t.status === 'Completado');
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.cd.detectChanges();
    });
  }

  // Lógica para mover tareas entre estados
  async moveTask(task: Task) {
    let nextStatus: 'Pendiente' | 'En proceso' | 'Completado' = task.status;

    if (task.status === 'Pendiente') nextStatus = 'En proceso';
    else if (task.status === 'En proceso') nextStatus = 'Completado';

    if (task.id) {
      await this.taskService.updateTaskStatus(task.id, nextStatus);
    }
  }

  async deleteTask(id: string) {
    if (confirm('¿Eliminar esta tarea definitivamente?')) {
      await this.taskService.deleteTask(id);
    }
  }

  openCreateForm() {
    this.selectedTask = null; 
    this.isFormOpen = true;
  }

  openEditForm(task: Task) {
    this.selectedTask = task;
    this.isFormOpen = true;
  }

  async saveTask(taskData: Task) {
    if (this.selectedTask?.id) {
      await this.taskService.updateTask(this.selectedTask.id, taskData);
    } else {
      await this.taskService.addTask(taskData);
    }
  }
}
