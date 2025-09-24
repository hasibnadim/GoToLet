# Authentication Components

This directory contains modular authentication components for the login/signup functionality.

## Components

### `AuthHeader.tsx`
- Displays the title and description for the auth page
- Props: `isSignUp` (boolean)

### `SocialAuthButtons.tsx`
- Contains Google and Facebook authentication buttons
- Props: `onGoogleAuth`, `onFacebookAuth`, `loading`

### `EmailAuthForm.tsx`
- Email/password form with conditional confirm password field
- Includes remember me checkbox and forgot password link
- Props: `isSignUp`, `onSubmit`, `loading`

### `AuthToggle.tsx`
- Toggle button to switch between sign in and sign up
- Props: `isSignUp`, `onToggle`

### `TermsNotice.tsx`
- Displays terms of service and privacy policy links (only for signup)
- Props: `isSignUp`

### `ErrorDisplay.tsx`
- Shows error messages using shadcn Alert component
- Props: `error`

## Authentication Context

### `AuthContext.tsx` (in `/src/contexts/`)
- **Single source of truth** for all authentication logic
- Provides both **state management** and **authentication actions**
- Available throughout the app via React Context

#### Auth State:
- `user` - Current authenticated user
- `loading` - Loading state for auth operations
- `error` - Error messages

#### Auth Actions:
- `login(email, password)` - Email/password sign in
- `signup(email, password, confirmPassword)` - Create new account
- `loginWithGoogle()` - Google OAuth
- `loginWithFacebook()` - Facebook OAuth
- `logout()` - Sign out user
- `clearError()` - Clear error messages

#### Usage:
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, login, logout } = useAuth();
  // Use auth state and actions
}
```

## Benefits of this structure:

1. **Single Source of Truth**: One context handles all auth logic
2. **Global State**: User state available throughout the app
3. **Modularity**: Each UI component has a single responsibility
4. **Reusability**: Components can be reused in other auth-related pages
5. **Maintainability**: Easy to update individual components without affecting others
6. **Testing**: Each component can be tested in isolation
7. **Clean Code**: The main page is much cleaner and easier to understand
8. **Consistent UI**: Uses shadcn components for consistent styling
