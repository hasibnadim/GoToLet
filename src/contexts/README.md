# 🔥 Simplified AuthContext

This is a clean, easy-to-understand authentication context with minimal state and functions.

## ✨ What's Included

### **State (Only 4 pieces):**
- `user` - Firebase user object
- `userProfile` - User profile from backend
- `loading` - Loading state
- `error` - Error messages

### **Actions (Only 6 functions):**
- `login(email, password)` - Login with email/password
- `signup(email, password, fullName)` - Sign up new user
- `loginWithGoogle()` - Login with Google
- `loginWithFacebook()` - Login with Facebook
- `logout()` - Logout user
- `clearError()` - Clear error messages

## 🚀 How to Use

### **Basic Login Form**
```tsx
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error">
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### **Sign Up Form**
```tsx
function SignUpForm() {
  const { signup, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password, fullName);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        required
      />
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

### **Social Login Buttons**
```tsx
function SocialLogin() {
  const { loginWithGoogle, loginWithFacebook, loading } = useAuth();

  return (
    <div>
      <button onClick={loginWithGoogle} disabled={loading}>
        {loading ? 'Signing in...' : 'Login with Google'}
      </button>
      
      <button onClick={loginWithFacebook} disabled={loading}>
        {loading ? 'Signing in...' : 'Login with Facebook'}
      </button>
    </div>
  );
}
```

### **User Profile Display**
```tsx
function UserProfile() {
  const { user, userProfile, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.displayName || 'User'}!</h1>
      <p>Email: {user.email}</p>
      
      {userProfile && (
        <div>
          <p>Phone: {userProfile.phone}</p>
          <p>City: {userProfile.city}</p>
          <p>Account Type: {userProfile.accountType}</p>
        </div>
      )}
      
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### **Protected Route Component**
```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to access this page</div>;
  }

  return <>{children}</>;
}
```

## 🔄 How It Works

1. **Firebase Authentication**: Handles login/signup with Firebase
2. **Backend Integration**: Automatically syncs with your backend API
3. **State Management**: Simple state updates on auth changes
4. **Error Handling**: Clear error messages for users
5. **Auto Redirect**: Redirects to home page after successful auth

## 🎯 Key Benefits

✅ **Simple** - Only 4 state variables, 6 functions
✅ **Clean** - No complex callbacks or multiple effects
✅ **Fast** - Minimal re-renders and API calls
✅ **Reliable** - Proper error handling and loading states
✅ **Integrated** - Works with both Firebase and your backend

## 🛠️ What Happens Behind the Scenes

1. User calls `login()` or `signup()`
2. Firebase authenticates the user
3. AuthContext gets Firebase ID token
4. Sends token to backend `/api/auth/login`
5. Backend creates user in MongoDB if needed
6. Backend sends back user profile
7. AuthContext updates state
8. User is redirected to home page

It's that simple! 🎉