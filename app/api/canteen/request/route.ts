import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { User } from "@/lib/models/UserModel";
import { Canteen } from "@/lib/models/CanteenModel";
import canteenService from "@/lib/services/canteenService";
import userService from "@/lib/services/userService";
import { getSession, useSession } from "next-auth/react";

export const POST = async (request: NextRequest) => {
  //   const session = useSession();

  const { name, location, description, session, phone,id,imageUrl,qrisUrl } = await request.json();
  // console.log(session);

  // console.log(name, location, description, phone);

  //   const hashedPassword = bcrypt.hashSync(password, 5);
  const slug = name.toLowerCase().replace(/ /g, "-");
  // const existingCanteen = await canteenService.getCanteenBySlug(slug);
  // if (existingCanteen.name) {
  //   // console.error("Canteen already exists.");
  //   return Response.json(
  //     { message: "Canteen already exists." },
  //     {
  //       status: 400,
  //     }
  //   );
  // }
  const user = {
    email: session.user.email,
    name: session.user.name,
  } as User;

  const newCanteen = {
    id,
    name,
    location,
    description,
    image: imageUrl,
    qris: qrisUrl,
    numReviews: 0,
    rating: 0,
    slug,
    phone,
  } as Canteen;
  try {
    canteenService.createRequestCanteen(newCanteen, user as any);
    // canteenService.createCanteen(newCanteen);
    // const canteenId = await canteenService.getCanteenIdBySlug(slug);
    // userService.updateUserRole(session.user.email, "canteen");
    // userService.updateUserCanteen(session.user.email, canteenId);
    // userService.createUser(newUser);

    return Response.json(
      { message: "Permintaan Kantin telah dibuat" },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: "Permintaan Kantin gagal dibuat" },
      {
        status: 500,
      }
    );
  }
};
