import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <span className="relative group cursor-pointer">
      {children}
      <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
        {text}
      </span>
    </span>
  );
};

export { Tooltip };
