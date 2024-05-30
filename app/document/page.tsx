import CarsDocument from '@/components/CarDoc/CarsDocument'
import React from 'react'
import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `${siteConfig.name} | Document`,
  description: siteConfig.description,
};

export default function page() {
  return (
    <div className='p-10'>
      <CarsDocument />
    </div>
  )
}
