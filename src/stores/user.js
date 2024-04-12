import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { errorAuth, errorFirestore } from "../validations/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useFirestore } from "vuefire";

export const useUserStore = defineStore("user", () => {
  const auth = useFirebaseAuth();
  const db = useFirestore();
  const authUser = ref(null);

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      } else {
        authUser.value = null;
      }
    });
  });

  const register = async ({ username, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        username: userCredential.user.displayName,
        email: email,
      });
      return {success: true, message: "success"}
    } catch (error) {
      console.log("error:", error);
      return {success: false, message: errorAuth[error.code] || errorFirestore[error.code] || "Error desconocido."};
    }
  };

  const login = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {success: true, message: "success"};
    } catch (error) {
      console.log("error:", error);
      return {success: false, message: errorAuth[error.code] || errorFirestore[error.code] || "Error desconocido."};
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      authUser.value = null
      return { success: true, message: "success" };
    } catch (error) {
      console.log("error:", error);
      return { success: false, message: errorAuth[error.code] || "Error desconocido." };
    }
  };

  return { authUser, register, login, logout };
});

export default useUserStore;
