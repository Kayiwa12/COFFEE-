import { Shield, Check } from 'lucide-react';

export function Logo({ size = 'large' }: { size?: 'small' | 'large' }) {
  const containerSize = size === 'large' ? 'w-20 h-20' : 'w-12 h-12';
  const iconSize = size === 'large' ? 'w-10 h-10' : 'w-6 h-6';
  const checkSize = size === 'large' ? 'w-5 h-5' : 'w-3 h-3';
  
  return (
    <div className={`${containerSize} relative`}>
      {/* Capsule background with diagonal split */}
      <div className="w-full h-full rounded-full overflow-hidden shadow-lg relative">
        {/* White half (top-left diagonal) */}
        <div 
          className="absolute inset-0 bg-white" 
          style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
          }}
        />
        {/* Dark green half (bottom-right diagonal) */}
        <div 
          className="absolute inset-0 bg-[#006400]" 
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
          }}
        />
      </div>
      
      {/* Shield with checkmark overlay - integrated on top of capsule */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Shield outline */}
          <Shield 
            className={`${iconSize} text-[#006400] stroke-[#006400] stroke-[2.5] fill-transparent`} 
          />
          {/* Checkmark inside shield */}
          <Check 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${checkSize} text-white stroke-[3.5]`} 
          />
        </div>
      </div>
    </div>
  );
}
