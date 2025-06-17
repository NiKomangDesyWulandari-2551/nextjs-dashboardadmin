import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Pastikan ini diatur di .env
});

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const result = await pool.query(
      'SELECT * FROM "Admin" WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      const token = 'dummy-token-' + Math.random().toString(36).substr(2); // Ganti dengan JWT di produksi
      return NextResponse.json({ success: true, token, message: 'Login berhasil' });
    } else {
      return NextResponse.json({ success: false, message: 'Username atau password salah' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { pool } from '@/app/lib/db'; // ✅ Gunakan pool yang sudah diekspor dari modul global

// export async function POST(request: Request) {
//   const { username, password } = await request.json();

//   try {
//     const result = await pool.query(
//       'SELECT * FROM "Admin" WHERE username = $1 AND password = $2',
//       [username, password]
//     );

//     if (result.rows.length > 0) {
//       const token = 'dummy-token-' + Math.random().toString(36).substring(2); // ❗ Ganti dengan JWT di produksi
//       return NextResponse.json({ success: true, token, message: 'Login berhasil' });
//     } else {
//       return NextResponse.json(
//         { success: false, message: 'Username atau password salah' },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     return NextResponse.json(
//       { success: false, message: 'Terjadi kesalahan server' },
//       { status: 500 }
//     );
//   }
// }
