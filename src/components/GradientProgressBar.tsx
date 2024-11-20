import React, { useState, useRef, useEffect } from 'react';
import { ColorConfig, DragState, Props } from '../@types';

const DEFAULT_COLORS: ColorConfig = {
  colors: ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'],
  angle: 45
};

const GradientProgressBar: React.FC<Props> = ({
  initialValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  loading = false,
  colors = DEFAULT_COLORS,
  formatValue = (value: number) => `${value}%`,
  onChange,
  className = ''
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [dragState, setDragState] = useState<DragState>({ isDragging: false, isTouching: false });
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const isInteractive = !disabled && !loading;

  // Convert raw value to percentage
  const getPercentage = (rawValue: number): number => {
    return ((rawValue - min) / (max - min)) * 100;
  };

  // Convert percentage to actual value
  const getValueFromPercentage = (percentage: number): number => {
    const rawValue = (percentage * (max - min)) / 100 + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  };

  const updateValueFromPosition = (clientX: number): void => {
    if (progressRef.current && isInteractive) {
      const rect = progressRef.current.getBoundingClientRect();
      const percentage = ((clientX - rect.left) / rect.width) * 100;
      const newValue = getValueFromPercentage(percentage);
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent): void => {
    if (isInteractive) {
      setDragState(prev => ({ ...prev, isDragging: true }));
      updateValueFromPosition(e.clientX);
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (dragState.isDragging) {
      updateValueFromPosition(e.clientX);
    }
  };

  const handleMouseUp = (): void => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent): void => {
    if (isInteractive) {
      setDragState(prev => ({ ...prev, isTouching: true }));
      updateValueFromPosition(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (dragState.isTouching) {
      updateValueFromPosition(e.touches[0].clientX);
      e.preventDefault();
    }
  };

  const handleTouchEnd = (): void => {
    setDragState(prev => ({ ...prev, isTouching: false }));
  };

  // Keyboard event handlers
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (!isInteractive) return;

    let newValue = value;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    setValue(newValue);
    onChange?.(newValue);
    e.preventDefault();
  };

  // Event listeners
  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging]);

  useEffect(() => {
    if (dragState.isTouching) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [dragState.isTouching]);

  // Generate gradient background
  const getGradientBackground = (): string => {
    const { colors: gradientColors, angle = 45 } = colors;
    return `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`;
  };

  const percentage = getPercentage(value);
  const isActive = dragState.isDragging || dragState.isTouching;

  return (
    <div className={`w-full max-w-md mx-auto p-4 ${className}`}>
      <div 
        className="relative pt-3 pb-3" 
        ref={progressRef}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={isInteractive ? 0 : -1}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Progress bar */}
        <div 
          className={`
            relative h-4 rounded-full overflow-hidden transition-colors duration-200
            ${isInteractive ? 'cursor-pointer' : 'cursor-not-allowed'}
            ${disabled ? 'opacity-50' : ''}
            ${loading ? 'animate-pulse' : ''}
          `}
          onClick={isInteractive ? (e) => updateValueFromPosition(e.clientX) : undefined}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gray-200" />
          
          {/* Colored progress */}
          <div 
            className="absolute inset-0 transition-all duration-200"
            style={{
              background: getGradientBackground(),
              clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`
            }}
          />
        </div>

        {/* Handle */}
        <div 
          className={`
            absolute top-0 w-10 -ml-5 flex items-center justify-center
            transition-transform duration-200
            ${isActive ? 'scale-110' : ''}
          `}
          style={{ 
            left: `${percentage}%`,
            cursor: isInteractive ? (isActive ? 'grabbing' : 'grab') : 'not-allowed'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Handle button */}
          <div 
            className={`
              w-8 h-8 rounded-full shadow-lg border-2 border-white
              transition-all duration-200
              ${disabled ? 'bg-gray-400' : 'bg-blue-500'}
              ${isActive ? 'scale-110' : ''}
            `}
          />

          {/* Tooltip */}
          {showTooltip && (
            <div 
              className={`
                absolute -top-10 left-1/2 -translate-x-1/2
                px-2 py-1 rounded bg-gray-800 text-white text-sm
                transition-opacity duration-200
                ${showTooltip ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {formatValue(value)}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                <div className="border-4 border-transparent border-t-gray-800" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Value display */}
      <div className="text-center mt-4">
        {formatValue(value)}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default GradientProgressBar;