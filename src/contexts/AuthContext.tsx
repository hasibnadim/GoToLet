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
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

// Simple User Account Type
export interface UserAccount {
  firstName: string;
  lastName: string;
  displayName: string;
  uid: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  photoURL?: string;
  emailVerified?: boolean;
  accountType: "personal" | "business";
  systemRole?: "user" | "admin" | "superadmin";
}

// Simple Auth Context Type
interface AuthContextType {
  // State
  user: UserAccount | null;
  status: "authenticated" | "loading" | "unauthenticated";
  loading: boolean;
  error: string;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Simple State - only what we need
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"authenticated" | "loading" | "unauthenticated">("loading");
  const [error, setError] = useState("");

  const router = useRouter();
  // Helper function to handle backend authentication
  const authenticateWithBackend = (firebaseUser: User): Promise<UserAccount> => new Promise(async (resolve, reject) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        const result = await response.json(); 
        resolve(result.user as UserAccount);
      } else {
        reject('Backend login failed');
      }
    } catch (error) {
      reject('Backend authentication failed');
    }
  });

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        authenticateWithBackend(firebaseUser).then((userData) => {
          setUser(userData);
          setStatus("authenticated");
        }).catch((error) => {
          console.error(error);
          setError("Failed to authenticate with backend");
          setUser(null);
          setStatus("unauthenticated");
        }).finally(() => {
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }

    });

    return unsubscribe;
  }, []);

  // Clear error message
  const clearError = () => setError("");

  // Login with email and password
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: unknown) {
      setError((error as Error).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signup = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with full name
      if (userCredential.user && fullName) {
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
      }

      router.push("/");
    } catch (error: any) {
      setError(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error: unknown) {
      setError((error as Error).message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };



  // Logout
  const logout = async () => {
    try {
      // Logout from backend
      await fetch('/api/auth', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Backend logout failed:', error);
    }

    // Logout from Firebase
    await signOut(auth);
    setUser(null);
    setStatus("unauthenticated");
    router.push("/");
  };

  // Context value
  const value: AuthContextType = {
    // State 
    user,
    status,
    loading,
    error,

    // Actions
    login,
    signup,
    loginWithGoogle,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
