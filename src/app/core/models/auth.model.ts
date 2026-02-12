// ========================================
// src/app/core/models/auth.model.ts
// ========================================
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}