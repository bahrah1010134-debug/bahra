import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="relative group max-w-md mx-auto w-full px-4">
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder="أدخل رقم الهوية للاستعلام"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ios-input pr-12 text-center"
      />
    </div>
  );
};

export default SearchInput;
