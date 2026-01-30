import { Header } from '@/app/components/header';
import { Package, Calendar, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Medicine } from '@/app/data/medicines';

interface MyMedicinesScreenProps {
  medicines: Medicine[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onViewDetails: (medicine: Medicine) => void;
}

export function MyMedicinesScreen({
  medicines,
  onBack,
  onRemove,
  onViewDetails
}: MyMedicinesScreenProps) {
  const getDaysUntilExpiry = (expiryDate: string) => {
    return Math.floor(
      (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0) return { color: 'bg-red-500', text: 'Expired', textColor: 'text-red-700' };
    if (days < 30) return { color: 'bg-orange-500', text: `${days}d left`, textColor: 'text-orange-700' };
    if (days < 90) return { color: 'bg-yellow-500', text: `${days}d left`, textColor: 'text-yellow-700' };
    return { color: 'bg-green-500', text: `${days}d left`, textColor: 'text-green-700' };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title="My Medicines" onBack={onBack} />

      <div className="p-6">
        {medicines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="w-24 h-24 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No Saved Medicines</h3>
            <p className="text-gray-400 text-center">
              Verify and save medicines to track them here
            </p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#006400] to-[#228B22] rounded-2xl p-4 text-white shadow-lg">
                <p className="text-sm opacity-90 mb-1">Total Medicines</p>
                <p className="text-3xl font-bold">{medicines.length}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-sm opacity-90 mb-1">Expiring Soon</p>
                <p className="text-3xl font-bold">
                  {medicines.filter(m => getDaysUntilExpiry(m.expiryDate) < 90 && getDaysUntilExpiry(m.expiryDate) > 0).length}
                </p>
              </div>
            </div>

            {/* Medicines List */}
            <AnimatePresence>
              {medicines.map((medicine, index) => {
                const days = getDaysUntilExpiry(medicine.expiryDate);
                const status = getExpiryStatus(days);

                return (
                  <motion.div
                    key={medicine.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-4 mb-4 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#90EE90] rounded-xl">
                        <Package className="w-6 h-6 text-[#006400]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <button
                            onClick={() => onViewDetails(medicine)}
                            className="text-left flex-1"
                          >
                            <h3 className="font-bold text-gray-900 mb-0.5">{medicine.name}</h3>
                            <p className="text-sm text-gray-500 font-mono">{medicine.batchNumber}</p>
                          </button>
                          <button
                            onClick={() => onRemove(medicine.id)}
                            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg active:scale-95"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className={`w-4 h-4 ${status.textColor}`} />
                          <span className={`${status.textColor} font-medium`}>
                            Expires {new Date(medicine.expiryDate).toLocaleDateString('en-GB')}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span className={`${status.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {status.text}
                          </span>
                          {days < 30 && days > 0 && (
                            <div className="flex items-center gap-1 text-orange-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs font-semibold">Action needed</span>
                            </div>
                          )}
                          {days < 0 && (
                            <div className="flex items-center gap-1 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs font-semibold">Do not use</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Info Card */}
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <span className="font-bold">Tip:</span> Set reminders to check your medicines regularly. Dispose of expired medicines properly at authorized collection points.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
