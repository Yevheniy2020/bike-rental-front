import api from "./api.ts";
import { CreateRentingCenterDTO, ApiResponse } from "./types/types";

export const getAllCenters = async (): Promise<ApiResponse<any>> => {
  const response = await api.get("/api/RentingCenter/GetAll");
  return response.data;
};

export const getCenterById = async (id: number): Promise<ApiResponse<any>> => {
  const response = await api.get(`/api/RentingCenter/GetById?id=${id}`);
  return response.data;
};

export const addCenter = async (
  data: CreateRentingCenterDTO
): Promise<ApiResponse<any>> => {
  const response = await api.post("/api/RentingCenter/add", data);
  return response.data;
};

export const updateCenter = async (
  id: number,
  data: CreateRentingCenterDTO
): Promise<ApiResponse<any>> => {
  const response = await api.put(`/api/RentingCenter/Update?id=${id}`, data);
  return response.data;
};

export const deleteCenter = async (id: number): Promise<ApiResponse<any>> => {
  const response = await api.delete(`/api/RentingCenter/Delete?id=${id}`);
  return response.data;
};
