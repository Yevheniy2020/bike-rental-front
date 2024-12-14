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
  id: string; //just for render
  description?: string;
  photoUrl?: string;
  pricePerHour: number;
  bikeModelId: number;
  rentingCenterId: number;
}

// Bike Model Types
export interface CreateBikeModelDTO {
  name?: string;
  brandId: number;
}

// Brand Types
export interface CreateBrandDTO {
  name?: string;
  description?: string;
}

// Renting Center Types
export interface CreateRentingCenterDTO {
  latitude: number;
  longitude: number;
}

// Order Types
export interface CreateOrderDTO {
  toPay: number;
  userId: number;
  bikeId: number;
}

// General API Response Wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
