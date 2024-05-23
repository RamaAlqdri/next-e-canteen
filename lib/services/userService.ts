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
  addDoc,
  getDoc,
} from "firebase/firestore";
import { set } from "firebase/database";
import { get } from "http";

export const revalidate = 3600;

async function createUser(user: User) {
  try {
    const userRef = doc(db, "users",user.id as string);
    await setDoc(userRef,  {
      id : user.id,
      name: user.name,
      email: user.email,

      role: "user",
    });
    console.log("User created successfully");

    // Dapatkan ID pengguna yang baru dibuat
    // const userId = newUserRef.id;

    // // Perbarui dokumen pengguna dengan ID baru
    // await setDoc(doc(userRef, userId), {
    //   ...user, // Salin properti pengguna yang lain jika diperlukan
    //   _id: userId,
    // });
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
    // console.log(userData.docs[0].data());
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
async function updateUserNameByCanteenId(canteenId: string, name: string): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("canteenId", "==", canteenId),
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
async function updateUserPasswordByCanteenId(canteenId: string, password: string): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("canteenId", "==", canteenId),
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
async function updateUserRolebyCanteenId(canteenId: string, role: string): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("canteenId", "==", canteenId),
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
async function updateUserCanteenByCanteenId(
  canteenId: string,
  newCanteenId: string
): Promise<void> {
  try {
    const userRef = query(
      collection(db, "users"),
      where("canteenId", "==", canteenId),
      limit(1)
    );
    const userData = await getDocs(userRef);
    const userDoc = userData.docs[0];
    await updateDoc(doc(db, "users", userDoc.id), {
      newCanteenId,
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
async function getUserDataById(userId: string): Promise<User> {
  try {
    const userRef = doc(db, "users", userId);
    const userData = await getDoc(userRef);
    // console.log(userData.docs[0].data());
    return userData.data() as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {} as User;
  }
}

const userService = {
  getUserDataById,
  createUser,
  getUserByEmail,
  updateUserRole,
  updateUserCanteen,
  updateUserRolebyCanteenId,
  updateUserCanteenByCanteenId,
  getUserIdByEmail,
  getUserData,
  updateUserName,
  updateUserPassword,
  updateUserNameByCanteenId,
  updateUserPasswordByCanteenId,
};
export default userService;
