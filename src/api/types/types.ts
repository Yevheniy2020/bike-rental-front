// User Types
export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  username: string;
  password: string;
}

export interface UserDTO {
  id: number;
  username: string;
  accessToken: string;
}

// Bike Types
export interface CreateBikeDTO {
  id?: number;
  description?: string;
  photoUrl?: string;
  pricePerHour: number;
  bikeModelId: number;
  rentingCenterId: number;
}

// Bike Model Types
export interface CreateBikeModelDTO {
  id?: number;
  name?: string;
  brandId: number;
}

// Brand Types
export interface CreateBrandDTO {
  id?: number;
  name?: string;
  description?: string;
}

// Renting Center Types
export interface CreateRentingCenterDTO {
  id?: number;
  latitude: number;
  longitude: number;
}

// Order Types
export interface CreateOrderDTO {
  id?: number;
  toPay: number;
  userId: number;
  bikeId: number;
}

// General API Response Wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
