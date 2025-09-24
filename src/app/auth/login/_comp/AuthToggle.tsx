import { Button } from "@/components/ui/button";

interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: () => void;
}

export default function AuthToggle({ isSignUp, onToggle }: AuthToggleProps) {
  return (
    <div className="text-center">
      <p className="text-gray-600">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button
          variant="link"
          onClick={onToggle}
          className="p-0 h-auto font-medium"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </p>
    </div>
  );
}
