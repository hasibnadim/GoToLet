'use client';

import { useState } from 'react';
import {
  Home,
  CreditCard,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  MapPin} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats] = useState({
    activeBookings: 2,
    totalSpent: 45000,
    savedProperties: 12,
    recentActivities: 8
  });

  const recentBookings = [
    {
      id: 1,
      property: "Modern Apartment in Dhanmondi",
      location: "Dhanmondi, Dhaka",
      checkIn: "2024-10-15",
      checkOut: "2024-10-30",
      status: "Active",
      amount: 15000
    },
    {
      id: 2,
      property: "Cozy Studio in Gulshan",
      location: "Gulshan, Dhaka",
      checkIn: "2024-09-01",
      checkOut: "2024-09-15",
      status: "Completed",
      amount: 12000
    }
  ];

  const quickActions = [
    {
      name: "Find Properties",
      href: "/",
      icon: Home,
      color: "bg-blue-500"
    },
    {
      name: "Payment History",
      href: "/panel/payment-history",
      icon: CreditCard,
      color: "bg-green-500"
    },
    {
      name: "Saved Properties",
      href: "/panel/saved",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      name: "Get Support",
      href: "/panel/support",
      icon: MessageCircle,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+2 this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900">৳{stats.totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+15% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saved Properties</p>
              <p className="text-3xl font-bold text-gray-900">{stats.savedProperties}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Updated today</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Activities</p>
              <p className="text-3xl font-bold text-gray-900">{stats.recentActivities}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Last 7 days</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.name}
                href={action.href}
                className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className={`${action.color} p-3 rounded-lg mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 text-center">{action.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/panel/current-services" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.property}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {booking.checkIn} to {booking.checkOut}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${booking.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}>
                    {booking.status}
                  </div>
                  <div className="text-lg font-bold text-gray-900 mt-1">
                    ৳{booking.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}