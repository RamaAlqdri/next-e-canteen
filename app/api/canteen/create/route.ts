import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { User } from "@/lib/models/UserModel";
import { Canteen } from "@/lib/models/CanteenModel";
import canteenService from "@/lib/services/canteenService";
import userService from "@/lib/services/userService";
import { getSession, useSession } from "next-auth/react";
import { nanoid } from "nanoid";

export const POST = async (request: NextRequest) => {
  //   const session = useSession();

  const { name, location, description, email,phone,id,image,qris } = await request.json();



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
  const newCanteen = {
    id,
    name,
    location,
    description,
    image,
    qris,
    numReviews: 0,
    rating: 0,
    slug,
    phone,
  } as Canteen;
  try {

    // canteenService.
    // const id = `CTN-${nanoid(4)}-${nanoid(8)}`;
    canteenService.createCanteen(newCanteen,id);
    // const canteenId = await canteenService.getCanteenIdBySlug(slug);
    userService.updateUserRole(email, "canteen");
    userService.updateUserCanteen(email, id);
    // userService.createUser(newUser);

    return Response.json(
      { message: "Kantin Berhasil Dibuat" },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: "Gagal membuat kantin" },
      {
        status: 500,
      }
    );
  }
};
