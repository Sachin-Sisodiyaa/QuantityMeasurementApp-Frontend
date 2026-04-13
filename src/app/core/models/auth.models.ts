export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  role: string;
  authProvider: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: UserProfile;
}

export interface AuthConfig {
  googleOauthEnabled: boolean;
}

export interface ApiError {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
}
