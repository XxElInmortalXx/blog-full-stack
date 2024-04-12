import { useFirestore as useFirestoreVueFire } from "vuefire";
import { errorFirestore } from "../validations/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { query } from "firebase/database";
import { getCurrentDate } from "@/helpers";

function useFirestore() {
  const db = useFirestoreVueFire();

  const addPost = async ({ title, description, content, url, author, email }) => {
    try {
      await addDoc(collection(db, "blog_posts"), {
        title,
        description,
        content,
        image_post: url,
        email,
        author,
        created_at: getCurrentDate(),
        updated_at: getCurrentDate(),
      });
      return { success: true, message: "Post creado correctamente" };
    } catch (error) {
      console.log("error:", error);
      return { success: false, message: errorFirestore[error.code] || "Error desconocido." };
    }
  };

  const updatePost = async (docId, { title, description, content, url, author, email }) => {
    try {
      await updateDoc(doc(db, "blog_posts", docId), {
        title,
        description,
        content,
        image_post: url,
        email,
        author,
        updated_at: getCurrentDate(),
      });
      return { success: true, message: "Post actualizado correctamente" };
    } catch (error) {
      console.log("error:", error);
      return { success: false, message: errorFirestore[error.code] || "Error desconocido." };
    }
  };

  const getPosts = async (limitDoc = 25, lastDoc = null) => {
    try {
      const q = query(
        collection(db, "blog_posts"),
        orderBy("created_at"),
        limit(limitDoc),
        startAfter(lastDoc)
      );
      const querySnapshot = await getDocs(q);
      return { success: true, message: "Post Cargados correctamente", querySnapshot };
    } catch (error) {
      console.error("error:", error);
      return { success: false, message: errorFirestore[error.code] || "Error desconocido.", querySnapshot: null };
    }
  };

  const getPostById = async (docId) => {
    try {
      const docRef = doc(db, "blog_posts", docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { success: true, message: "Post Cargado Correctamente", id: docSnap.id, ...docSnap.data() };
      } else {
        return { success: false, message: "Post no encontrado" };
      }
    } catch (error) {
      console.log("error:" ,error);
      return { success: false, message: errorFirestore[error.code] || "Error desconocido." };
    }
  };

  const getPostByUser = async (limitDoc = 25, lastDoc = null, email) => {
    try {
      const q = query(
        collection(db, "blog_posts"),
        where("email", "==", email),
        orderBy("created_at"),
        limit(limitDoc),
        startAfter(lastDoc),
      );
      const querySnapshot = await getDocs(q);
      return { success: true, message: "Post Cargados correctamente", querySnapshot };
    } catch (error) {
      console.error("error:", error);
      return { success: false, message: errorFirestore[error.code] || "Error desconocido.", querySnapshot: null };
    }
  };
  
  const deletePostById = async (docId) => {
    try {
      await deleteDoc(doc(db, "blog_posts", docId));
      return { success: true, message: "Post eliminado correctamente" };
    } catch (error) {
      console.log("error:", error)
      return { success: false, message: errorFirestore[error.code] || "Error desconocido." };
    }
  };


  return {
    addPost,
    getPostByUser,
    getPosts,
    getPostById,
    deletePostById,
    updatePost
  };
}

export default useFirestore;
