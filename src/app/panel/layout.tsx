'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  CreditCard,
  Home,
  Heart,
  Settings,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/panel",
    icon: Home,
  },
  {
    name: "Account",
    href: "/panel/account",
    icon: User,
  },
  {
    name: "Wallet",
    href: "/panel/wallet",
    icon: CreditCard,
  },
  {
    name: "Current Services",
    href: "/panel/current-services",
    icon: Settings,
  },
  {
    name: "Saved Properties",
    href: "/panel/saved",
    icon: Heart,
  }
];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex relative">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            </div>
          )}

          {/* Sidebar */}
          <div className={`fixed top-12 left-0 bottom-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">User Panel</h2>
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <nav className="mt-6 px-3 overflow-y-auto h-[calc(100%-4rem)]">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar - always at top */}
            <div className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 lg:px-8">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-500" />
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Welcome back, {user?.displayName || "User"}
                </span>
              </div>
            </div>
            {/* Page content */}
            <main className="px-2 lg:px-8 py-1 lg:py-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
