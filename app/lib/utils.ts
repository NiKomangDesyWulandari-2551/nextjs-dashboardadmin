import { Revenue } from './definitions';

export const formatCurrency = (amount: number | bigint | null): string => {
  const value = Number(amount ?? 0); // Konversi ke number, gunakan 0 jika null
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
};

export const formatWeekToLocal = (weekStr: string, locale: string = 'id-ID') => {
  // Langsung kembalikan string week karena formatnya sudah deskriptif
  // Misalnya: "Week 1 (15-21 Apr)"
  return weekStr;
};


export const generateYAxis = (revenue: Revenue[]) => {
  // Hitung label untuk sumbu Y berdasarkan revenue tertinggi, dalam jutaan
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((sale) => sale.revenue));
  const topLabel = Math.ceil(highestRecord / 1000000) * 1000000; // Bulatkan ke jutaan


  for (let i = topLabel; i >= 0; i -= 1000000) {
    yAxisLabels.push(`Rp ${i / 1000000}M`);
  }


  return { yAxisLabels, topLabel };
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  // Jika total halaman 7 atau kurang, tampilkan semua halaman
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }


  // Jika halaman saat ini di antara 3 halaman pertama
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }


  // Jika halaman saat ini di antara 3 halaman terakhir
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }


  // Jika halaman saat ini di tengah
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
