import { BAD_REQUEST, CONFLICT, OK } from "http-status-codes";
import { RegisterDuplicateUserFound } from "../exception/RegisterDuplicateUserFound";
import { ApiRoutes } from "../routes/routePaths";
import { RegisterWrongPayload } from "../exception/RegisterWrongPayload";
import { UserDto } from "../endpoints";

interface LoginResponseErrorApi {
  message: string;
}

const login = (email, password): Promise<UserDto> => {
  return fetch(ApiRoutes.LOGIN, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      return Promise.resolve((res as unknown) as UserDto);
    })
    .catch((error: LoginResponseErrorApi) => {
      return Promise.reject(error);
    });
};

const register = async (data): Promise<void> => {
  const response = await fetch(ApiRoutes.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  });
  if (response.status === OK) {
    return Promise.resolve();
  }
  if (response.status === BAD_REQUEST) {
    return Promise.reject(new RegisterWrongPayload());
  }
  if (response.status == CONFLICT) {
    return Promise.reject(new RegisterDuplicateUserFound());
  }
  return Promise.reject(new Error("Registration failed"));
};

const logout = async (): Promise<void> => {
  await fetch(ApiRoutes.LOGOUT, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  window.location.reload();
};

const isLogged = async (): Promise<boolean> => {
  const response = await fetch(ApiRoutes.IS_LOGGED, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.status === OK;
};

const activate = async (token: string): Promise<void> => {
  const response = await fetch(ApiRoutes.ACTIVATE(token), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === OK) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

const AuthService = {
  register,
  login,
  logout,
  isLogged,
  activate,
};

export default AuthService;
