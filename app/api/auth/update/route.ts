import { NextRequest, NextResponse } from 'next/server';
import { getAuth, onAuthStateChanged, updateProfile, updatePassword } from 'firebase/auth';
import userService from '@/lib/services/userService';
import { auth } from '@/lib/firebase';
 // Sesuaikan impor dengan konfigurasi Anda

 export const POST = async (request: NextRequest) => {
  const { name, email, password,user } = await request.json();
  // const user = auth.currentUser;
  // console.log(user);

  if (!user) {
    return NextResponse.json(
      { message: "Pengguna tidak ditemukan" },
      { status: 404 }
    );
  }

  try {
    if (name !== "") {
      console.log(name);
      await updateProfile(user, { displayName: name as string });
      await userService.updateUserName(email, name);
    }

    if (password !== "") {
      await updatePassword(user, password);
      // await userService.updateUserPassword(email, hashedPassword); // Jika Anda menggunakan hashed password
    }

    return NextResponse.json(
      { message: "Pengguna diperbarui" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal Memperbarui Pengguna" },
      { status: 500 }
    );
  }
};