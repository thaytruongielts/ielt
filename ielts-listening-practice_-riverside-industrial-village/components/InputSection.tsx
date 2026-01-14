
import React from 'react';

interface InputSectionProps {
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
  feedback: 'correct' | 'incorrect' | null;
  label?: string;
  placeholder?: string;
}

const InputSection: React.FC<InputSectionProps> = ({ id, value, onChange, feedback, label, placeholder }) => {
  const getBorderColor = () => {
    if (feedback === 'correct') return 'border-green-500 bg-green-50';
    if (feedback === 'incorrect') return 'border-red-500 bg-red-50';
    return 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
  };

  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative flex items-center">
        <span className="absolute left-3 text-slate-400 font-medium">{id}.</span>
        <input
          type="text"
          value={value}
          autoComplete="off"
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder || "Type answer..."}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-all outline-none ${getBorderColor()}`}
        />
        {feedback && (
          <span className={`ml-2 font-bold text-sm ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {feedback === 'correct' ? '✓ Correct' : '✗ Incorrect'}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputSection;
