import { useState } from 'react';
import { Header } from '@/app/components/header';
import { MessageSquare, Send, CheckCircle, XCircle, Smartphone, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { searchMedicineByBatch } from '@/app/data/medicines';
import { toast } from 'sonner';

interface SMSVerifyScreenProps {
  onBack: () => void;
}

export function SMSVerifyScreen({ onBack }: SMSVerifyScreenProps) {
  const [batchNumber, setBatchNumber] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [reply, setReply] = useState<{
    isAuthentic: boolean;
    medicineName: string;
    manufacturer: string;
  } | null>(null);

  const handleSendSMS = () => {
    if (!batchNumber.trim()) return;

    setSending(true);
    setSent(false);
    setReply(null);

    // Simulate sending SMS
    setTimeout(() => {
      setSending(false);
      setSent(true);

      // Simulate receiving reply after 2 seconds
      setTimeout(() => {
        const medicine = searchMedicineByBatch(batchNumber);
        setReply({
          isAuthentic: medicine?.isAuthentic || false,
          medicineName: medicine?.name || 'Unknown Medicine',
          manufacturer: medicine?.manufacturer || 'Unknown'
        });
      }, 2000);
    }, 1000);
  };

  const handleOpenNativeSMS = () => {
    const message = `MED ${batchNumber}`;
    const smsUrl = `sms:8198${isOffline ? '' : '?body=' + encodeURIComponent(message)}`;
    
    // Try to open native SMS app
    window.location.href = smsUrl;
    toast.info('Opening SMS app... Send the message to verify offline.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="SMS Verification" onBack={onBack} />

      <div className="p-6 space-y-6">
        {/* Offline Mode Toggle (Demo) */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Offline Mode Demo</span>
            </div>
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isOffline ? 'bg-[#006400]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isOffline ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Offline Warning */}
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-50 border-l-4 border-orange-500 rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <WifiOff className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-orange-900 mb-1">You're offline</h3>
                <p className="text-sm text-orange-800">
                  You can still verify via SMS. Tap below to send a message to NDA.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Card */}
        <div className="bg-gradient-to-br from-[#006400] to-[#228B22] rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <Smartphone className="w-12 h-12 flex-shrink-0" />
            <div>
              <h2 className="font-bold text-xl mb-2">How SMS Verification Works</h2>
              <p className="text-sm opacity-90 leading-relaxed">
                {isOffline 
                  ? 'Send batch number via SMS to verify medicines even without internet. Perfect for rural areas!'
                  : 'Send batch number via SMS to verify medicines even without internet. Perfect for rural areas!'}
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#006400]" />
            Enter Batch Number
          </h3>

          <input
            type="text"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value.toUpperCase())}
            placeholder="e.g., PCT2024001"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006400] focus:outline-none font-mono mb-4"
            onKeyDown={(e) => e.key === 'Enter' && (isOffline ? handleOpenNativeSMS() : handleSendSMS())}
          />

          {isOffline ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenNativeSMS}
              disabled={!batchNumber.trim()}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                !batchNumber.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Open SMS App
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSendSMS}
              disabled={!batchNumber.trim() || sending}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                !batchNumber.trim() || sending
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#006400] to-[#228B22] text-white hover:shadow-xl'
              }`}
            >
              <Send className="w-5 h-5" />
              {sending ? 'Sending...' : 'Send SMS'}
            </motion.button>
          )}

          {/* Sample batches */}
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Try these samples:</p>
            <div className="flex flex-wrap gap-2">
              {['PCT2024001', 'AMX2024002', 'FAKE001'].map((sample) => (
                <button
                  key={sample}
                  onClick={() => setBatchNumber(sample)}
                  className="px-3 py-1 bg-[#90EE90] text-[#006400] rounded-full text-xs font-semibold hover:bg-[#7CCD7C] transition-colors active:scale-95"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Offline SMS Instructions */}
        {isOffline && batchNumber.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4"
          >
            <h4 className="font-bold text-blue-900 mb-2">📱 SMS Instructions</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Tap "Open SMS App" button above</li>
              <li>Send message to: <strong className="font-mono">8198</strong></li>
              <li>Message format: <strong className="font-mono">MED {batchNumber}</strong></li>
              <li>Wait for NDA's reply with verification result</li>
            </ol>
          </motion.div>
        )}

        {/* SMS Conversation */}
        <AnimatePresence>
          {(sent || reply) && !isOffline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#006400]" />
                SMS Conversation
              </h3>

              <div className="space-y-3">
                {/* Sent message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-end"
                >
                  <div className="bg-[#006400] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-md">
                    <p className="text-sm font-medium mb-1">To: 8198</p>
                    <p className="font-mono">MED {batchNumber}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>

                {/* Reply message */}
                {reply ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-start"
                  >
                    <div className={`rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-md ${
                      reply.isAuthentic
                        ? 'bg-green-100 border-l-4 border-green-500'
                        : 'bg-red-100 border-l-4 border-red-500'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {reply.isAuthentic ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <p className={`font-bold ${
                          reply.isAuthentic ? 'text-green-900' : 'text-red-900'
                        }`}>
                          {reply.isAuthentic ? 'AUTHENTIC' : 'WARNING: UNVERIFIED'}
                        </p>
                      </div>
                      <p className={`text-sm ${
                        reply.isAuthentic ? 'text-green-800' : 'text-red-800'
                      }`}>
                        <span className="font-semibold">Medicine:</span> {reply.medicineName}<br />
                        <span className="font-semibold">Manufacturer:</span> {reply.manufacturer}<br />
                        <span className="font-semibold">Batch:</span> {batchNumber}
                      </p>
                      {!reply.isAuthentic && (
                        <p className="text-xs text-red-700 font-bold mt-2">
                          DO NOT USE THIS MEDICINE. Contact NDA: 0800-101-606
                        </p>
                      )}
                      <p className="text-xs opacity-75 mt-2">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">Verifying...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-bold">ℹ️ SMS Verification:</span> Send SMS to shortcode <span className="font-mono font-bold">8198</span> with format "MED [batch number]". Works on all networks (MTN, Airtel, etc.). Standard SMS rates apply.
          </p>
        </div>
      </div>
    </div>
  );
}