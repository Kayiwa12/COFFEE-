// Demo database of pharmacies
export interface Pharmacy {
  id: string;
  name: string;
  location: string;
  verified: boolean;
  license: string;
  phone: string;
}

export const pharmaciesDatabase: Pharmacy[] = [
  {
    id: '1',
    name: 'Care Pharmacy',
    location: 'Kampala Central, Kampala Road',
    verified: true,
    license: 'NDA-KLA-2024-001',
    phone: '+256 700 123 456'
  },
  {
    id: '2',
    name: 'HealthPlus Pharmacy',
    location: 'Entebbe, Victoria Mall',
    verified: true,
    license: 'NDA-ENT-2024-002',
    phone: '+256 700 234 567'
  },
  {
    id: '3',
    name: 'Community Drug Shop',
    location: 'Jinja, Main Street',
    verified: true,
    license: 'NDA-JIN-2024-003',
    phone: '+256 700 345 678'
  },
  {
    id: '4',
    name: 'Quick Meds',
    location: 'Mbarara, High Street',
    verified: false,
    license: 'UNVERIFIED',
    phone: '+256 700 456 789'
  },
  {
    id: '5',
    name: 'Wellness Pharmacy',
    location: 'Gulu, Shopping Center',
    verified: true,
    license: 'NDA-GUL-2024-005',
    phone: '+256 700 567 890'
  },
  {
    id: '6',
    name: 'Discount Drugs',
    location: 'Kampala, Wandegeya',
    verified: false,
    license: 'EXPIRED',
    phone: '+256 700 678 901'
  },
  {
    id: '7',
    name: 'MediCare Center',
    location: 'Fort Portal, Market Street',
    verified: true,
    license: 'NDA-FTP-2024-007',
    phone: '+256 700 789 012'
  },
  {
    id: '8',
    name: 'Trusted Pharmacy',
    location: 'Mbale, Republic Street',
    verified: true,
    license: 'NDA-MBA-2024-008',
    phone: '+256 700 890 123'
  }
];

export const searchPharmacies = (query: string): Pharmacy[] => {
  if (!query) return pharmaciesDatabase;
  
  const lowerQuery = query.toLowerCase();
  return pharmaciesDatabase.filter(
    pharmacy =>
      pharmacy.name.toLowerCase().includes(lowerQuery) ||
      pharmacy.location.toLowerCase().includes(lowerQuery)
  );
};
