'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-white/5", 
        className
      )} 
    />
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="h-64 w-full rounded-3xl glass-darker p-8 space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-4 gap-4 mt-10">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </div>
      <div className="h-96 w-full rounded-3xl glass-darker p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};
