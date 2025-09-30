"use client";

import { useState } from "react";
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider, reauthenticateWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DeleteAccount() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<'confirm' | 'reauthenticate' | 'processing' | 'done'>('confirm');
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  // Redirect if not logged in (client-side guard)
  if (!user) {
    if (typeof window !== 'undefined') router.push('/auth/login');
    return null;
  }

  const handleReauthentication = async () => {
    setLoading(true);
    setError("");
    try {
      // Determine provider via current Firebase user (AuthContext has sanitized userAccount only)
      const fbUser = auth.currentUser;
      if (!fbUser) throw new Error('No active auth session');
      const providerId = fbUser.providerData[0]?.providerId;

      if (providerId === 'password') {
        if (!password) {
          setError('Please enter your password');
          setLoading(false);
          return;
        }
        const credential = EmailAuthProvider.credential(fbUser.email || '', password);
        await reauthenticateWithCredential(fbUser, credential);
      } else if (providerId === 'google.com') {
        await reauthenticateWithPopup(fbUser, googleProvider);
      } else if (providerId === 'facebook.com') {
        await reauthenticateWithPopup(fbUser, facebookProvider);
      }
      setStep('processing');
      await deleteUserAccount();
    } catch (e: any) {
      setError(e?.message || 'Reauthentication failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async () => {
    try {
      setLoading(true);
      // Call backend API to log & remove profile + admin auth deletion
      const res = await fetch('/api/auth/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, feedback })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete account');
      }
      // Delete firebase user client side (optional, backend tries too)
      const fbUser = auth.currentUser;
      try { if (fbUser) await deleteUser(fbUser); } catch (e) { /* ignore */ }
      setStep('done');
      // Logout context (clears state & cookie already cleared by backend)
      await logout();
      router.push('/?deleted=true');
    } catch (e: any) {
      setError(e?.message || 'Account deletion failed');
      setStep('reauthenticate');
    } finally {
      setLoading(false);
    }
  };

  const getProviderName = () => {
    const fbUser = auth.currentUser;
    const providerId = fbUser?.providerData[0]?.providerId;
    switch (providerId) {
      case 'password': return 'Email/Password';
      case 'google.com': return 'Google';
      case 'facebook.com': return 'Facebook';
      default: return 'Unknown';
    }
  };

  // const requiresPassword = user?.providerData[0]?.providerId === 'password';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-red-200">
          {/* Header */}
          <div className="border-b border-red-200 p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Delete Account</h1>
            <p className="text-gray-600">
              Permanently delete your Go2Let account and all associated data
            </p>
          </div>

          <div className="p-6">
            {step === 'confirm' && (
              <div className="space-y-6">
                {/* Warning */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ This action cannot be undone</h3>
                  <p className="text-red-700 text-sm">
                    Deleting your account will permanently remove all your data, including:
                  </p>
                  <ul className="list-disc list-inside text-red-700 text-sm mt-2 space-y-1">
                    <li>Your profile information and preferences</li>
                    <li>Property search history and saved listings</li>
                    <li>Booking history and rental records</li>
                    <li>Messages and communication history</li>
                    <li>Reviews and ratings you&apos;ve provided</li>
                    <li>Payment methods and transaction history</li>
                  </ul>
                </div>

                {/* Account Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Type:</span>
                      {/* <span className="font-medium">{getProviderName()}</span> */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member Since:</span>
                      <span className="font-medium">
                        {/* {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'} */}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deletion Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why are you deleting your account? (Optional)
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a reason</option>
                    <option value="found-housing">Found housing elsewhere</option>
                    <option value="no-longer-needed">No longer need housing</option>
                    <option value="poor-experience">Poor user experience</option>
                    <option value="privacy-concerns">Privacy concerns</option>
                    <option value="technical-issues">Technical issues</option>
                    <option value="better-alternative">Found a better alternative</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional feedback (Optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Help us improve by sharing your experience..."
                  />
                </div>

                {/* Alternatives */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Before you go...</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Consider these alternatives instead of deleting your account:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-blue-700">Update your privacy settings to limit data usage</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-blue-700">Temporarily deactivate your account instead</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-blue-700">Contact support to resolve any issues</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link
                    href="/"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <Link
                    href="/info/contact-us"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </Link>
                  <button
                    onClick={() => setStep('reauthenticate')}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Continue with Deletion
                  </button>
                </div>
              </div>
            )}

            {step === 'reauthenticate' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirm Your Identity</h2>
                  <p className="text-gray-600">
                    For security reasons, please confirm your identity before deleting your account.
                  </p>
                </div>
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
                {auth.currentUser?.providerData[0]?.providerId === 'password' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your password to confirm
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-700 text-sm">
                      You will be asked to sign in with {getProviderName()} again to confirm deletion.
                    </p>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('confirm')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleReauthentication}
                    disabled={loading || (auth.currentUser?.providerData[0]?.providerId === 'password' && !password)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Confirming...
                      </div>
                    ) : (
                      'Confirm and Delete'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* {requiresPassword ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your password to confirm
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-700">
                      You&apos;ll be asked to sign in with {getProviderName()} to confirm your identity.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('confirm')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleReauthentication}
                    disabled={loading || (requiresPassword && !password)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Confirming...
                      </div>
                    ) : (
                      'Confirm and Delete Account'
                    )}
                  </button>
                </div>
              </div>
            )} */}

            {step === 'processing' && (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Deleting Your Account</h2>
                  <p className="text-gray-600">
                    Please wait while we permanently delete your account and all associated data...
                  </p>
                </div>
              </div>
            )}
            {step === 'done' && (
              <div className="text-center space-y-6">
                <div className="text-green-600 text-5xl">✓</div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Deleted</h2>
                  <p className="text-gray-600">Redirecting you to home...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By deleting your account, you acknowledge that you have read and understood our{" "}
            <Link href="/info/privacy-policy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/info/terms-of-service" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
