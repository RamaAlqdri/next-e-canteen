import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import {User} from "@/lib/models/UserModel";
import userService from "@/lib/services/userService";

export const POST = async (request: NextRequest) => {
  const { name, email,password } = await request.json();

  const hashedPassword = bcrypt.hashSync(password, 5);
  const newName = name;
  try {
    userService.updateUserName(email, newName);
    userService.updateUserPassword(email, hashedPassword);
    return Response.json(
      { message: "Pengguna di perbarui" },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: "Gagal Memperbarui Pengguna" },
      {
        status: 500,
      }
    );
  }
};
