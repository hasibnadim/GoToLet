import Link from "next/link";

interface TermsNoticeProps {
  isSignUp: boolean;
}

export default function TermsNotice({ isSignUp }: TermsNoticeProps) {
  if (!isSignUp) return null;

  return (
    <div className="text-center">
      <p className="text-xs text-gray-500">
        By creating an account, you agree to our{" "}
        <Link href="/info/terms-of-service" className="text-blue-600 hover:text-blue-500">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/info/privacy-policy" className="text-blue-600 hover:text-blue-500">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
