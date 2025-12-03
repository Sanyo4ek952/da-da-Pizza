import React from 'react';
import { cn } from '@shared/lib/utils';
import Image from 'next/image';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  const sizeClasses = {
    20: 'w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px]',
    30: 'w-[220px] h-[220px] sm:w-[330px] sm:h-[330px] md:w-[400px] md:h-[400px]',
    40: 'w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px]',
  };
  return (
    <div
      className={cn(
        'flex items-center justify-center flex-1 relative w-full',
        className
      )}
    >
      <Image
        width={500}
        height={500}
        src={imageUrl}
        alt="Pizza"
        className={cn(
          'relative left-2 top-2 transition-all z-10 duration-300',
          sizeClasses[size]
        )}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200  w-[280px] h-[280px]
        sm:w-[380px] sm:h-[380px]
        md:w-[370px] md:h-[370px]"
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100
       w-[220px] h-[220px]
        sm:w-[300px] sm:h-[300px]
        md:w-[370px] md:h-[370px]"
      />
    </div>
  );
};
