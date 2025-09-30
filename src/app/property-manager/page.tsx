'use client';

import { Building2, Home, Users, DollarSign, Plus, Eye, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function PropertyManagerDashboard() {
  // Mock data - in a real app, this would come from your database
  const stats = [
    { name: 'Total Properties', value: '12', icon: Building2, color: 'bg-blue-500' },
    { name: 'Active Listings', value: '8', icon: Home, color: 'bg-green-500' },
    { name: 'Total Tenants', value: '24', icon: Users, color: 'bg-purple-500' },
    { name: 'Monthly Revenue', value: '৳1,25,000', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  const recentProperties = [
    { id: 1, title: 'Modern Apartment in Dhanmondi', type: 'Apartment', rent: '৳25,000', status: 'Active' },
    { id: 2, title: 'Family House in Uttara', type: 'House', rent: '৳35,000', status: 'Rented' },
    { id: 3, title: 'Studio in Gulshan', type: 'Studio', rent: '৳18,000', status: 'Pending' },
    { id: 4, title: 'Commercial Space in Motijheel', type: 'Commercial', rent: '৳45,000', status: 'Active' },
  ];

  const quickActions = [
    { name: 'Add New Property', href: '/property-manager/add-property', icon: Plus, color: 'bg-blue-600' },
    { name: 'View All Properties', href: '/property-manager/my-properties', icon: Eye, color: 'bg-green-600' },
    { name: 'Manage Services', href: '/property-manager/services', icon: Settings, color: 'bg-purple-600' },
    { name: 'View Analytics', href: '#', icon: TrendingUp, color: 'bg-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Your Property Dashboard</h1>
        <p className="text-blue-100">Manage your properties, track revenue, and grow your real estate business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
          <Link
            href="/property-manager/my-properties"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Property</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProperties.map((property) => (
                <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{property.title}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{property.type}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">{property.rent}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${property.status === 'Active' ? 'bg-green-100 text-green-800' :
                        property.status === 'Rented' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Revenue chart will be implemented here</p>
            <p className="text-sm text-gray-400 mt-1">Connect with analytics service</p>
          </div>
        </div>
      </div>
    </div>
  );
}