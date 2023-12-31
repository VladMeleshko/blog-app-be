export type JwtConfigurations = {
  jwtKey: string;
};

export type JWTShape = {
  email: string;
  iat: number;
  exp: number;
};

export type LoginResponse = {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};
