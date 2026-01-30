import { Logo } from '@/app/components/logo';
import {
  ScanLine,
  Hash,
  Package,
  BookOpen,
  MapPin,
  MessageSquare,
  Share2,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

type HomeAction =
  | 'qr-scan'
  | 'batch-entry'
  | 'my-medicines'
  | 'education'
  | 'pharmacy-check'
  | 'sms-verify'
  | 'invite';

interface HomeScreenProps {
  onAction: (action: HomeAction) => void;
}

export function HomeScreen({ onAction }: HomeScreenProps) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const didYouKnowFacts = [
    "Over 30% of medicines in developing countries may be counterfeit. Always verify before use!",
    "Counterfeit medicines kill over 250,000 children worldwide each year.",
    "Check the packaging for spelling errors - they're often signs of fake medicines.",
    "Always buy medicines from licensed pharmacies with valid NDA certificates.",
    "Store medicines in cool, dry places away from direct sunlight to maintain effectiveness."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % didYouKnowFacts.length);
    }, 5000); // Change fact every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const actions = [
    {
      id: 'qr-scan' as HomeAction,
      icon: ScanLine,
      title: 'QR/Batch Scan',
      description: 'Scan medicine code',
      color: 'bg-gradient-to-br from-[#006400] to-[#008000]'
    },
    {
      id: 'batch-entry' as HomeAction,
      icon: Hash,
      title: 'Enter Batch',
      description: 'Type batch number',
      color: 'bg-gradient-to-br from-[#90EE90] to-[#7CCD7C]'
    },
    {
      id: 'my-medicines' as HomeAction,
      icon: Package,
      title: 'My Medicines',
      description: 'Saved medicines',
      color: 'bg-gradient-to-br from-[#006400] to-[#228B22]'
    },
    {
      id: 'education' as HomeAction,
      icon: BookOpen,
      title: 'Tips & Education',
      description: 'Learn safety tips',
      color: 'bg-gradient-to-br from-[#32CD32] to-[#00FF00]'
    },
    {
      id: 'pharmacy-check' as HomeAction,
      icon: MapPin,
      title: 'Pharmacy Check',
      description: 'Find trusted stores',
      color: 'bg-gradient-to-br from-[#006400] to-[#2E8B57]'
    },
    {
      id: 'sms-verify' as HomeAction,
      icon: MessageSquare,
      title: 'SMS Verification',
      description: 'Verify by text',
      color: 'bg-gradient-to-br from-[#3CB371] to-[#2E8B57]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#006400] to-[#228B22] text-white pt-8 pb-12 px-6 rounded-b-3xl shadow-lg">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <Logo size="large" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-3xl font-bold"
          >
            MedCheck Uganda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-lg font-medium text-[#90EE90]"
          >
            Verify Before You Swallow
          </motion.p>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="px-6 -mt-6">
        <div className="grid grid-cols-2 gap-3.5">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onAction(action.id)}
                className={`${action.color} rounded-2xl shadow-lg p-5 text-white text-left hover:shadow-xl transition-all active:scale-95`}
              >
                <Icon className="w-9 h-9 mb-3" />
                <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Invite Friends Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={() => onAction('invite')}
          className="w-full mt-3.5 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] rounded-2xl shadow-lg p-4 text-white flex items-center justify-between hover:shadow-xl transition-all active:scale-95"
        >
          <div className="flex items-center gap-3">
            <Share2 className="w-7 h-7" />
            <div className="text-left">
              <h3 className="font-bold text-lg">Invite Friends</h3>
              <p className="text-sm opacity-90">Protect your community</p>
            </div>
          </div>
          <ShieldCheck className="w-7 h-7" />
        </motion.button>

        {/* Dynamic "Did You Know?" Banner - Moved to bottom */}
        <motion.div
          key={currentFactIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mt-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4"
        >
          <p className="text-sm text-blue-900">
            <span className="font-bold">💡 Did you know?</span> {didYouKnowFacts[currentFactIndex]}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
