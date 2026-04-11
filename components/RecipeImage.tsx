'use client';

import { useState } from 'react';

export default function RecipeImage({
  src,
  alt,
  className = '',
  fill = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-soft/20 ${
          fill ? 'absolute inset-0' : 'w-full h-full'
        } ${className}`}
      >
        <div className="text-center">
          <span className="text-5xl block mb-2">🍽️</span>
          <span className="text-xs text-dark/40 uppercase tracking-widest">
            Foto próximamente
          </span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`object-cover object-center ${fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full'} ${className}`}
    />
  );
}
