export interface TaskUpdateDTO {
  IdTarea: number;
  descripcion: string;
  fechaTermino: string;
  fechaCreacion: string;
  titulo: string;
  nombreUsuario: string;
  estatus: string;
  nombreCategoria: string;
  prioridad: string;
  IdCategoria: number;
  IdPrioridad: number;
  IdStatus: number;
}
