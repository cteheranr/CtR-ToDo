// src/app/services/task.service.ts
import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private firestore : Firestore = inject(Firestore);

  getTasks(): Observable<Task[]> {
    const taskRef = collection(this.firestore, 'tasks');
    const q = query(taskRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Task) {
    const taskRef = collection(this.firestore, 'tasks');
    return addDoc(taskRef, task);
  }

  updateTaskStatus(taskId: string, newStatus: string) {
    const docRef = doc(this.firestore, `tasks/${taskId}`);
    return updateDoc(docRef, { status: newStatus });
  }

  updateTask(taskId: string, task: Task){
    const docRef = doc(this.firestore, `tasks/${taskId}`);
    return updateDoc(docRef, { ...task });
  }

  // Eliminar tarea
  deleteTask(taskId: string) {
    const docRef = doc(this.firestore, `tasks/${taskId}`);
    return deleteDoc(docRef);
  }
}