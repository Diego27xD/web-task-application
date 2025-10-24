import { AxiosError } from "axios";
import { apiClient } from "../../config/clientApi";
import type { TaskDTO } from "../../interfaces/entity/Task";
import type { CustomResponse } from "../../interfaces/response/CustomResponse";
import type { TaskCreateDTO } from "../../interfaces/entity/create-task";
import type { TaskUpdateDTO } from "../../interfaces/entity/UpdateTask";

export const getTaskById = async (IdTask: number) => {
  try {
    const { data } = await apiClient.get<CustomResponse<TaskUpdateDTO>>(
      `/tasks/${IdTask}`
    );
    return data.body;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data.header.error;
    }
    throw error;
  }
};

export const getAllTasks = async (IdUser: number) => {
  try {
    const { data } = await apiClient.get<CustomResponse<TaskDTO[]>>(
      `/tasks/user/${IdUser}`
    );
    return data.body;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data.header.error;
    }
    throw error;
  }
};

export const createTask = async (dataTask: TaskCreateDTO) => {
  try {
    const { data } = await apiClient.post<CustomResponse<TaskDTO>>(`/tasks`, {
      titulo: dataTask.titulo,
      descripcion: dataTask.descripcion,
      IdUsuario: dataTask.IdUsuario,
      IdCategoria: dataTask.IdCategoria,
      IdPrioridad: dataTask.IdPrioridad,
    });
    return data.body;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data.header.error;
    }
    throw error;
  }
};

export const updateTask = async (IdTask: number, dataTask: TaskCreateDTO) => {
  try {
    const { data } = await apiClient.put<CustomResponse<TaskDTO>>(
      `/tasks/${IdTask}`,
      {
        titulo: dataTask.titulo,
        descripcion: dataTask.descripcion,
        IdUsuario: dataTask.IdUsuario,
        IdCategoria: dataTask.IdCategoria,
        IdPrioridad: dataTask.IdPrioridad,
        IdStatus: dataTask.IdStatus,
      }
    );
    return data.body;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data.header.error;
    }
    throw error;
  }
};

export const deleteTask = async (IdTask: number) => {
  try {
    const { data } = await apiClient.delete<CustomResponse<TaskDTO>>(
      `/tasks/${IdTask}`
    );
    return data.body;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data.header.error;
    }
    throw error;
  }
};
