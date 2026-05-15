export interface DrugMock {
  name: string;
  strength?: string;
  form?: "Tablet" | "Capsule" | "Syrup" | "Injection" | "Drops" | "Ointment" | "Inhaler";
  category?: string;
}

export const mockDrugs: DrugMock[] = [
  { name: "Paracetamol", strength: "500 mg", form: "Tablet", category: "Analgesic" },
  { name: "Paracetamol", strength: "650 mg", form: "Tablet", category: "Analgesic" },
  { name: "Ibuprofen", strength: "400 mg", form: "Tablet", category: "NSAID" },
  { name: "Diclofenac", strength: "50 mg", form: "Tablet", category: "NSAID" },
  { name: "Aspirin", strength: "75 mg", form: "Tablet", category: "Antiplatelet" },
  { name: "Amoxicillin", strength: "500 mg", form: "Capsule", category: "Antibiotic" },
  { name: "Amoxicillin + Clavulanate", strength: "625 mg", form: "Tablet", category: "Antibiotic" },
  { name: "Azithromycin", strength: "500 mg", form: "Tablet", category: "Antibiotic" },
  { name: "Cefixime", strength: "200 mg", form: "Tablet", category: "Antibiotic" },
  { name: "Ciprofloxacin", strength: "500 mg", form: "Tablet", category: "Antibiotic" },
  { name: "Metformin", strength: "500 mg", form: "Tablet", category: "Antidiabetic" },
  { name: "Metformin", strength: "1000 mg", form: "Tablet", category: "Antidiabetic" },
  { name: "Glimepiride", strength: "2 mg", form: "Tablet", category: "Antidiabetic" },
  { name: "Insulin (Regular)", strength: "100 IU/mL", form: "Injection", category: "Antidiabetic" },
  { name: "Amlodipine", strength: "5 mg", form: "Tablet", category: "Antihypertensive" },
  { name: "Telmisartan", strength: "40 mg", form: "Tablet", category: "Antihypertensive" },
  { name: "Losartan", strength: "50 mg", form: "Tablet", category: "Antihypertensive" },
  { name: "Atenolol", strength: "50 mg", form: "Tablet", category: "Beta blocker" },
  { name: "Atorvastatin", strength: "20 mg", form: "Tablet", category: "Statin" },
  { name: "Rosuvastatin", strength: "10 mg", form: "Tablet", category: "Statin" },
  { name: "Pantoprazole", strength: "40 mg", form: "Tablet", category: "PPI" },
  { name: "Omeprazole", strength: "20 mg", form: "Capsule", category: "PPI" },
  { name: "Ranitidine", strength: "150 mg", form: "Tablet", category: "H2 blocker" },
  { name: "Ondansetron", strength: "4 mg", form: "Tablet", category: "Antiemetic" },
  { name: "Cetirizine", strength: "10 mg", form: "Tablet", category: "Antihistamine" },
  { name: "Levocetirizine", strength: "5 mg", form: "Tablet", category: "Antihistamine" },
  { name: "Montelukast", strength: "10 mg", form: "Tablet", category: "Anti-asthmatic" },
  { name: "Salbutamol", strength: "100 mcg", form: "Inhaler", category: "Bronchodilator" },
  { name: "Budesonide", strength: "200 mcg", form: "Inhaler", category: "Inhaled steroid" },
  { name: "Levothyroxine", strength: "50 mcg", form: "Tablet", category: "Thyroid" },
  { name: "Vitamin D3", strength: "60000 IU", form: "Capsule", category: "Supplement" },
  { name: "Folic Acid", strength: "5 mg", form: "Tablet", category: "Supplement" },
];
