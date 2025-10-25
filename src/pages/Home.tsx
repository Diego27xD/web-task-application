import { useEffect, useState } from "react";
import { Message, useToaster, Loader } from "rsuite";
import { HeaderBar } from "../components/HeaderBar";
import { TaskBoard } from "../components/TaskBoard/TaskBoard";
import { TaskModal } from "../components/TaskBoard/TaskModal";

import { useFetch } from "../presentation/hooks/useFetch";
import { useAuthStore } from "../presentation/store/useAuthStore";
import type { Task } from "../components/TaskBoard/TaskCard";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../presentation/services/task/task-actions";
import type { CategoryDTO } from "../presentation/interfaces/entity/Category";
import type { PriorityDTO } from "../presentation/interfaces/entity/Priority";
import type { StatusDTO } from "../presentation/interfaces/entity/Status";
import { useNavigate } from "react-router-dom";
import type { TaskUpdateDTO } from "../presentation/interfaces/entity/UpdateTask";

const HomePage = () => {
  const toaster = useToaster();
  const authStore = useAuthStore();
  const user = authStore.user;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formValue, setFormValue] = useState<Task>({
    IdTarea: 0,
    titulo: "",
    descripcion: "",
    IdCategoria: 0,
    IdPrioridad: 0,
    IdStatus: 1,
    estatus: "",
    fechaCreacion: new Date(),
    fechaTermino: "",
    nombreCategoria: "",
    nombreUsuario: "",
    prioridad: "",
  });
  const nextTo = useNavigate();
  const resultCategory = useFetch<CategoryDTO[]>(`/category`);
  const resultPriority = useFetch<PriorityDTO[]>(`/priority`);
  const resultStatus = useFetch<StatusDTO[]>(`/status`);

  const getTasks = async () => {
    try {
      setLoading(true);
      const result = await getAllTasks(user?.IdUser!);
      setTasks(result);
    } catch (error) {
      toaster.push(<Message type="error">Error al cargar las tareas</Message>, {
        placement: "topEnd",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  const handleCreateTask = async (task: Task) => {
    try {
      setLoading(true);
      const result = await createTask({
        titulo: task.titulo,
        descripcion: task.descripcion,
        IdUsuario: user?.IdUser!,
        IdCategoria: task.IdCategoria!,
        IdPrioridad: task.IdPrioridad!,
        IdStatus: task.IdStatus!,
      });
      setTasks((prev) => [result, ...prev]);
      toaster.push(<Message type="success">Tarea creada</Message>, {
        placement: "topEnd",
      });
    } catch {
      toaster.push(<Message type="error">Error al crear tarea</Message>, {
        placement: "topEnd",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      setLoading(true);
      const taskData: TaskUpdateDTO = await getTaskById(task.IdTarea);

      setEditingTask(task);
      setFormValue({
        IdTarea: taskData.IdTarea,
        titulo: taskData.titulo,
        descripcion: taskData.descripcion,
        IdCategoria: taskData.IdCategoria,
        IdPrioridad: taskData.IdPrioridad,
        IdStatus: taskData.IdStatus,
        estatus: taskData.estatus,
        fechaCreacion: new Date(taskData.fechaCreacion!),
        fechaTermino: taskData.fechaTermino,
        nombreCategoria: taskData.nombreCategoria,
        nombreUsuario: taskData.nombreUsuario,
        prioridad: taskData.prioridad,
      });
      setOpen(true);
    } catch {
      toaster.push(<Message type="error">Error al cargar tarea</Message>, {
        placement: "topEnd",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      setLoading(true);
      const result = await updateTask(task.IdTarea, {
        titulo: task.titulo,
        descripcion: task.descripcion,
        IdUsuario: user?.IdUser!,
        IdCategoria: task.IdCategoria!,
        IdPrioridad: task.IdPrioridad!,
        IdStatus: task.IdStatus!,
      });
      setTasks((prev) =>
        prev.map((t) => (t.IdTarea === result.IdTarea ? result : t))
      );
      toaster.push(<Message type="success">Tarea actualizada</Message>, {
        placement: "topEnd",
      });
    } catch {
      toaster.push(<Message type="error">Error al actualizar tarea</Message>, {
        placement: "topEnd",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setLoading(true);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.IdTarea !== id));
      toaster.push(<Message type="info">Tarea eliminada</Message>, {
        placement: "topEnd",
      });
    } catch {
      toaster.push(<Message type="error">Error al eliminar tarea</Message>, {
        placement: "topEnd",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setFormValue({
      IdTarea: 0,
      titulo: "",
      descripcion: "",
      IdCategoria: 0,
      IdPrioridad: 0,
      IdStatus: 1,
      estatus: "",
      fechaCreacion: new Date(),
      fechaTermino: "",
      nombreCategoria: "",
      nombreUsuario: "",
      prioridad: "",
    });
    setOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) handleUpdateTask(task);
    else handleCreateTask(task);
  };

  const handleLogout = async () => {
    toaster.push(<Message type="info">Sesión cerrada</Message>, {
      placement: "topEnd",
    });
    await authStore.logout();
    nextTo("/");
  };

  return (
    <div style={{ padding: 20, background: "#f8f8f8", minHeight: "100vh" }}>
      <HeaderBar
        userName={user?.nombreCompleto!}
        onAddTask={handleAddTask}
        onLogout={handleLogout}
      />

      {loading ? (
        <Loader content="Cargando..." center />
      ) : (
        <TaskBoard
          tasks={tasks}
          loading={false}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}

      <TaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSaveTask}
        formValue={formValue}
        setFormValue={setFormValue}
        categories={
          resultCategory.result?.map((item) => {
            return {
              label: item.descripcion,
              value: item.IdCategoria,
            };
          })!
        }
        priorities={
          resultPriority.result?.map((item) => {
            return {
              label: item.descripcion,
              value: item.IdPrioridad,
            };
          })!
        }
        statuses={
          resultStatus.result?.map((item) => {
            return {
              label: item.descripcion,
              value: item.IdEstado,
            };
          })!
        }
        editing={!!editingTask}
      />
    </div>
  );
};

export default HomePage;
