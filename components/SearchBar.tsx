'use client';

import type { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ value, onChange, placeholder, className }: SearchBarProps) {
  return (
    <div className={className}>
      <label className="relative block">
        <span className="sr-only">Buscar</span>
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-dark/50">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          placeholder={placeholder ?? 'Buscar...'}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-dark shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </label>
    </div>
  );
}
