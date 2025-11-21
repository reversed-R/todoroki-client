import { useAuth } from "@/context/auth";
import { isStrongerThanOrEqualsTo, type UserRole } from "@/types/user";
import type { ReactNode } from "react";

export function UserRoleGuard({
  role,
  children,
}: {
  role?: UserRole;
  children: ReactNode;
}) {
  const { userRole } = useAuth();

  return isStrongerThanOrEqualsTo(userRole, role ? role : "owner") ? (
    <>{children}</>
  ) : (
    <></>
  );
}
