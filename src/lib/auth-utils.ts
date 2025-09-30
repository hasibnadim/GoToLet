import { UserAccount } from "@/contexts/AuthContext";

export function getAvaterName(user: UserAccount): string {
  // if has displayName, use it
  if (user.displayName) {
    const parts = user.displayName.split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    } else if (parts.length >= 2) {
      return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
    }
  } else if (user.email) {
    const parts = user.email.split("@")[0].split(".");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    } else if (parts.length >= 2) {
      return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
    }
  }

  // fallback to initials
  return "GL"; // Go2Let
}