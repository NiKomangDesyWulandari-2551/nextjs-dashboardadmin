// CardsServer.tsx (Server Component - no 'use client')
import React from 'react';
import Card from '@/app/ui/dashboard/cards'; // asumsi Card tetap 'use client'
import { Nosifer } from '@/app/ui/font';

async function fetchCardsData() {
  console.log('Fetching revenue data...');
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi delay 2 detik

  const res = await fetch('http://localhost:3000/api/cards', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Gagal memuat data');
  return res.json();
}

export default async function CardsServer() {
  try {
    const {
      totalCustomers,
      totalRevenue,
      totalProducts,
      totalTransactions,
    } = await fetchCardsData();

    return (
      <CardsClient
        totalCustomers={totalCustomers}
        totalRevenue={totalRevenue}
        totalProducts={totalProducts}
        totalTransactions={totalTransactions}
      />
    );
  } catch (error) {
    return (
      <p className="text-center text-red-500 font-serif my-4 text-lg">
        Data tidak tersedia atau gagal dimuat.
      </p>
    );
  }
}

