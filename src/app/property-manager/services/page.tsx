'use client';

import { useState } from 'react';
import {
    Settings,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Plus,
    Search,
    Calendar,
    User,
    Phone,
    MapPin,
    Wrench,
    Zap,
    Shield
} from 'lucide-react';

interface ServiceRequest {
    id: number;
    title: string;
    category: 'maintenance' | 'cleaning' | 'repair' | 'security' | 'utilities' | 'other';
    property: string;
    tenant: string;
    tenantPhone: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    dateCreated: string;
    dateScheduled?: string;
    assignedTo?: string;
    cost?: number;
}

export default function Services() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    // const [_, setShowAddForm] = useState(false);

    // Mock data - in a real app, this would come from your database
    const serviceRequests: ServiceRequest[] = [
        {
            id: 1,
            title: 'AC Repair Required',
            category: 'repair',
            property: 'Modern 3BR Apartment in Dhanmondi',
            tenant: 'Sarah Ahmed',
            tenantPhone: '+880 1712-345678',
            description: 'Air conditioning unit not cooling properly. Makes strange noise.',
            priority: 'high',
            status: 'pending',
            dateCreated: '2024-01-28',
            dateScheduled: '2024-01-30',
        },
        {
            id: 2,
            title: 'Monthly Cleaning Service',
            category: 'cleaning',
            property: 'Family House in Uttara',
            tenant: 'Ahmed Rahman',
            tenantPhone: '+880 1812-345678',
            description: 'Regular monthly deep cleaning of the entire house.',
            priority: 'low',
            status: 'in-progress',
            dateCreated: '2024-01-25',
            assignedTo: 'Clean Pro Services',
            cost: 3500,
        },
        {
            id: 3,
            title: 'Plumbing Issue - Kitchen Sink',
            category: 'maintenance',
            property: 'Studio Apartment in Gulshan',
            tenant: 'Maria Khan',
            tenantPhone: '+880 1912-345678',
            description: 'Kitchen sink is clogged and water is not draining properly.',
            priority: 'medium',
            status: 'completed',
            dateCreated: '2024-01-20',
            assignedTo: 'Fix It Fast',
            cost: 1500,
        },
        {
            id: 4,
            title: 'Security System Check',
            category: 'security',
            property: 'Commercial Space in Motijheel',
            tenant: 'Office Manager',
            tenantPhone: '+880 1612-345678',
            description: 'Monthly security system maintenance and camera check.',
            priority: 'medium',
            status: 'pending',
            dateCreated: '2024-01-27',
            dateScheduled: '2024-02-01',
        },
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'maintenance': return <Wrench className="w-4 h-4" />;
            case 'cleaning': return <Shield className="w-4 h-4" />;
            case 'repair': return <Settings className="w-4 h-4" />;
            case 'security': return <Shield className="w-4 h-4" />;
            case 'utilities': return <Zap className="w-4 h-4" />;
            default: return <Settings className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
            case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredRequests = serviceRequests.filter(request => {
        const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.tenant.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || request.category === filterCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services</h1>
                    <p className="text-gray-600 mt-1">Manage maintenance requests and services</p>
                </div>
                <button
                    // onClick={() => setShowAddForm(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service Request
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <Clock className="w-8 h-8 text-yellow-500 mr-3" />
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {serviceRequests.filter(r => r.status === 'pending').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <AlertCircle className="w-8 h-8 text-blue-500 mr-3" />
                        <div>
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {serviceRequests.filter(r => r.status === 'in-progress').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {serviceRequests.filter(r => r.status === 'completed').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <Settings className="w-8 h-8 text-gray-500 mr-3" />
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Requests</p>
                            <p className="text-2xl font-bold text-gray-900">{serviceRequests.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Categories</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="repair">Repair</option>
                        <option value="security">Security</option>
                        <option value="utilities">Utilities</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            {/* Service Requests */}
            <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Service Requests</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                                ? 'Try adjusting your search or filter criteria'
                                : 'No service requests have been created yet'
                            }
                        </p>
                    </div>
                ) : (
                    filteredRequests.map(request => (
                        <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="flex items-center space-x-2">
                                            {getCategoryIcon(request.category)}
                                            <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                                        </div>
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(request.priority)}`}>
                                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{request.property}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <User className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{request.tenant}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{request.tenantPhone}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span className="text-sm">Created: {request.dateCreated}</span>
                                            </div>
                                            {request.dateScheduled && (
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">Scheduled: {request.dateScheduled}</span>
                                                </div>
                                            )}
                                            {request.assignedTo && (
                                                <div className="flex items-center text-gray-600">
                                                    <User className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">Assigned: {request.assignedTo}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-4">{request.description}</p>

                                    {request.cost && (
                                        <div className="text-lg font-semibold text-gray-900 mb-4">
                                            Cost: ৳{request.cost.toLocaleString()}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-end space-y-3">
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(request.status)}
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}