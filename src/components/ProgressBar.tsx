import React from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  status?: 'success' | 'warning' | 'danger';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  className = '',
  status
}) => {
  let colorClass = 'bg-blue-600';
  
  if (status) {
    colorClass = status === 'success' 
      ? 'bg-green-500' 
      : status === 'warning' 
        ? 'bg-yellow-500' 
        : 'bg-red-500';
  } else if (percentage < 70) {
    colorClass = 'bg-red-500';
  } else if (percentage < 80) {
    colorClass = 'bg-yellow-500';
  } else {
    colorClass = 'bg-green-500';
  }

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${colorClass}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;