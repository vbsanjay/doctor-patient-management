import React, { FC, useState } from "react";
import { AuthService } from "../auth";
import { ApiRoutes } from "../routes/routePaths";
import { UserDto } from "../endpoints";

export interface UserContextProviderProps {
  user: UserDto | undefined;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  resendConfirmation: (email: string) => Promise<Response>;
}

export const UserContext = React.createContext<UserContextProviderProps>(
  {} as UserContextProviderProps
);

const UserContextProvider: FC = (props): JSX.Element => {
  const [user, setUser] = useState<UserDto | undefined>(undefined);

  const logIn = async (email: string, password: string): Promise<void> => {
    const response = await fetch(ApiRoutes.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      return Promise.reject(response);
    }
    const user = await response.json();
    setUser(user);
    return Promise.resolve();
  };

  const logOut = (): void => {
    if (AuthService.isLogged()) {
      AuthService.logout();
      setUser(undefined);
    }
    console.warn("logout() called yet user is not logged in");
  };

  const resendConfirmation = async (email: string): Promise<Response> => {
    return await fetch(ApiRoutes.RESEND_CONFIRMATION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logIn,
        logOut,
        resendConfirmation,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
