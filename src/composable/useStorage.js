import { uid } from "uid";
import { useFirebaseStorage } from "vuefire";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { errorStorage } from "@/validations/firebase";
import imageCompression from "browser-image-compression";
import { extractFileName } from "@/helpers";

function useStorage() {
  const storage = useFirebaseStorage();

  const addImagePostToStorage = async (file) => {
    try {
      const fileName = uid() + "." + file.name.split(".").pop();

      // Compress the image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });

      // Configure where to store
      const sRef = storageRef(storage, `posts_images/${fileName}`);
      // Upload
      const snapshot = await uploadBytes(sRef, compressedFile);
      // Get download URL
      const url = await getDownloadURL(snapshot.ref);
      return { success: true, message: "Imagen guardada", url };
    } catch (error) {
      console.log("error:", error);
      return { success: false, message: errorStorage[error.code] || "Error desconocido.", url: null };
    }
  };

  const updateImagePostToStorage = async (oldUrl, file) => {
    try {
      const path = extractFileName(oldUrl);
      // Delete the previous file
      const desertRef = storageRef(storage, path);
      await deleteObject(desertRef);
      // Compress the new image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });
      const fileName = uid() + "." + file.name.split(".").pop();
      // Configure where to store
      const sRef = storageRef(storage, `posts_images/${fileName}`);
      // Upload
      const snapshot = await uploadBytes(sRef, compressedFile);
      // Get download URL
      const url = await getDownloadURL(snapshot.ref);
      return { success: true, message: "Imagen actualizada", url };
    } catch (error) {
      console.log("error:", error);
      return { success: false, message: errorStorage[error.code] || "Error desconocido.", url: null };
    }
  };

  const deleteImagePostFromStorage = async (path) => {
    try {
      const desertRef = storageRef(storage, path);
      // Delete the file
      await deleteObject(desertRef);
      return { success: true, message: "success" };
    } catch (error) {
      console.log("error:", error);
      return { success: false, message: errorStorage[error.code] || "Error desconocido." };
    }
  };

  return { addImagePostToStorage, updateImagePostToStorage, deleteImagePostFromStorage };
}

export default useStorage;
