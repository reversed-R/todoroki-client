import type { components } from "@/schema";
import type { IFormInput } from "./form";

export type User = components["schemas"]["UserResponse"];

export type UserRole = components["schemas"]["UserRoleResponse"];

export interface IUserFormInput extends IFormInput {
  name: string;
}

export function isStrongerThanOrEqualsTo(
  r1: UserRole | null,
  r2: UserRole,
): boolean {
  switch (r1) {
    case "owner":
      return true;
    case "contributor":
      return r2 === "contributor";
    case null:
      return false;
  }
}
