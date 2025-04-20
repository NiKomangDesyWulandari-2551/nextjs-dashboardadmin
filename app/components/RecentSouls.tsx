// components/RecentSouls.tsx
import React from 'react';
import { FaClock } from 'react-icons/fa';
import Head from "next/head";

interface RecentSoulsProps {
  count: number;
  className?: string;
}

const RecentSouls: React.FC<RecentSoulsProps> = ({ count }) => {
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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <FaClock style={{ fontSize: '40px', color: '#8FAFBC'}} />
      <div style={{ fontSize: '15px', color: '#8FAFBC', letterSpacing: '1px', fontFamily: "'Lacquer', cursive" }}>Recently Collected Souls</div>
      <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#8FAFBC', fontFamily: "'Lacquer', cursive" }}>{count}</div>
    </div>
  );
};

export default RecentSouls;
