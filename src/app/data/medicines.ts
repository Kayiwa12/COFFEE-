// Demo database of medicines for verification
export interface Medicine {
  id: string;
  name: string;
  batchNumber: string;
  qrCode: string;
  manufacturer: string;
  expiryDate: string;
  dosage: string;
  isAuthentic: boolean;
  sideEffects: string[];
  price: string;
}

export const medicinesDatabase: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    batchNumber: 'PCT2024001',
    qrCode: 'QR-PCT2024001',
    manufacturer: 'Quality Pharma Ltd',
    expiryDate: '2026-12-31',
    dosage: 'Take 1-2 tablets every 6 hours',
    isAuthentic: true,
    sideEffects: ['Nausea', 'Skin rash (rare)'],
    price: 'UGX 2,000'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    batchNumber: 'AMX2024002',
    qrCode: 'QR-AMX2024002',
    manufacturer: 'MediCare Uganda',
    expiryDate: '2027-03-15',
    dosage: 'Take 1 capsule 3 times daily',
    isAuthentic: true,
    sideEffects: ['Diarrhea', 'Stomach upset', 'Allergic reactions'],
    price: 'UGX 15,000'
  },
  {
    id: '3',
    name: 'Artemether-Lumefantrine',
    batchNumber: 'ALU2024003',
    qrCode: 'QR-ALU2024003',
    manufacturer: 'Uganda Pharma',
    expiryDate: '2026-08-20',
    dosage: 'Take 4 tablets initially, then 4 tablets after 8, 24, 36, 48 and 60 hours',
    isAuthentic: true,
    sideEffects: ['Headache', 'Dizziness', 'Loss of appetite'],
    price: 'UGX 12,000'
  },
  {
    id: '4',
    name: 'Ciprofloxacin 500mg',
    batchNumber: 'CIP2024004',
    qrCode: 'QR-CIP2024004',
    manufacturer: 'East African Meds',
    expiryDate: '2027-01-10',
    dosage: 'Take 1 tablet twice daily',
    isAuthentic: true,
    sideEffects: ['Nausea', 'Tendon pain', 'Sun sensitivity'],
    price: 'UGX 18,000'
  },
  {
    id: '5',
    name: 'Fake Paracetamol',
    batchNumber: 'FAKE001',
    qrCode: 'QR-FAKE001',
    manufacturer: 'Unknown Source',
    expiryDate: '2025-06-30',
    dosage: 'Unknown',
    isAuthentic: false,
    sideEffects: ['Potentially dangerous - DO NOT USE'],
    price: 'N/A'
  },
  {
    id: '6',
    name: 'Metformin 500mg',
    batchNumber: 'MET2024006',
    qrCode: 'QR-MET2024006',
    manufacturer: 'Quality Pharma Ltd',
    expiryDate: '2026-11-25',
    dosage: 'Take 1 tablet twice daily with meals',
    isAuthentic: true,
    sideEffects: ['Stomach upset', 'Diarrhea', 'Metallic taste'],
    price: 'UGX 8,000'
  },
  {
    id: '7',
    name: 'Diclofenac 50mg',
    batchNumber: 'DIC2024007',
    qrCode: 'QR-DIC2024007',
    manufacturer: 'MediCare Uganda',
    expiryDate: '2026-02-14',
    dosage: 'Take 1 tablet 2-3 times daily after meals',
    isAuthentic: true,
    sideEffects: ['Stomach pain', 'Heartburn', 'Dizziness'],
    price: 'UGX 5,000'
  },
  {
    id: '8',
    name: 'Omeprazole 20mg',
    batchNumber: 'OME2024008',
    qrCode: 'QR-OME2024008',
    manufacturer: 'Uganda Pharma',
    expiryDate: '2027-05-30',
    dosage: 'Take 1 capsule once daily before breakfast',
    isAuthentic: true,
    sideEffects: ['Headache', 'Diarrhea', 'Abdominal pain'],
    price: 'UGX 10,000'
  },
  {
    id: '9',
    name: 'Ibuprofen 400mg',
    batchNumber: 'IBU2024009',
    qrCode: 'QR-IBU2024009',
    manufacturer: 'East African Meds',
    expiryDate: '2026-09-18',
    dosage: 'Take 1 tablet every 6-8 hours with food',
    isAuthentic: true,
    sideEffects: ['Nausea', 'Heartburn', 'Dizziness'],
    price: 'UGX 3,500'
  },
  {
    id: '10',
    name: 'Fake Antimalarial',
    batchNumber: 'FAKE002',
    qrCode: 'QR-FAKE002',
    manufacturer: 'Suspicious Supplier',
    expiryDate: '2024-12-01',
    dosage: 'Unknown',
    isAuthentic: false,
    sideEffects: ['Life-threatening - DO NOT USE'],
    price: 'N/A'
  }
];

export const searchMedicineByBatch = (batchNumber: string): Medicine | null => {
  return medicinesDatabase.find(
    med => med.batchNumber.toLowerCase() === batchNumber.toLowerCase()
  ) || null;
};

export const searchMedicineByQR = (qrCode: string): Medicine | null => {
  return medicinesDatabase.find(
    med => med.qrCode.toLowerCase() === qrCode.toLowerCase()
  ) || null;
};
