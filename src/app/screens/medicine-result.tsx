import { Header } from '@/app/components/header';
import {
  CheckCircle,
  XCircle,
  Calendar,
  Building2,
  Pill,
  AlertTriangle,
  Bookmark,
  Share2,
  Flag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Medicine } from '@/app/data/medicines';
import { useState } from 'react';
import { toast } from 'sonner';

interface MedicineResultScreenProps {
  medicine: Medicine;
  onBack: () => void;
  onSave: (medicine: Medicine) => void;
}

export function MedicineResultScreen({ medicine, onBack, onSave }: MedicineResultScreenProps) {
  const isAuthentic = medicine.isAuthentic;
  const daysUntilExpiry = Math.floor(
    (new Date(medicine.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportPharmacy, setReportPharmacy] = useState('');

  const handleReport = () => {
    setShowReportDialog(false);
    toast.success(`Medicine reported to NDA. Thank you for helping protect our community!`);
    setReportReason('');
    setReportPharmacy('');
  };

  const reportReasons = [
    'Suspected counterfeit',
    'Expired medicine',
    'Damaged packaging',
    'Suspicious appearance',
    'Missing information',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title="Verification Result" onBack={onBack} />

      <div className="p-6 space-y-4">
        {/* Status Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-3xl shadow-xl p-6 ${
            isAuthentic
              ? 'bg-gradient-to-br from-[#006400] to-[#228B22]'
              : 'bg-gradient-to-br from-red-600 to-red-700'
          }`}
        >
          <div className="flex items-start gap-4">
            {isAuthentic ? (
              <CheckCircle className="w-16 h-16 text-white flex-shrink-0" />
            ) : (
              <XCircle className="w-16 h-16 text-white flex-shrink-0" />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isAuthentic ? 'Authentic Medicine' : 'WARNING: Unverified'}
              </h2>
              <p className="text-white/90">
                {isAuthentic
                  ? 'This medicine has been verified in our database'
                  : 'This product could not be verified. Do not use!'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Medicine Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{medicine.name}</h3>
            <p className="text-gray-500 font-mono text-sm">Batch: {medicine.batchNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Manufacturer</p>
                <p className="font-semibold text-gray-900">{medicine.manufacturer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Expires</p>
                <p className="font-semibold text-gray-900">
                  {new Date(medicine.expiryDate).toLocaleDateString('en-GB')}
                </p>
                {daysUntilExpiry > 0 && daysUntilExpiry < 90 && (
                  <p className="text-xs text-orange-600 font-medium mt-0.5">
                    {daysUntilExpiry} days left
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dosage */}
          <div className="flex items-start gap-3 pt-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Pill className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Dosage Instructions</p>
              <p className="text-sm text-gray-900">{medicine.dosage}</p>
            </div>
          </div>

          {/* Price */}
          {isAuthentic && (
            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-1">Recommended Price</p>
              <p className="text-xl font-bold text-[#006400]">{medicine.price}</p>
            </div>
          )}
        </div>

        {/* Side Effects */}
        <div
          className={`rounded-2xl shadow-lg p-6 ${
            isAuthentic ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              className={`w-6 h-6 flex-shrink-0 ${
                isAuthentic ? 'text-yellow-600' : 'text-red-600'
              }`}
            />
            <div className="flex-1">
              <h4
                className={`font-bold mb-2 ${
                  isAuthentic ? 'text-yellow-900' : 'text-red-900'
                }`}
              >
                {isAuthentic ? 'Possible Side Effects' : 'DANGER'}
              </h4>
              <ul
                className={`space-y-1 ${
                  isAuthentic ? 'text-yellow-800' : 'text-red-800'
                }`}
              >
                {medicine.sideEffects.map((effect, index) => (
                  <li key={index} className="text-sm">
                    • {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isAuthentic ? (
          <div className="flex gap-3 pt-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onSave(medicine)}
              className="flex-1 py-4 bg-gradient-to-r from-[#006400] to-[#228B22] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Bookmark className="w-5 h-5" />
              Save Medicine
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl font-bold shadow-lg hover:bg-gray-200 transition-all"
            >
              <Share2 className="w-6 h-6" />
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReportDialog(true)}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Flag className="w-5 h-5" />
            Report This Medicine
          </motion.button>
        )}
      </div>

      {/* Report Dialog */}
      <AnimatePresence>
        {showReportDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 overflow-y-auto"
            onClick={() => setShowReportDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl my-6"
            >
              <div className="text-center mb-4">
                <Flag className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-xl text-gray-900 mb-2">Report Counterfeit Medicine</h3>
                <p className="text-sm text-gray-600">
                  Help protect others by reporting suspicious medicines to NDA.
                </p>
              </div>

              <div className="space-y-4">
                {/* Reason Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Reason
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006400] focus:outline-none"
                  >
                    <option value="">Choose a reason...</option>
                    {reportReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Pharmacy Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Where did you get this? (Optional)
                  </label>
                  <input
                    type="text"
                    value={reportPharmacy}
                    onChange={(e) => setReportPharmacy(e.target.value)}
                    placeholder="e.g., ABC Pharmacy, Kampala"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006400] focus:outline-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReport}
                    disabled={!reportReason}
                    className={`w-full rounded-xl py-3 font-bold transition-colors ${
                      reportReason
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Report
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReportDialog(false)}
                    className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>

                {/* Info */}
                <p className="text-xs text-gray-500 text-center">
                  Your report will be sent to the National Drug Authority for investigation.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}