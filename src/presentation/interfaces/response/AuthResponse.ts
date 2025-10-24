import type { User } from "../entity/User";

export type AuthResponse = User & { tokenAccess: string };
