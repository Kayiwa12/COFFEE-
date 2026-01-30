import { useState } from 'react';
import { Header } from '@/app/components/header';
import { Search, MapPin, Phone, CheckCircle, XCircle, Award, Navigation, Flag, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { pharmaciesDatabase, searchPharmacies, Pharmacy } from '@/app/data/pharmacies';
import { toast } from 'sonner';

interface PharmacyCheckScreenProps {
  onBack: () => void;
}

export function PharmacyCheckScreen({ onBack }: PharmacyCheckScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Pharmacy[]>(pharmaciesDatabase);
  const [showNearby, setShowNearby] = useState(false);
  const [reportingPharmacy, setReportingPharmacy] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const searchResults = searchPharmacies(query);
    setResults(searchResults);
    
    // Check if no results found
    if (query.trim() && searchResults.length === 0) {
      // Show not found message
      setResults([]);
    }
  };

  const handleFindNearby = () => {
    setShowNearby(true);
    toast.success('Finding licensed pharmacies near you...');
    // Mock: Filter to show only verified pharmacies and sort by mock distance
    const nearby = pharmaciesDatabase.filter(p => p.verified).slice(0, 4);
    setResults(nearby);
    setSearchQuery('');
  };

  const handleReportPharmacy = (pharmacyName: string) => {
    setReportingPharmacy(null);
    toast.success(`Unlisted pharmacy "${pharmacyName}" reported to NDA. Thank you for helping protect our community!`);
  };

  const verifiedCount = results.filter(p => p.verified).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title="Pharmacy Check" onBack={onBack} />

      <div className="p-6 space-y-4">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006400] focus:outline-none transition-colors"
            />
          </div>
          
          {/* Find Nearest Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleFindNearby}
            className="w-full bg-gradient-to-r from-[#006400] to-[#228B22] text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Navigation className="w-5 h-5" />
            Find Nearest Licensed Pharmacies
          </motion.button>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#006400] to-[#228B22] rounded-xl p-4 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-1">Found</p>
            <p className="text-3xl font-bold">{results.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-1">Licensed</p>
            <p className="text-3xl font-bold">{verifiedCount}</p>
          </div>
        </div>

        {/* Not Found Warning */}
        {searchQuery.trim() && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-2">Pharmacy Not Found</h3>
                <p className="text-sm text-red-800">
                  <strong>"{searchQuery}"</strong> is not listed in NDA's licensed database. Exercise caution.
                </p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setReportingPharmacy(searchQuery)}
              className="w-full bg-red-600 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
            >
              <Flag className="w-5 h-5" />
              Report Unlisted Pharmacy
            </motion.button>
          </motion.div>
        )}

        {/* Pharmacies List */}
        <div className="space-y-3">
          {results.map((pharmacy, index) => (
            <motion.div
              key={pharmacy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl shadow-lg p-5 border-l-4 ${
                pharmacy.verified ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  pharmacy.verified ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {pharmacy.verified ? (
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  ) : (
                    <XCircle className="w-7 h-7 text-red-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{pharmacy.name}</h3>
                    {pharmacy.verified && (
                      <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">{pharmacy.location}</p>
                    {showNearby && pharmacy.verified && (
                      <span className="ml-auto text-xs text-green-600 font-semibold">
                        {(Math.random() * 5 + 0.5).toFixed(1)} km
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a
                      href={`tel:${pharmacy.phone}`}
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      {pharmacy.phone}
                    </a>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    pharmacy.verified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {pharmacy.verified ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Licensed: {pharmacy.license}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{pharmacy.license}</span>
                      </>
                    )}
                  </div>

                  {/* Report button for unverified pharmacies */}
                  {!pharmacy.verified && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReportPharmacy(pharmacy.name)}
                      className="mt-3 w-full bg-red-100 text-red-700 rounded-lg py-2 px-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-200 transition-colors"
                    >
                      <Flag className="w-4 h-4" />
                      Report to NDA
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {results.length === 0 && !searchQuery.trim() && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-400 mb-2">No Results Found</h3>
            <p className="text-gray-400">Try searching with different keywords</p>
          </div>
        )}

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
          <p className="text-sm text-yellow-900">
            <span className="font-bold">⚠️ Important:</span> Only buy medicines from verified pharmacies with valid NDA licenses. Unverified sources may sell counterfeit or expired products.
          </p>
        </div>
      </div>

      {/* Report Dialog */}
      <AnimatePresence>
        {reportingPharmacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setReportingPharmacy(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="text-center mb-4">
                <Flag className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-xl text-gray-900 mb-2">Report Unlisted Pharmacy</h3>
                <p className="text-sm text-gray-600">
                  You're about to report <strong>"{reportingPharmacy}"</strong> to the National Drug Authority.
                </p>
              </div>
              
              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReportPharmacy(reportingPharmacy)}
                  className="w-full bg-red-600 text-white rounded-xl py-3 font-bold hover:bg-red-700 transition-colors"
                >
                  Confirm Report
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setReportingPharmacy(null)}
                  className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}