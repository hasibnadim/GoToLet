"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import AuthHeader from "./_comp/AuthHeader";
import SocialAuthButtons from "./_comp/SocialAuthButtons";
import EmailAuthForm from "./_comp/EmailAuthForm";
import AuthToggle from "./_comp/AuthToggle";
import TermsNotice from "./_comp/TermsNotice";
import ErrorDisplay from "./_comp/ErrorDisplay";
export const dynamic = "force-static";
export default function Login() {
  // const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const { loading, error, login, signup, loginWithGoogle } = useAuth();

  // Initialize signup state from URL
  // useEffect(() => {
  //   setIsSignUp(searchParams.get('mode') === 'signup');
  // }, [searchParams]);

  // Update document title based on mode
  useEffect(() => {
    document.title = isSignUp ? 'Sign Up - Go2Let' : 'Sign In - Go2Let';
  }, [isSignUp]);

  // Handle mode toggle with URL update
  const handleToggleMode = () => {
    const newMode = !isSignUp;
    setIsSignUp(newMode);

    // Update URL without page reload
    //   if (newMode) {
    //     router.replace('/auth/login?mode=signup');
    //   } else {
    //     router.replace('/auth/login');
    //   }
  };

  const onEmailSubmit = (email: string, password: string, confirmPassword?: string, fullName?: string) => {
    if (isSignUp) {
      signup(email, password, fullName || "");
    } else {
      login(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">

      <div className="flex items-center justify-center p-3 lg:p-5">
        <div className="w-full max-w-md space-y-6">

          <AuthHeader isSignUp={isSignUp} />

          <ErrorDisplay error={error} />

          <SocialAuthButtons
            onGoogleAuth={loginWithGoogle}
            loading={loading}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <EmailAuthForm
            isSignUp={isSignUp}
            onSubmit={onEmailSubmit}
            loading={loading}
          />

          <AuthToggle
            isSignUp={isSignUp}
            onToggle={handleToggleMode}
          />

          <TermsNotice isSignUp={isSignUp} />

        </div>
      </div>
    </div>
  );
}
