'use client'

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fill = true,
  sizes,
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn(
        'bg-gray-200 flex items-center justify-center',
        className
      )}>
        <span className="text-gray-500">Image failed to load</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      className={cn(
        'duration-700 ease-in-out',
        isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
        className
      )}
      onLoadingComplete={() => setIsLoading(false)}
      onError={() => setError(true)}
    />
  );
} 