export type Role = "admin" | "doctor" | "receptionist" | "nurse" | "lab" | "pharmacy";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  title?: string;
}

export interface Patient {
  id: string;
  uid: string;
  name: string;
  sex: "M" | "F" | "O";
  age: string;
  allergies: string[];
  conditions: string[];
}
