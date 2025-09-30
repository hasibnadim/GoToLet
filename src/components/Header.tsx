"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { Binoculars, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { getAvaterName } from "@/lib/auth-utils";


export default function Header() {
  const { user, logout } = useAuth();
  const [showStickyMenu, setShowStickyMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowStickyMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
      logout();
      setShowStickyMenu(false);
    }
  }

  return (
    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-0.5 flex items-center justify-between h-12 md:h-16 relative" >
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Go2Let Logo"
            width={120}
            className="h-10 md:h-16 w-auto mix-blend-hard-light"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Link
            href="/"
            className={cn('inline-block p-1.5 border md:p-2.5 md:border-2 border-gray-200 hover:border-blue-500 rounded-full', {
            })}
          >
            <Binoculars size={18} />
          </Link>
          {user ? (
            !showStickyMenu ? <Avatar onClick={() => {
              setShowStickyMenu(!showStickyMenu);
            }} className="cursor-pointer border border-transparent hover:border-blue-100 hover:rotate-y-180 h-8 w-8 md:h-10 md:w-10">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback>{getAvaterName(user)}</AvatarFallback>
            </Avatar> : <button
              onClick={() => {
                setShowStickyMenu(!showStickyMenu);
              }}
              className={cn('inline-block p-1.5 border md:p-2.5  border-gray-200 hover:border-blue-500 rounded-full', {
              })}
            >
              <X size={18} />
            </button>
          ) : (
            <Link
              href="/auth/login"
              className={cn('px-4 py-2 text-sm font-medium transition-colors rounded-md border md:border-2 border-gray-200 hover:border-blue-500', {
              })}
            >
              Login
            </Link>
          )}
        </div>
        {user && (
          <div
            ref={menuRef}
            className={cn("absolute right-0 top-10 md:top-16 bg-white border border-gray-200 rounded-lg shadow-lg max-w-80 w-full transition-all duration-300 ease-in-out", {
              'h-0 opacity-0 invisible': !showStickyMenu,
              'h-auto opacity-100 visible': showStickyMenu,
            })}
          >
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.photoURL || ""} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {getAvaterName(user)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="space-y-2">
                <Link
                  href="/panel"
                  onClick={() => setShowStickyMenu(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  User Panel
                </Link>
                {user.accountType === 'business' && (
                  <Link
                  href="/property-manager"
                  onClick={() => setShowStickyMenu(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  Property Manager
                </Link>)}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
