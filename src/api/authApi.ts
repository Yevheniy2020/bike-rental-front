import api from "./api.ts";
import {
  CreateUserDTO,
  LoginUserDTO,
  UserDTO,
  ApiResponse,
} from "./types/types";

import setAuthHeader from "./get-token.ts";

export const register = async (
  data: CreateUserDTO
): Promise<ApiResponse<UserDTO>> => {
  setAuthHeader();
  const response = await api.post<ApiResponse<UserDTO>>(
    "/api/Authentification/register",
    data
  );
  return response.data;
};

export const login = async (
  data: LoginUserDTO
): Promise<ApiResponse<UserDTO>> => {
  setAuthHeader();
  const response = await api.post<ApiResponse<UserDTO>>(
    "/api/Authentification/login",
    data
  );
  return response.data;
};
