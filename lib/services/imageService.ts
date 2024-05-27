import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

async function getImage(imagePath: string): Promise<string> {
  try {
    const storageRef = ref(storage, imagePath);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
}
async function deleteImage(uploadFor: string, id: string) {
  let path = "";
  if (uploadFor === "canteen") {
    path = `canteen/avatar/${id}`;
  } else if (uploadFor === "product") {
    path = `product/avatar/${id}`;
  } else if (uploadFor === "qris") {
    path = `canteen/qris/${id}`;
  } else if (uploadFor === "user") {
    path = `user/avatar/${id}`;
  } else {
    return;
  }

  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    // console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

async function uploadImage(file: any, uploadFor: string, id: string) {
  let path = "";
  if (uploadFor === "canteen") {
    path = `canteen/avatar/${id}`;
  } else if (uploadFor === "product") {
    path = `product/avatar/${id}`;
  } else if (uploadFor === "qris") {
    path = `canteen/qris/${id}`;
  } else if (uploadFor === "user") {
    path = `user/avatar/${id}`;
  } else{
    return;
  }
  try {
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, file);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

const imageService = {
  getImage,
  uploadImage,
  deleteImage,
};
export default imageService;
