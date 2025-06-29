interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Switch = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}: SwitchProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'h-4 w-7',
          circle: 'h-3 w-3',
          translate: 'translate-x-3',
        };
      case 'lg':
        return {
          container: 'h-7 w-12',
          circle: 'h-6 w-6',
          translate: 'translate-x-5',
        };
      default: // md
        return {
          container: 'h-5 w-9',
          circle: 'h-4 w-4',
          translate: 'translate-x-4',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={`
          relative inline-flex ${
            sizeClasses.container
          } flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'}
        `}
      >
        <span
          className={`
            ${
              sizeClasses.circle
            } pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 
            transition duration-200 ease-in-out
            ${checked ? sizeClasses.translate : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <span
          className={`
            ml-3 text-sm font-medium
            ${disabled ? 'text-gray-400' : 'text-gray-900'}
          `}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;
