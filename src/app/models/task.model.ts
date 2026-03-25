export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: 'Pendiente' | 'En proceso' | 'Completado';
  priority: 'baja' | 'media' | 'alta';
  createdAt: number;
}