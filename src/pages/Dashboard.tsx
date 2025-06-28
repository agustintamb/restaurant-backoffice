import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido, {currentUser?.firstName}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
