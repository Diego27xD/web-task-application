import { IconButton } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";

export interface Task {
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

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      key={task.IdTarea}
      style={{
        width: "220px",
        height: "220px",
        background: "#fff8c6",
        borderRadius: "8px",
        padding: "15px",
        boxShadow: "3px 3px 6px rgba(0,0,0,0.2)",
        transform: `rotate(${Math.random() * 6 - 3}deg)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderTop: "40px solid #fff2a8",
          borderLeft: "40px solid transparent",
        }}
      />
      <h5 style={{ marginTop: 10 }}>{task.titulo}</h5>
      <p style={{ fontSize: "0.85rem", color: "#333", marginBottom: 8 }}>
        {task.descripcion}
      </p>

      <div style={{ fontSize: "0.75rem", color: "#555", lineHeight: "1.3" }}>
        <div>
          <strong>Estado:</strong> {task.estatus}
        </div>
        <div>
          <strong>Prioridad:</strong> {task.prioridad}
        </div>
        <div>
          <strong>Categoría:</strong> {task.nombreCategoria}
        </div>
        <div>
          <strong>Usuario:</strong> {task.nombreUsuario}
        </div>
        <div>
          <strong>Creado:</strong>{" "}
          {new Date(task.fechaCreacion).toLocaleDateString()}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          display: "flex",
          gap: 5,
        }}
      >
        <IconButton
          size="sm"
          appearance="primary"
          icon={<EditIcon />}
          onClick={() => onEdit(task)}
        />
        <IconButton
          size="sm"
          appearance="subtle"
          icon={<TrashIcon />}
          onClick={() => onDelete(task.IdTarea)}
        />
      </div>
    </div>
  );
};
