"use client";

import { useState } from 'react';
import AuthForm from './signin';
import UserTypeSelection from './usertype';

export default function App() {
  const [selectedUserType, setSelectedUserType] = useState<'doctor' | 'patient' | null>(null);

  const handleSelectUserType = (userType: 'doctor' | 'patient') => {
    setSelectedUserType(userType);
  };

  const handleBackToSelection = () => {
    setSelectedUserType(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {selectedUserType ? (
            <AuthForm userType={selectedUserType} onBack={handleBackToSelection} />
          ) : (
            <UserTypeSelection onSelectUserType={handleSelectUserType} />
          )}
        </div>
      </div>

      
    </div>
  );
}