interface AuthHeaderProps {
  isSignUp: boolean;
}

export default function AuthHeader({ isSignUp }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h1>
      <p className="text-gray-600">
        {isSignUp
          ? "Join thousands of students finding their perfect home"
          : "Sign in to access your account and continue your housing search"
        }
      </p>
    </div>
  );
}
