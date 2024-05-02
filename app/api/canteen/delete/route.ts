import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { User } from "@/lib/models/UserModel";
import { Canteen } from "@/lib/models/CanteenModel";
import canteenService from "@/lib/services/canteenService";
import userService from "@/lib/services/userService";
import { getSession, useSession } from "next-auth/react";

export const POST = async (request: NextRequest) => {
  //   const session = useSession();

  const { slugBefore,session } = await request.json();
  console.log(session);
  console.log(slugBefore);

  //   const hashedPassword = bcrypt.hashSync(password, 5);
//   const slug = name.toLowerCase().replace(/ /g, "-");

  

  try {
    // canteenService.createCanteen(newCanteen);
    canteenService.deleteCanteenData(slugBefore);
    userService.updateUserRole(session.user.email, "user");
    userService.updateUserCanteen(session.user.email, "");
    // userService.createUser(newUser);

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
