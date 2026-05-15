import type { Appointment } from "@/lib/types";

const today = new Date().toISOString().slice(0, 10);
const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

export const mockAppointments: Appointment[] = [
  { id: "a1", patientId: "p1", patientUid: "MR-2025-00001", patientName: "Arjun Singh", doctor: "Dr. Mehta", department: "Cardiology", room: "C-204", time: "09:00", date: today, status: "completed", type: "Follow-up", complaint: "Routine BP review" },
  { id: "a2", patientId: "p2", patientUid: "MR-2025-00002", patientName: "Meera Iyer", doctor: "Dr. Mehta", department: "Cardiology", room: "C-204", time: "09:30", date: today, status: "in-consultation", type: "OPD", complaint: "Palpitations on exertion" },
  { id: "a3", patientId: "p3", patientUid: "MR-2025-00003", patientName: "Rahul Verma", doctor: "Dr. Iyer", department: "General Medicine", room: "G-101", time: "10:00", date: today, status: "checked-in", type: "OPD", complaint: "Chest discomfort, 2 days" },
  { id: "a4", patientId: "p4", patientUid: "MR-2025-00004", patientName: "Anaya Khan", doctor: "Dr. Iyer", department: "General Medicine", room: "G-101", time: "10:15", date: today, status: "checked-in", type: "Walk-in", complaint: "Sore throat & fever" },
  { id: "a5", patientId: "p5", patientUid: "MR-2025-00005", patientName: "Suresh Kumar", doctor: "Dr. Khan", department: "Orthopedics", room: "O-302", time: "10:45", date: today, status: "scheduled", type: "OPD", complaint: "Knee pain" },
  { id: "a6", patientId: "p6", patientUid: "MR-2025-00006", patientName: "Pooja Desai", doctor: "Dr. Mehta", department: "Cardiology", room: "C-204", time: "11:00", date: today, status: "scheduled", type: "OPD", complaint: "Asthma follow-up" },
  { id: "a7", patientId: "p7", patientUid: "MR-2025-00007", patientName: "Vikram Rao", doctor: "Dr. Khan", department: "Orthopedics", room: "O-302", time: "11:30", date: today, status: "scheduled", type: "Follow-up", complaint: "Post-op review" },
  { id: "a8", patientId: "p8", patientUid: "MR-2025-00008", patientName: "Fatima Sheikh", doctor: "Dr. Iyer", department: "General Medicine", room: "G-101", time: "12:00", date: today, status: "scheduled", type: "OPD", complaint: "Allergy flare" },
  { id: "a9", patientId: "p9", patientUid: "MR-2025-00009", patientName: "Karan Malhotra", doctor: "Dr. Iyer", department: "General Medicine", room: "G-101", time: "14:30", date: today, status: "scheduled", type: "OPD", complaint: "Cough, 3 days" },
  { id: "a10", patientId: "p10", patientUid: "MR-2025-00010", patientName: "Lakshmi Nair", doctor: "Dr. Khan", department: "Orthopedics", room: "O-302", time: "15:00", date: today, status: "scheduled", type: "Follow-up", complaint: "Joint pain review" },
  { id: "a11", patientId: "p12", patientUid: "MR-2025-00012", patientName: "Ritu Banerjee", doctor: "Dr. Mehta", department: "Cardiology", room: "C-204", time: "09:30", date: yest, status: "completed", type: "OPD", complaint: "Headache" },
];
