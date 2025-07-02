import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  total: number;
  active: number;
  deleted: number;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'indigo';
  onClick?: () => void;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    accent: 'text-blue-600',
    hover: 'hover:bg-blue-100',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    accent: 'text-green-600',
    hover: 'hover:bg-green-100',
  },
  yellow: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-600',
    accent: 'text-yellow-600',
    hover: 'hover:bg-yellow-100',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    accent: 'text-purple-600',
    hover: 'hover:bg-purple-100',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    accent: 'text-red-600',
    hover: 'hover:bg-red-100',
  },
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    accent: 'text-indigo-600',
    hover: 'hover:bg-indigo-100',
  },
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  icon,
  total,
  active,
  deleted,
  color,
  onClick,
}) => {
  const colors = colorClasses[color];

  const cardContent = (
    <>
      {/* Header con icono, título y flecha */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${colors.bg} ${
              onClick ? colors.hover : ''
            } transition-colors`}
          >
            <div className={`w-5 h-5 ${colors.icon}`}>{icon}</div>
          </div>
          <h3 className="text-base font-medium text-gray-700">{title}</h3>
        </div>
        {onClick && (
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        )}
      </div>

      {/* Número principal destacado */}
      <div className="mb-6">
        <div className={`text-4xl font-bold ${colors.accent} mb-1`}>{total}</div>
        <p className="text-sm text-gray-500">Total registrados</p>
      </div>

      {/* Desglose sutil */}
      <div className="flex justify-between text-xs text-gray-400 border-t pt-3">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>{active} activos</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <span>{deleted} eliminados</span>
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 text-left w-full hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {cardContent}
    </div>
  );
};

export default StatsCard;
