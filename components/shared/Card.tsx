
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-saric-medium p-6 rounded-lg shadow-lg flex items-center">
      <div className="bg-saric-light p-3 rounded-full text-saric-blue">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default Card;
