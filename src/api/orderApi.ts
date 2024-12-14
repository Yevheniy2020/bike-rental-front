import api from "./api.ts";
import { CreateOrderDTO, ApiResponse } from "./types/types";

export const getAllOrders = async (): Promise<ApiResponse<any>> => {
  const response = await api.get("/api/Order/GetAll");
  return response.data;
};

export const getOrderById = async (id: number): Promise<ApiResponse<any>> => {
  const response = await api.get(`/api/Order/GetById?id=${id}`);
  return response.data;
};

export const addOrder = async (
  data: CreateOrderDTO
): Promise<ApiResponse<any>> => {
  const response = await api.post("/api/Order/add", data);
  return response.data;
};

export const updateOrder = async (
  id: number,
  data: CreateOrderDTO
): Promise<ApiResponse<any>> => {
  const response = await api.put(`/api/Order/Update?id=${id}`, data);
  return response.data;
};

export const deleteOrder = async (id: number): Promise<ApiResponse<any>> => {
  const response = await api.delete(`/api/Order/Delete?id=${id}`);
  return response.data;
};
