import { AxiosError } from "axios";
import { apiClient } from "../../config/clientApi";
import type { AuthResponse } from "../../interfaces/response/AuthResponse";
import type { CustomResponse } from "../../interfaces/response/CustomResponse";

const returnUserLogin = (data: AuthResponse) => {
  const { tokenAccess, ...user } = data;

  return {
    tokenAccess,
    user,
  };
};

export const authLogin = async (usuario: string, password: string) => {
  try {
    const { data } = await apiClient.post<CustomResponse<AuthResponse>>(
      "/user/login",
      {
        usuario,
        password,
      }
    );
    return returnUserLogin(data.body);
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data.header.error;
    }
    throw error;
  }
};

export const authRegister = async (
  usuario: string,
  nombreCompleto: string,
  password: string
) => {
  try {
    const { data } = await apiClient.post<CustomResponse<AuthResponse>>(
      "/user/register",
      {
        usuario,
        nombreCompleto,
        password,
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

export const validAuth = async () => {
  try {
    const { data } = await apiClient.post<CustomResponse<AuthResponse>>(
      "/user/valid-auth",
      {}
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
