import { cache } from "react";
import { Product } from "../models/ProductModels";
import { db } from "../firebase";
import {User} from "@/lib/models/UserModel";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { set } from "firebase/database";

export const revalidate = 3600;

async function createUser(user : User) {
  try {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef), {
      name: user.name,
      email: user.email,
      password: user.password,
      role: "user",
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
async function getUserByEmail(email: string): Promise<User> {
  try {
    const userRef = query(collection(db, "users"), where("email", "==", email), limit(1));
    const userData = await getDocs(userRef);
    return userData.docs[0].data() as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {} as User;
  }
}
async function getUserIdByEmail(email: string): Promise<string> {
    try {
      const userRef = query(collection(db, "users"), where("email", "==", email), limit(1));
      const userData = await getDocs(userRef);
      if (userData.empty) {
        // User with the provided email not found
        return "";
      } else {
        // Return the Firebase Authentication UID associated with the user
        return userData.docs[0].data().uid || "";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "";
    }
  }


const userService = {
    createUser,
    getUserByEmail,
  };
  export default userService;