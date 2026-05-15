import { z } from "zod";

export const consultationSchema = z.object({
  vitals: z.object({
    bp: z.string().optional(),
    pulse: z.number().optional(),
    temp: z.number().optional(),
    spo2: z.number().optional(),
    respRate: z.number().optional(),
    weight: z.number().optional(),
    height: z.number().optional(),
    bmi: z.number().optional(),
  }),
  chiefComplaints: z.array(z.string()).min(1, "At least one complaint required"),
  hpi: z.string().optional(),
  duration: z.string().optional(),
  examGeneral: z.string().optional(),
  examCvs: z.string().optional(),
  examRs: z.string().optional(),
  examAbdomen: z.string().optional(),
  examCns: z.string().optional(),
  diagnoses: z
    .array(
      z.object({
        code: z.string(),
        text: z.string(),
        primary: z.boolean().optional(),
      }),
    )
    .min(1, "Add at least one diagnosis"),
  rx: z.array(
    z.object({
      id: z.string(),
      drug: z.string().min(1),
      strength: z.string().optional(),
      form: z.string().optional(),
      dose: z.string().optional(),
      frequency: z.string().optional(),
      duration: z.string().optional(),
      route: z.string().optional(),
      instructions: z.string().optional(),
    }),
  ),
  advice: z.string().optional(),
  followUpDays: z.number().optional(),
  labOrders: z.string().optional(),
});
