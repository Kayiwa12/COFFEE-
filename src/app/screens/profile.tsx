import { Header } from '@/app/components/header';
import { User, Bell, Globe, Shield, Info, Heart, Award, LogOut, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '@/app/components/logo';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProfileScreenProps {
  onBack: () => void;
  savedMedicinesCount: number;
}

export function ProfileScreen({ onBack, savedMedicinesCount }: ProfileScreenProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const handleLogout = () => {
    setShowLogoutConfirm(false);
    toast.success('Logged out successfully');
    // In a real app, this would clear session and navigate to login
  };

  const settingsItems = [
    { icon: Bell, label: 'Notifications', value: 'Enabled', color: 'bg-blue-100 text-blue-600' },
    { icon: Globe, label: 'Language', value: 'English', color: 'bg-green-100 text-green-600' },
    { icon: Shield, label: 'Privacy', value: 'Settings', color: 'bg-purple-100 text-purple-600' }
  ];

  const aboutItems = [
    { icon: Info, label: 'About MedCheck', color: 'bg-gray-100 text-gray-600' },
    { icon: Heart, label: 'Support', color: 'bg-red-100 text-red-600' }
  ];

  // Mock reports data
  const reportsCount = 3; // In a real app, this would come from state/API

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title="Profile" onBack={onBack} />

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#006400] to-[#228B22] rounded-3xl p-8 text-white shadow-xl text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <User className="w-16 h-16" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-1">MedCheck User</h2>
          <p className="opacity-90">Protecting health since 2026</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-5 text-center">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{savedMedicinesCount}</p>
            <p className="text-sm text-gray-500 mt-1">Medicines Tracked</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5 text-center">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-gray-500 mt-1">Safety Score</p>
          </div>
        </div>

        {/* My Reports Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">My Reports</h3>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
          >
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">Submitted Reports</p>
              <p className="text-sm text-gray-500">{reportsCount} counterfeit reports</p>
            </div>
            <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              {reportsCount}
            </div>
          </motion.button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Settings</h3>
          </div>
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className={`p-3 ${item.color} rounded-xl`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.value}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">About</h3>
          </div>
          {aboutItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className={`p-3 ${item.color} rounded-xl`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="flex-1 text-left font-semibold text-gray-900">{item.label}</p>
              </motion.button>
            );
          })}
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="flex justify-center">
            <Logo size="small" />
          </div>
          <h4 className="font-bold text-gray-900 mt-3 mb-1">MedCheck Uganda</h4>
          <p className="text-sm text-gray-500 mb-2">Version 1.0.0</p>
          <p className="text-xs text-gray-400">
            Developed in partnership with NDA
          </p>
        </div>

        {/* Logout Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-50 text-red-600 rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border-2 border-red-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>

        {/* Emergency Contact */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <h4 className="font-bold text-red-900 mb-2">Report Counterfeit Medicines</h4>
          <p className="text-sm text-red-800 mb-3">
            If you suspect a medicine is counterfeit, report it immediately to the National Drug Authority.
          </p>
          <a
            href="tel:0800101606"
            className="block w-full bg-red-600 text-white text-center py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
          >
            Call NDA: 0800-101-606
          </a>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
          >
            <div className="text-center mb-4">
              <LogOut className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h3 className="font-bold text-xl text-gray-900 mb-2">Logout</h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to logout?
              </p>
            </div>
            
            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full bg-red-600 text-white rounded-xl py-3 font-bold hover:bg-red-700 transition-colors"
              >
                Yes, Logout
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}