import { cache } from "react";
import { Product } from "../models/ProductModels";
import { db } from "../firebase";
import { User } from "@/lib/models/UserModel";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { set } from "firebase/database";
import { get } from "http";

export const revalidate = 3600;

async function createUser(user: User) {
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
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );

    const userData = await getDocs(userRef);
    console.log(userData.docs[0].data());
    return userData.docs[0].data() as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {} as User;
  }
}
async function updateUserName(email: string, name: string): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );
    const userData = await getDocs(userRef);
    const userDoc = userData.docs[0];
    await updateDoc(doc(db, "users", userDoc.id), {
      name,
    });
  } catch (error) {
    console.error("Error updating user name:", error);
  }
}
async function updateUserPassword(email: string, password: string): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );
    const userData = await getDocs(userRef);
    const userDoc = userData.docs[0];
    await updateDoc(doc(db, "users", userDoc.id), {
      password,
    });
  } catch (error) {
    console.error("Error updating user password:", error);
  }
}
async function updateUserRole(email: string, role: string): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );
    const userData = await getDocs(userRef);
    const userDoc = userData.docs[0];
    await updateDoc(doc(db, "users", userDoc.id), {
      role,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
  }
}
async function updateUserCanteen(
  email: string,
  canteenId: string
): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );
    const userData = await getDocs(userRef);
    const userDoc = userData.docs[0];
    await updateDoc(doc(db, "users", userDoc.id), {
      canteenId,
    });
  } catch (error) {
    console.error("Error updating user canteen:", error);
  }
}
async function getUserIdByEmail(email: string): Promise<string> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );
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
async function getUserData(email: string): Promise<User> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );
    const userData = await getDocs(userRef);
    // console.log(userData.docs[0].data());
    return userData.docs[0].data() as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {} as User;
  }
}

const userService = {
  createUser,
  getUserByEmail,
  updateUserRole,
  updateUserCanteen,
  getUserIdByEmail,
  getUserData,
  updateUserName,
  updateUserPassword,
};
export default userService;
