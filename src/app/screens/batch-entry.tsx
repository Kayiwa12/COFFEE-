import { useState } from 'react';
import { Header } from '@/app/components/header';
import { Hash, Search, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Medicine, searchMedicineByBatch } from '@/app/data/medicines';

interface BatchEntryScreenProps {
  onBack: () => void;
  onMedicineFound: (medicine: Medicine) => void;
}

export function BatchEntryScreen({ onBack, onMedicineFound }: BatchEntryScreenProps) {
  const [batchNumber, setBatchNumber] = useState('');
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!batchNumber.trim()) return;

    setSearching(true);
    setNotFound(false);

    // Simulate search
    setTimeout(() => {
      const medicine = searchMedicineByBatch(batchNumber);
      setSearching(false);

      if (medicine) {
        onMedicineFound(medicine);
      } else {
        setNotFound(true);
      }
    }, 1000);
  };

  const suggestedBatches = [
    'PCT2024001',
    'AMX2024002',
    'ALU2024003',
    'CIP2024004',
    'FAKE001'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Enter Batch Number" onBack={onBack} />

      <div className="p-6">
        {/* Input Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#006400] rounded-full">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">Batch Number</h2>
              <p className="text-sm text-gray-500">Found on medicine package</p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => {
                setBatchNumber(e.target.value.toUpperCase());
                setNotFound(false);
              }}
              placeholder="e.g., PCT2024001"
              className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#006400] focus:outline-none text-lg font-mono transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>

          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Batch number not found</p>
                <p className="text-sm mt-1">This medicine is not in our database. Please verify the batch number or contact the pharmacy.</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Search Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={!batchNumber.trim() || searching}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
            !batchNumber.trim() || searching
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#006400] to-[#228B22] text-white hover:shadow-xl'
          }`}
        >
          {searching ? 'Searching...' : 'Verify Medicine'}
        </motion.button>

        {/* Sample Batches */}
        <div className="mt-8">
          <h3 className="font-bold text-gray-700 mb-3">Try these sample batches:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedBatches.map((batch) => (
              <button
                key={batch}
                onClick={() => setBatchNumber(batch)}
                className="px-4 py-2 bg-[#90EE90] text-[#006400] rounded-full font-mono text-sm font-semibold hover:bg-[#7CCD7C] transition-colors active:scale-95"
              >
                {batch}
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-1">Where to find batch number?</h4>
          <p className="text-sm text-blue-800">
            The batch number is usually printed on the medicine packaging, often near the expiry date. It may be labeled as "Batch No.", "Lot No.", or "B.No."
          </p>
        </div>
      </div>
    </div>
  );
}
