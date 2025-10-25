import { create } from "zustand";
import { SecureCookieStorageAdapter } from "../../util/secure-store";

import { authLogin, validAuth } from "../services/auth/auth-actions";
import type { User } from "../interfaces/entity/User";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  error?: string;
  login: (document: string, password: string) => Promise<boolean | string>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User, msg?: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  error: undefined,

  changeStatus: async (token?: string, user?: User, msg?: string) => {
    if (!user || !token) {
      set({
        status: "unauthenticated",
        token: undefined,
        user: undefined,
        error: msg,
      });
      SecureCookieStorageAdapter.deleteItem("token");

      return false;
    }
    set({ status: "authenticated", token: token, user: user });

    return true;
  },

  login: async (document: string, password: string) => {
    const resp = await authLogin(document, password);

    if (resp?.tokenAccess) {
      SecureCookieStorageAdapter.setItem("STR", resp.tokenAccess);
    }

    return get().changeStatus(resp?.tokenAccess!, resp?.user!, resp);
  },

  logout: async () => {
    SecureCookieStorageAdapter.deleteItem("STR");

    set({ status: "unauthenticated", token: undefined, user: undefined });
    await get().checkStatus();
  },

  checkStatus: async () => {
    const resp = await validAuth();

    const user: User = {
      usuario: resp.usuario,
      nombreCompleto: resp.nombreCompleto,
      IdUser: resp.IdUser,
    };

    if (resp?.tokenAccess) {
      SecureCookieStorageAdapter.setItem("EUR", resp.access);
    }

    get().changeStatus(resp?.tokenAccess!, user, resp);
  },
}));
