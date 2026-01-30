import { Home, ScanLine, Package, BookOpen, User } from 'lucide-react';

type Screen = 'home' | 'scan' | 'my-medicines' | 'education' | 'profile';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const items = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'scan' as Screen, icon: ScanLine, label: 'Scan' },
    { id: 'my-medicines' as Screen, icon: Package, label: 'Medicines' },
    { id: 'education' as Screen, icon: BookOpen, label: 'Learn' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all active:scale-95"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-[#006400]' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-[#006400]' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
