// components/BanquetProgress.tsx
import React from 'react';
import { GiMeal } from 'react-icons/gi';
import Head from "next/head";

interface BanquetProgressProps {
  progress: number;
  className?: string;
}

const BanquetProgress: React.FC<BanquetProgressProps> = ({ progress }) => {
  return (
    <div style={{ 
        textAlign: 'center', 
        padding: '25px', 
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        border: '2px solid rgba(173, 216, 230, 0.8)', // Border lebih redup
        borderRadius: '20px',
        margin: '10px',
        minWidth: '325px', // Menyesuaikan panjang kotak dengan desain
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '8px', // Menyesuaikan jarak antar elemen
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)' // Efek bayangan lebih lembut 
    }}>
      {/* Import Google Font */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GiMeal style={{ fontSize: '40px', color: '#8FAFBC' }} />
      <div style={{ fontSize: '15px', color: '#8FAFBC', letterSpacing: '1px', fontFamily: "'Lacquer', cursive" }}>Banquet From Hell</div>
      <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#8FAFBC', fontFamily: "'Lacquer', cursive" }}>{progress}</div>
    </div>
  );
};

export default BanquetProgress;
