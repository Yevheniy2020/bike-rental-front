import api from "./api.ts";
import { CreateBrandDTO, ApiResponse } from "./types/types";
import setAuthHeader from "./get-token.ts";

export const getAllBrands = async (): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get("/api/Brand/GetAll");
  return response.data;
};

export const getBrandById = async (id: number): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.get(`/api/Brand/GetById?id=${id}`);
  return response.data;
};

export const addBrand = async (
  data: CreateBrandDTO
): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.post("/api/Brand/add", data);
  return response.data;
};

export const updateBrand = async (
  id: number,
  data: CreateBrandDTO
): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.put(`/api/Brand/Update?id=${id}`, data);
  return response.data;
};

export const deleteBrand = async (id: number): Promise<ApiResponse<any>> => {
  setAuthHeader();
  const response = await api.delete(`/api/Brand/Delete?id=${id}`);
  return response.data;
};
