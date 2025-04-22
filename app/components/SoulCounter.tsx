// components/SoulCounter.tsx
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import Head from "next/head";

interface SoulCounterProps {
  count: number;
  className?: string;
}

const SoulCounter: React.FC<SoulCounterProps> = ({ count }) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '25px', 
      backgroundColor: 'rgba(0, 0, 0, 0.6)', 
      border: '2px solid rgba(173, 216, 230, 0.7)', 
      borderRadius: '20px',
      margin: '10px',
      minWidth: '325px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: '8px', 
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)' 
  }}>
       {/* Import Google Font */}
       <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <FaUsers style={{ fontSize: '40px', color: '#8FAFBC' }} />
      <div style={{ fontSize: '15px', color: '#8FAFBC', letterSpacing: '1px', fontFamily: "'Lacquer', cursive"}}>Souls Collected</div>
      <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#8FAFBC', fontFamily: "'Lacquer', cursive"}}>{count}</div>
    </div>
  );
};

export default SoulCounter;
