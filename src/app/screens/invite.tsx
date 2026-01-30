import { Header } from '@/app/components/header';
import { Share2, MessageCircle, Mail, Copy, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Logo } from '@/app/components/logo';

interface InviteScreenProps {
  onBack: () => void;
}

export function InviteScreen({ onBack }: InviteScreenProps) {
  const [copied, setCopied] = useState(false);

  const shareMessage = `🏥 Protect yourself and your loved ones!\n\nDownload MedCheck Uganda to verify medicine authenticity before use.\n\n✅ Scan QR codes & batch numbers\n✅ Check pharmacy licenses\n✅ Get safety tips\n\n"Verify Before You Swallow"\n\nGet the app: https://medcheck.ug`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: 'whatsapp' | 'sms' | 'email') => {
    const encodedMessage = encodeURIComponent(shareMessage);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodedMessage}`,
      sms: `sms:?body=${encodedMessage}`,
      email: `mailto:?subject=${encodeURIComponent('Check out MedCheck Uganda')}&body=${encodedMessage}`
    };

    window.open(urls[platform], '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header title="Invite Friends" onBack={onBack} />

      <div className="p-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#006400] to-[#228B22] rounded-3xl p-8 text-white shadow-xl text-center">
          <Logo size="large" />
          <h2 className="text-2xl font-bold mt-4 mb-2">Protect Your Community</h2>
          <p className="text-lg opacity-90">
            Help friends and family stay safe by sharing MedCheck Uganda
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-3xl font-bold text-[#006400]">30%</p>
            <p className="text-xs text-gray-600 mt-1">Fake medicines in market</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-500">100k+</p>
            <p className="text-xs text-gray-600 mt-1">Deaths annually</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-500">1</p>
            <p className="text-xs text-gray-600 mt-1">Life you can save</p>
          </div>
        </div>

        {/* Share Buttons */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Share via:</h3>
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('whatsapp')}
              className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-white/20 rounded-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-lg">WhatsApp</p>
                <p className="text-sm opacity-90">Share with contacts</p>
              </div>
              <Share2 className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('sms')}
              className="w-full bg-gradient-to-r from-[#006400] to-[#228B22] text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-white/20 rounded-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-lg">SMS</p>
                <p className="text-sm opacity-90">Send text message</p>
              </div>
              <Share2 className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('email')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-white/20 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-lg">Email</p>
                <p className="text-sm opacity-90">Send via email</p>
              </div>
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Copy Message */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h4 className="font-bold text-gray-900 mb-3">Or copy message:</h4>
          <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-200">
            <p className="text-sm text-gray-700 whitespace-pre-line">{shareMessage}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Message
              </>
            )}
          </motion.button>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
          <p className="text-lg font-bold mb-2">💪 Every Share Counts!</p>
          <p className="opacity-90">
            By sharing MedCheck, you're helping protect your community from counterfeit medicines. Together, we can save lives!
          </p>
        </div>
      </div>
    </div>
  );
}
