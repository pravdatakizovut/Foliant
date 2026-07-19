"use client";

import { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <div className="mb-8">
      <div className="bg-[#1A1A1F] border border-border-input rounded-full px-4 py-3 text-white flex items-center gap-3">
        <svg
          className="w-5 h-5 text-[#5A5A5F]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Поиск по названию, автору или ISBN..."
          className="bg-transparent outline-none w-full placeholder:text-[#5A5A5F]"
        />
      </div>
    </div>
  );
}
