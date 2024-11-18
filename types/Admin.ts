export type LoginResponse = {
  token: string;
  role: string;
  email: string;
  name: string;
  userId: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
