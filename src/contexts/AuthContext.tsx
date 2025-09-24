"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider, facebookProvider, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

interface ISettings {
  accountType: "personal" | "business"
}

interface AuthContextType {
  // Auth State
  settings: ISettings;
  user: User | null;
  loading: boolean;
  error: string;
  changingAccType: boolean;
  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, confirmPassword: string, fullName?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  makeBusinessAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  settings: { accountType: "personal" },
  loading: true,
  changingAccType: false,
  error: "",
  login: async () => { },
  signup: async () => { },
  loginWithGoogle: async () => { },
  loginWithFacebook: async () => { },
  logout: async () => { },
  clearError: () => { },
  makeBusinessAccount: async () => { }
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<ISettings>({ accountType: "personal" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [changingAccType, setChangingAccType] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user?.uid)
        fetchUserSettings(user.uid);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError("");
  const fetchUserSettings = async (uid: string) => {
    // Fetch user settings from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      setSettings((prevSettings) => ({ ...prevSettings, ...userDoc.data() as ISettings }));
    }
  };
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, confirmPassword: string, fullName?: string) => {
    setLoading(true);
    setError("");
    try {
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      if (!fullName || fullName.trim().length < 2) {
        setError("Please enter your full name");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with full name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName.trim()
        });
      }

      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, facebookProvider);
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Facebook login failed');
    } finally {
      setLoading(false);
    }
  };

  const makeBusinessAccount = async () => {
    setChangingAccType(true);
    setError("");

    try {
      if (user?.uid) {
        await setDoc(doc(collection(db, "users"), user.uid), {
          accountType: "business"
        });
      }
      // await updateProfile(auth.currentUser, {
      //   displayName: "Business Account"
      // });
      // setSettings({ accountType: "business" });
      // router.push("/");
      setSettings(prevSettings => ({ ...prevSettings, accountType: "business" }));
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message || 'Failed to upgrade to business account' : 'Failed to upgrade to business account');
    } finally {
      setChangingAccType(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    settings,
    loading: loading,
    changingAccType,
    error,
    login,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    makeBusinessAccount,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
