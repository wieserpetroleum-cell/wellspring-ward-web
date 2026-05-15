import type { Patient } from "@/lib/types";

export const mockPatients: Patient[] = [
  {
    id: "p1",
    uid: "9942-A8-2023",
    name: "Arjun Singh",
    sex: "M",
    age: "45y 4m",
    allergies: ["Penicillin"],
    conditions: ["Type 2 Diabetes"],
  },
];
