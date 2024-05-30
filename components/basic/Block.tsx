import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface BlockProps {
  className?: string;
  children?: ReactNode;
}

export const Block: React.FC<BlockProps> = ({ className, children }) => {
  return (
    <div 
        className={twMerge(
            "col-span-4 p-4",
            className
        )}
    >
      {children}
    </div>
  )
}
