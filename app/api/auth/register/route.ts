import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import {User} from "@/lib/models/UserModel";
import userService from "@/lib/services/userService";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  const hashedPassword = bcrypt.hashSync(password, 5);
  const newUser = ({
    name,
    email,
    password: hashedPassword,
  }) as User;
  try {
    userService.createUser(newUser);
    return Response.json(
      { message: "User has been created" },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: "User has been created" },
      {
        status: 500,
      }
    );
  }
};
