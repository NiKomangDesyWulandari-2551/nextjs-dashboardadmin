import React from 'react';
import SoulCounter from '@/app/components/SoulCounter';
import RecentSouls from '@/app/components/RecentSouls';
import BanquetProgress from '@/app/components/BanquetProgress';

interface DashboardProps {
  soulCount: number;
  recentCount: number;
  banquetProgress: number;
}

const Dashboard: React.FC<DashboardProps> = ({ soulCount, recentCount, banquetProgress }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-8 pt-0">
      
      {/* Grid Container */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mt-0 absolute top-0">
        <div className="flex justify-end" style={{ width: '325px', height: '195px' }}>
          <SoulCounter count={soulCount} className="w-full h-full flex justify-center items-center" />
        </div>
        <div className="flex justify-start" style={{ width: '325px', height: '195px' }}>
          <RecentSouls count={recentCount} className="w-full h-full flex justify-center items-center" />
        </div>
        <div className="flex justify-end" style={{ width: '325px', height: '195px' }}>
          <BanquetProgress progress={banquetProgress} className="w-full h-full flex justify-center items-center" />
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return <Dashboard soulCount={40} recentCount={10} banquetProgress={30} />;
}
