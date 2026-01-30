import { useState } from 'react';
import { BottomNav } from '@/app/components/bottom-nav';
import { HomeScreen } from '@/app/screens/home';
import { ScanScreen } from '@/app/screens/scan';
import { BatchEntryScreen } from '@/app/screens/batch-entry';
import { MedicineResultScreen } from '@/app/screens/medicine-result';
import { MyMedicinesScreen } from '@/app/screens/my-medicines';
import { EducationScreen } from '@/app/screens/education';
import { PharmacyCheckScreen } from '@/app/screens/pharmacy-check';
import { SMSVerifyScreen } from '@/app/screens/sms-verify';
import { InviteScreen } from '@/app/screens/invite';
import { ProfileScreen } from '@/app/screens/profile';
import { Medicine } from '@/app/data/medicines';
import { toast, Toaster } from 'sonner';

type Screen =
  | 'home'
  | 'scan'
  | 'batch-entry'
  | 'medicine-result'
  | 'my-medicines'
  | 'education'
  | 'pharmacy-check'
  | 'sms-verify'
  | 'invite'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [savedMedicines, setSavedMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const handleHomeAction = (action: string) => {
    const screenMap: Record<string, Screen> = {
      'qr-scan': 'scan',
      'batch-entry': 'batch-entry',
      'my-medicines': 'my-medicines',
      'education': 'education',
      'pharmacy-check': 'pharmacy-check',
      'sms-verify': 'sms-verify',
      'invite': 'invite'
    };

    const screen = screenMap[action];
    if (screen) {
      setCurrentScreen(screen);
    }
  };

  const handleMedicineFound = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setCurrentScreen('medicine-result');

    if (medicine.isAuthentic) {
      toast.success('Medicine verified successfully!');
    } else {
      toast.error('WARNING: Unverified medicine detected!');
    }
  };

  const handleSaveMedicine = (medicine: Medicine) => {
    if (!savedMedicines.find(m => m.id === medicine.id)) {
      setSavedMedicines([...savedMedicines, medicine]);
      toast.success(`${medicine.name} saved to your list`);
    } else {
      toast.info('Medicine already in your list');
    }
  };

  const handleRemoveMedicine = (id: string) => {
    setSavedMedicines(savedMedicines.filter(m => m.id !== id));
    toast.success('Medicine removed from your list');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-white overflow-hidden flex flex-col">
      <Toaster position="top-center" richColors />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {currentScreen === 'home' && (
          <HomeScreen onAction={handleHomeAction} />
        )}

        {currentScreen === 'scan' && (
          <ScanScreen
            onBack={handleBack}
            onMedicineFound={handleMedicineFound}
          />
        )}

        {currentScreen === 'batch-entry' && (
          <BatchEntryScreen
            onBack={handleBack}
            onMedicineFound={handleMedicineFound}
          />
        )}

        {currentScreen === 'medicine-result' && selectedMedicine && (
          <MedicineResultScreen
            medicine={selectedMedicine}
            onBack={handleBack}
            onSave={handleSaveMedicine}
          />
        )}

        {currentScreen === 'my-medicines' && (
          <MyMedicinesScreen
            medicines={savedMedicines}
            onBack={handleBack}
            onRemove={handleRemoveMedicine}
            onViewDetails={(medicine) => {
              setSelectedMedicine(medicine);
              setCurrentScreen('medicine-result');
            }}
          />
        )}

        {currentScreen === 'education' && (
          <EducationScreen onBack={handleBack} />
        )}

        {currentScreen === 'pharmacy-check' && (
          <PharmacyCheckScreen onBack={handleBack} />
        )}

        {currentScreen === 'sms-verify' && (
          <SMSVerifyScreen onBack={handleBack} />
        )}

        {currentScreen === 'invite' && (
          <InviteScreen onBack={handleBack} />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onBack={handleBack}
            savedMedicinesCount={savedMedicines.length}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
