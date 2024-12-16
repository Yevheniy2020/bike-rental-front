import api from "./api.ts";
import { CreateOrderDTO, ApiResponse } from "./types/types";
import setAuthHeader from "./get-token.ts";

export const getAllOrders = async (): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get("/api/Order/GetAll");
  return response.data;
};

export const getOrderById = async (id: number): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get(`/api/Order/GetById?id=${id}`);
  return response.data;
};

export const getOrdersByBikeId = async (
  bikeId: number
): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get(`/api/Order/GetByBikeId?bikeId=${bikeId}`);
  return response.data;
};

export const getMyOrders = async (): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get("/api/Order/GetMyOrders");
  return response.data;
};

export const addOrder = async (
  data: CreateOrderDTO
): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.post("/api/Order/add", data);
  return response.data;
};

export const updateOrder = async (
  id: number,
  data: CreateOrderDTO
): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.put(`/api/Order/Update?id=${id}`, data);
  return response.data;
};

export const deleteOrder = async (id: number): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.delete(`/api/Order/Delete?id=${id}`);
  return response.data;
};
