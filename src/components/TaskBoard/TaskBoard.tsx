import { Loader, Message, useToaster } from "rsuite";
import { TaskCard, type Task } from "./TaskCard";

interface TaskBoardProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  loading,
  onEdit,
  onDelete,
}) => {
  const toaster = useToaster();

  if (loading) return <Loader content="Cargando tareas..." center />;

  /* if (tasks.length == 0) {
    toaster.push(<Message type="info">No hay tareas registradas</Message>, {
      placement: "topEnd",
    });
  } */

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {tasks.map((task) => (
        <TaskCard
          key={task.IdTarea}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
