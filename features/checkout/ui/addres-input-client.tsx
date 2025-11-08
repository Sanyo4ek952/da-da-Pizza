'use client';
import dynamic from 'next/dynamic';

const AddressInput = dynamic(
  () => import('@/features/checkout').then((mod) => mod.AddressInput),
  {
    ssr: false,
    loading: () => (
      <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
    ),
  }
);

export default AddressInput;
