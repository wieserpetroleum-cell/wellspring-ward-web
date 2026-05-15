import type { User } from "@/lib/types";

export const mockUsers: Array<User & { password: string }> = [
  {
    id: "u_admin",
    name: "Dr. Elena Rossi",
    email: "admin@medicore.os",
    role: "admin",
    title: "System Administrator",
    password: "admin123",
  },
];
