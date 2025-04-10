
import React from 'react';
import ApiKeyModal from '@/components/Settings/ApiKeyModal';

interface MatchesHeaderProps {
  onApiKeyChange: () => void;
}

const MatchesHeader: React.FC<MatchesHeaderProps> = ({ onApiKeyChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-kooora-dark">جدول المباريات</h1>
      <ApiKeyModal onApiKeyChange={onApiKeyChange} />
    </div>
  );
};

export default MatchesHeader;
