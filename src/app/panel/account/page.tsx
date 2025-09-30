'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Loader2, Edit3, CheckCircle, XCircle, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

// Simple form data interface
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    dateOfBirth: string;
    gender: string;
    bio: string;
    photoURL: string;
    accountType: "personal" | "business";
}

export default function AccountPage() {
    const { user, loading } = useAuth();

    // Simple state management
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'Bangladesh',
        dateOfBirth: '',
        gender: 'male',
        bio: '',
        photoURL: '',
        accountType: 'personal'
    });

    const [upgrading, setUpgrading] = useState<boolean>(false);
    const [showUpgradeConfirm, setShowUpgradeConfirm] = useState(false);

    // Handler for upgrading to business account
    const handleUpgradeAccount = async (): Promise<void> => {
        if (!user) return;
        if (formData.accountType === 'business') return;
        setUpgrading(true);
        try {
            const response = await fetch('/api/auth', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, accountType: 'business' })
            });
            if (!response.ok) throw new Error('Failed to upgrade');
            setFormData(prev => ({ ...prev, accountType: 'business' }));
            setShowUpgradeConfirm(false);
            alert('Account upgraded to Business!');
        } catch (err) {
            console.error('Upgrade error:', err);
            alert('Failed to upgrade account. Please try again.');
        } finally {
            setUpgrading(false);
        }
    };

    // Load user data into form
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                city: user.city || '',
                country: user.country || 'Bangladesh',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || 'male',
                bio: user.bio || '',
                photoURL: user.photoURL || '',
                accountType: user.accountType || 'personal'
            });
        }
    }, [user]);

    // Simple handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'phone' ? value.replace(/[^\d+\s-()]/g, '') : value
        }));
    };

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        try {
            const response = await fetch('/api/auth', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    // Get connected providers
    const connectedProviders: string[] = [];
    const isEmailConnected = connectedProviders.includes('password');
    const isGoogleConnected = connectedProviders.includes('google.com');
    const isFacebookConnected = connectedProviders.includes('facebook.com');

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your personal information</p>
                    {formData.accountType === 'business' && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full mt-2">
                            Business Account
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3 ml-auto">
                    {formData.accountType !== 'business' && (
                        <button
                            onClick={() => setShowUpgradeConfirm(true)}
                            disabled={upgrading}
                            className="flex items-center gap-2 border border-purple-300 text-purple-700 hover:bg-purple-50 disabled:opacity-60 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            {upgrading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Briefcase className="w-4 h-4" />
                            )}
                            {upgrading ? 'Upgrading...' : 'Upgrade to Business'}
                        </button>
                    )}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        disabled={saving || upgrading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Picture Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                {formData.photoURL || user?.photoURL ? (
                                    <Image
                                        src={formData.photoURL || user?.photoURL || ''}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                        width={128}
                                        height={128}
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                        <span className="text-white text-4xl font-bold">
                                            {formData.firstName.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                )}
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mt-4">
                                {formData.firstName || formData.lastName ?
                                    `${formData.firstName} ${formData.lastName}`.trim() :
                                    user?.displayName || 'User'
                                }
                            </h3>
                            <p className="text-gray-500">{formData.email || user?.email}</p>
                            {/* <p className="text-sm text-blue-600 mt-1">
                                Member since {user?.metadata.creationTime ?
                                    new Date(user.metadata.creationTime).toLocaleDateString() :
                                    'Recently'
                                }
                            </p> */}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 my-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Accounts</h2>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                    <Mail className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-gray-900 text-sm">Email & Password</p>
                                    <p className="text-xs text-gray-500 truncate">{user!.email}</p>
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
                    </div>
                </div>

                {/* Profile Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Simple form fields */}
                            {[
                                { name: 'firstName', label: 'First Name', type: 'text', icon: User },
                                { name: 'lastName', label: 'Last Name', type: 'text', icon: User },
                                { name: 'phone', label: 'Phone', type: 'tel', icon: Phone },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {field.label}
                                    </label>
                                    <div className="relative">
                                        <field.icon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name as keyof FormData] as string}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                >
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="India">India</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Nepal">Nepal</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    rows={3}
                                    maxLength={500}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                        </div>

                        {/* Simple Account Info */}
                        <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">User ID:</span>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-mono truncate max-w-[240px]" title={user?.uid || ''}>{user?.uid || 'N/A'}</code>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Account Type:</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${formData.accountType === 'business'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {formData.accountType === 'business' ? 'Business' : 'Personal'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Email Verified:</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${user?.emailVerified
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {user?.emailVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEditing ? (
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    disabled={saving}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg flex items-center"
                                >
                                    {saving ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4 mr-2" />
                                    )}
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Upgrade Confirmation Modal */}
            {showUpgradeConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
                    <div className="absolute inset-0 bg-black/50" onClick={() => !upgrading && setShowUpgradeConfirm(false)} />
                    <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg border border-red-200">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-md bg-red-100 text-red-600">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Upgrade to Business?</h3>
                            </div>
                            <p className="text-sm text-gray-700 mb-3 font-medium">This action cannot be undone.</p>
                            <p className="text-xs text-gray-600 mb-4">Upgrading will permanently convert your account to a Business account. You will receive a public business badge and may be required to provide additional verification later.</p>
                            <ul className="list-disc list-inside text-xs text-gray-500 mb-5 space-y-1">
                                <li>Unlock advanced property management tools</li>
                                <li>Gain trust with a Business badge</li>
                                <li>Subject to future verification policies</li>
                            </ul>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowUpgradeConfirm(false)}
                                    disabled={upgrading}
                                    className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleUpgradeAccount}
                                    disabled={upgrading}
                                    className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 disabled:opacity-60"
                                >
                                    {upgrading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {upgrading ? 'Upgrading...' : 'Yes, Upgrade Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}