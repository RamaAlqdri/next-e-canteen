import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import {User} from "@/lib/models/UserModel";
import userService from "@/lib/services/userService";
import toast from "react-hot-toast";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  const hashedPassword = bcrypt.hashSync(password, 5);

  const existingUser = await userService.getUserByEmail(email);
  if (existingUser.email) {
    toast.error("User already exists");
    return Response.json(
      { message: "User already exists" },
      {
        status: 400,
      }
    );
  }


  const newUser = ({
    name,
    email,
    password: hashedPassword,
    role: "user",
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
