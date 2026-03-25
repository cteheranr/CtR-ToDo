import { Routes } from '@angular/router';
import { Board } from './components/todo/board/board';

export const routes: Routes = [
  { path: '', component: Board },
  { path: '**', redirectTo: '' },
];
