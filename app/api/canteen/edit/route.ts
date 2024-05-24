import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { User } from "@/lib/models/UserModel";
import { Canteen } from "@/lib/models/CanteenModel";
import canteenService from "@/lib/services/canteenService";
import userService from "@/lib/services/userService";
import { getSession, useSession } from "next-auth/react";

export const POST = async (request: NextRequest) => {
  //   const session = useSession();

  const { slugBefore, name, location, description } = await request.json();

  //   const hashedPassword = bcrypt.hashSync(password, 5);
  const slug = name.toLowerCase().replace(/ /g, "-");
  const existingCanteen = await canteenService.getCanteenBySlug(slug);
  if (slugBefore !== slug) {
    if (existingCanteen.name) {
      // console.error("Canteen already exists.");
      return Response.json(
        { message: "Canteen already exists." },
        {
          status: 400,
        }
      );
    }
  }
  const newCanteen = {
    name,
    location,
    description,
    // image: "/images/canteen/canteen1.jpg",
    // numReviews: 0,
    // rating: 0,
    slug,
  } as Canteen;
  // console.log(newCanteen);
  try {
    // canteenService.createCanteen(newCanteen);
    canteenService.updateCanteenData(slugBefore, newCanteen);
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
