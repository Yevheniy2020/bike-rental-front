import api from "./api.ts";
import { CreateBikeModelDTO, ApiResponse } from "./types/types";

export const getAllModels = async (): Promise<ApiResponse<any>> => {
  const response = await api.get("/api/BikeModel/GetAll");
  return response.data;
};

export const getModelById = async (id: number): Promise<ApiResponse<any>> => {
  const response = await api.get(`/api/BikeModel/GetById?id=${id}`);
  return response.data;
};

export const addModel = async (
  data: CreateBikeModelDTO
): Promise<ApiResponse<any>> => {
  const response = await api.post("/api/BikeModel/add", data);
  return response.data;
};

export const updateModel = async (
  id: number,
  data: CreateBikeModelDTO
): Promise<ApiResponse<any>> => {
  const response = await api.put(`/api/BikeModel/Update?id=${id}`, data);
  return response.data;
};

export const deleteModel = async (id: number): Promise<ApiResponse<any>> => {
  const response = await api.delete(`/api/BikeModel/Delete?id=${id}`);
  return response.data;
};
