export interface RegistrationRequest {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role?: string;
  mfaEnabled?: string;
}