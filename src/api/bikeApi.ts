import api from "./api.ts";
import { CreateBikeDTO, ApiResponse } from "./types/types";
import setAuthHeader from "./get-token.ts";

export const getAllBikes = async (): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get("/api/Bike/GetAll");
  return response.data;
};

export const getBikeById = async (id: number): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get(`/api/Bike/GetById?id=${id}`);
  return response.data;
};

export const addBike = async (
  data: CreateBikeDTO
): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.post("/api/Bike/add", data);
  return response.data;
};

export const updateBike = async (
  id: number,
  data: CreateBikeDTO
): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.put(`/api/Bike/Update?id=${id}`, data);
  return response.data;
};

export const deleteBike = async (id: number): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.delete(`/api/Bike/Delete?id=${id}`);
  return response.data;
};
