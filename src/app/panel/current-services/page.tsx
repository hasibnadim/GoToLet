'use client';
 
import {
  Home,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Star
} from 'lucide-react';
import Image from 'next/image';

const currentServices = [
  {
    id: 1,
    property: "Modern Apartment in Dhanmondi",
    address: "House 45, Road 12, Dhanmondi, Dhaka-1205",
    landlord: {
      name: "Ahmed Hassan",
      phone: "+880 1712345678",
      email: "ahmed.hassan@example.com"
    },
    checkIn: "2024-09-15",
    checkOut: "2024-12-15",
    monthlyRent: 15000,
    securityDeposit: 30000,
    status: "Active",
    paymentDue: "2024-10-15",
    amenities: ["WiFi", "AC", "Kitchen", "Parking"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    property: "Cozy Studio in Gulshan",
    address: "Plot 67, Gulshan Avenue, Gulshan-2, Dhaka-1212",
    landlord: {
      name: "Fatima Rahman",
      phone: "+880 1687654321",
      email: "fatima.rahman@example.com"
    },
    checkIn: "2024-08-01",
    checkOut: "2024-11-01",
    monthlyRent: 12000,
    securityDeposit: 24000,
    status: "Payment Due",
    paymentDue: "2024-10-01",
    amenities: ["WiFi", "Furnished", "Security"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80"
  }
];

export default function CurrentServicesPage() { 

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Payment Due':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Payment Due':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDaysRemaining = (checkOut: string) => {
    const today = new Date();
    const endDate = new Date(checkOut);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Current Services</h1>
          <p className="text-gray-600 mt-2">Manage your active rentals and bookings</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Book New Property
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Rentals</p>
              <p className="text-3xl font-bold text-gray-900">{currentServices.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Payment</p>
              <p className="text-3xl font-bold text-gray-900">
                ৳{currentServices.reduce((sum, service) => sum + service.monthlyRent, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Deposits</p>
              <p className="text-3xl font-bold text-gray-900">
                ৳{currentServices.reduce((sum, service) => sum + service.securityDeposit, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-6">
        {currentServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Property Image */}
                <div className="lg:w-64 flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.property}
                    className="w-full h-48 lg:h-full object-cover rounded-lg"
                    width={256}
                    height={144}
                  />
                </div>

                {/* Property Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.property}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{service.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                  </div>

                  {/* Rental Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Check In</p>
                      <p className="text-sm font-medium">{new Date(service.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Check Out</p>
                      <p className="text-sm font-medium">{new Date(service.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Monthly Rent</p>
                      <p className="text-sm font-medium">৳{service.monthlyRent.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Days Remaining</p>
                      <p className="text-sm font-medium">{calculateDaysRemaining(service.checkOut)} days</p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {service.amenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Landlord Info */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Landlord Contact</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-medium">
                            {service.landlord.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm">{service.landlord.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">{service.landlord.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">{service.landlord.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                      Make Payment
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Landlord
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm">
                      View Contract
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Rate & Review
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Due Alert */}
            {service.status === 'Payment Due' && (
              <div className="bg-red-50 border-t border-red-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-red-800">
                      Payment due on {new Date(service.paymentDue).toLocaleDateString()}
                    </span>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                    Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}