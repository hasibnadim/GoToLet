"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  isBusiness?: boolean;
}

export default function ProtectedRoute({ children, redirectTo = "/auth/login", isBusiness }: ProtectedRouteProps) {
  const { user, loading, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (status === "unauthenticated") {
        router.replace(redirectTo);
      }
      if (isBusiness && user?.accountType !== 'business') {
        router.replace(redirectTo);
      }
    }
  }, [user, loading, router, redirectTo, isBusiness,status]);

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isBusiness && user?.accountType !== 'business') {
    return null; // Will redirect in useEffect
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
