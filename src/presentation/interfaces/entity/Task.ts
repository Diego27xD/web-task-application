export interface TaskDTO {
  IdTarea: number;
  titulo: string;
  descripcion: string;
  fechaTermino: string;
  fechaCreacion: Date;
  nombreUsuario: string;
  nombreCategoria: string;
  estatus: string;
  prioridad: string;

  IdCategoria?: number;
  IdStatus?: number;
  IdPrioridad?: number;
}
