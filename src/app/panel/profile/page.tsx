"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile, updatePassword } from "firebase/auth";
import {
    Loader2,
    User,
    Mail,
    Lock,
    CheckCircle,
    XCircle,
    Shield,
    Edit,
    Settings,
    Calendar,
    LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvaterName } from "@/lib/auth-utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ProfilePage() {
    const { user, logout, makeBusinessAccount, settings: { accountType }, changingAccType } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    // Profile form state
    const [displayName, setDisplayName] = useState(user?.displayName || "");

    // Password form state
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Get connected providers
    useEffect(() => {
        if (user) {
            const providers = user.providerData.map(provider => provider.providerId);
            setConnectedProviders(providers);
        }
    }, [user]);

    // Check which providers are connected
    const isGoogleConnected = connectedProviders.includes('google.com');
    const isFacebookConnected = connectedProviders.includes('facebook.com');
    const isEmailConnected = connectedProviders.includes('password');

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await updateProfile(user, {
                displayName: displayName.trim()
            });
            setSuccess("Profile updated successfully!");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (newPassword !== confirmPassword) {
            setError("New passwords don't match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await updatePassword(user, newPassword);
            setSuccess("Password updated successfully!");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (!user) {
        return null; // This shouldn't happen due to ProtectedRoute, but just in case
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

            <div className="max-w-2xl mx-auto px-3 py-4 space-y-4">

                {/* Profile Header - Mobile Optimized */}
                <div className="text-center space-y-3">
                    <div className=" mx-auto w-min  rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        <Avatar className="w-20 h-20 " >
                            <AvatarImage src={user.photoURL || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                                {getAvaterName(user)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            {user.displayName || "Welcome"}
                        </h1>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                                Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="mx-1 p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mx-1 p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                        <p className="text-green-700 text-sm">{success}</p>
                    </div>
                )}

                {/* Main Content - Mobile First Layout */}
                <div className="space-y-4">
                    {/* Profile Information */}
                    <Card className="shadow-md border-0">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <div className="p-1.5 bg-green-100 rounded-lg">
                                        <User className="w-4 h-4 text-green-600" />
                                    </div>
                                    Profile Information
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                                    className="text-blue-600 hover:text-blue-700 h-8 text-xs"
                                >
                                    <Edit className="w-3 h-3 mr-1" />
                                    {isEditingProfile ? 'Cancel' : 'Edit'}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            {isEditingProfile ? (
                                <form onSubmit={handleUpdateProfile} className="space-y-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="displayName" className="text-sm font-medium">Full Name</Label>
                                        <Input
                                            id="displayName"
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className="h-10"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={user.email || ""}
                                            disabled
                                            className="h-10 bg-gray-50"
                                        />
                                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                                    </div>

                                    <div className="flex gap-2 pt-3">
                                        <Button type="submit" disabled={loading} className="flex-1 h-10">
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                "Save Changes"
                                            )}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsEditingProfile(false)}
                                            className="h-10 px-3"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <Label className="text-xs font-medium text-gray-600">Full Name</Label>
                                        <p className="text-base font-medium text-gray-900 mt-0.5">
                                            {user.displayName || "Not set"}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <Label className="text-xs font-medium text-gray-600">Email Address</Label>
                                        <p className="text-base font-medium text-gray-900 mt-0.5 break-all">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="connected-accounts"
                    >
                        <AccordionItem value="connected-accounts">
                            <AccordionTrigger className="text-left">
                                <p className="flex items-center gap-1"><Shield className="w-4 h-4 text-blue-600" /> Connected Accounts</p>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                            <Mail className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-900 text-sm">Email & Password</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    {isEmailConnected ? (
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    )}
                                </div>

                                {/* Google Provider */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-900 text-sm">Google</p>
                                            <p className="text-xs text-gray-500">
                                                {isGoogleConnected ? "Linked to your account" : "Not connected"}
                                            </p>
                                        </div>
                                    </div>
                                    {isGoogleConnected ? (
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    )}
                                </div>

                                {/* Facebook Provider */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                            <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-900 text-sm">Facebook</p>
                                            <p className="text-xs text-gray-500">
                                                {isFacebookConnected ? "Linked to your account" : "Not connected"}
                                            </p>
                                        </div>
                                    </div>
                                    {isFacebookConnected ? (
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="Change Password">
                            <AccordionTrigger className="text-left">
                                <p className="flex items-center gap-1"><Lock className="w-4 h-4 text-red-600" /> Change Password</p>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <form onSubmit={handleUpdatePassword} className="space-y-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className="h-10"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            className="h-10"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" disabled={loading} className="w-full h-10 mt-4">
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating Password...
                                            </>
                                        ) : (
                                            "Update Password"
                                        )}
                                    </Button>
                                </form>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="account-actions">
                            <AccordionTrigger className="text-left">
                                <p className="flex items-center gap-1"><Settings className="w-4 h-4 text-blue-600" /> Account Actions</p>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 texst-balance">
                                {accountType === "personal" && (
                                    <button onClick={() => {
                                        if (confirm("Are you sure you want to switch to a Business Account? This action cannot be undone.")) {
                                            makeBusinessAccount();
                                        }
                                    }} className="w-full py-2 mb-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-red-600 transition-colors">
                                        {changingAccType ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                                                Switching...
                                            </>
                                        ) : (
                                            "Switch to Business Account"
                                        )}
                                    </button>
                                )}
                                {accountType === "business" && (
                                    <button disabled className="w-full py-2 mb-2 px-4 text-sm font-medium text-white bg-gray-400 rounded-lg cursor-not-allowed">
                                        You are using a Business Account
                                    </button>
                                )}
                                <Button
                                    onClick={() => {
                                        if (confirm("Are you sure you want to sign out?")) {
                                            handleLogout();
                                        }
                                    }}
                                    variant="outline"
                                    className="w-full h-10 justify-start text-gray-700 hover:text-gray-900"
                                >
                                    <LogOut className="mr-2.5 h-4 w-4" />
                                    Sign Out
                                </Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
