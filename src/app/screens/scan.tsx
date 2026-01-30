import { useState } from 'react';
import { Header } from '@/app/components/header';
import { ScanLine, Camera, Lightbulb, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Medicine, searchMedicineByQR } from '@/app/data/medicines';

interface ScanScreenProps {
  onBack: () => void;
  onMedicineFound: (medicine: Medicine) => void;
}

export function ScanScreen({ onBack, onMedicineFound }: ScanScreenProps) {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setScanComplete(false);

    // Simulate scanning process
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);

      // Simulate finding a medicine (randomly pick one from database)
      const qrCodes = ['QR-PCT2024001', 'QR-AMX2024002', 'QR-ALU2024003', 'QR-FAKE001'];
      const randomQR = qrCodes[Math.floor(Math.random() * qrCodes.length)];
      const medicine = searchMedicineByQR(randomQR);

      if (medicine) {
        setTimeout(() => {
          onMedicineFound(medicine);
        }, 500);
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="QR/Batch Scan" onBack={onBack} />

      <div className="p-6">
        {/* Scanner Area */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!scanning && !scanComplete && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Camera className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Position QR code in frame</p>
                </motion.div>
              )}

              {scanning && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Scanning grid overlay */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 p-8 opacity-30">
                    {[...Array(64)].map((_, i) => (
                      <div key={i} className="bg-[#90EE90] rounded-sm" />
                    ))}
                  </div>

                  {/* Scanning line animation */}
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-[#90EE90] shadow-[0_0_20px_rgba(144,238,144,0.8)]"
                    animate={{ y: [0, 300, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />

                  <ScanLine className="w-32 h-32 text-[#90EE90]" />
                </motion.div>
              )}

              {scanComplete && (
                <motion.div
                  key="complete"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <CheckCircle className="w-24 h-24 text-[#90EE90] mx-auto mb-4" />
                  <p className="text-white text-xl font-bold">Scan Complete!</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-[#90EE90] rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-[#90EE90] rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-[#90EE90] rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-[#90EE90] rounded-br-lg" />
          </div>
        </div>

        {/* Scan Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleScan}
          disabled={scanning}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
            scanning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#006400] to-[#228B22] text-white hover:shadow-xl'
          }`}
        >
          {scanning ? 'Scanning...' : scanComplete ? 'Scan Again' : 'Start Scan'}
        </motion.button>

        {/* Tips */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-900 mb-1">Scanning Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Hold phone steady</li>
                <li>• Position QR code within brackets</li>
                <li>• Clean camera lens if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
