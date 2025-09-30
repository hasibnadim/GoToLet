'use client';

import { useState } from 'react';
import {
    DollarSign,
    TrendingUp,
    Calendar,
    Download,
    Search,
    Building2,
    CheckCircle,
    Clock,
    XCircle,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

interface Transaction {
    id: number;
    type: 'rent' | 'maintenance' | 'commission' | 'service' | 'deposit';
    description: string;
    property: string;
    tenant?: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    paymentMethod: 'bkash' | 'nagad' | 'bank' | 'cash' | 'rocket';
    transactionId?: string;
}

interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
    net: number;
}

export default function PaymentHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateRange, setDateRange] = useState('all');

    // Mock data - in a real app, this would come from your database
    const transactions: Transaction[] = [
        {
            id: 1,
            type: 'rent',
            description: 'Monthly rent payment',
            property: 'Modern 3BR Apartment in Dhanmondi',
            tenant: 'Sarah Ahmed',
            amount: 25000,
            status: 'completed',
            date: '2024-01-28',
            paymentMethod: 'bkash',
            transactionId: 'BKS123456789',
        },
        {
            id: 2,
            type: 'rent',
            description: 'Monthly rent payment',
            property: 'Family House in Uttara',
            tenant: 'Ahmed Rahman',
            amount: 35000,
            status: 'completed',
            date: '2024-01-25',
            paymentMethod: 'bank',
            transactionId: 'BANK987654321',
        },
        {
            id: 3,
            type: 'maintenance',
            description: 'AC Repair Service',
            property: 'Modern 3BR Apartment in Dhanmondi',
            amount: -2500,
            status: 'completed',
            date: '2024-01-22',
            paymentMethod: 'cash',
        },
        {
            id: 4,
            type: 'service',
            description: 'Cleaning Service',
            property: 'Family House in Uttara',
            amount: -3500,
            status: 'pending',
            date: '2024-01-20',
            paymentMethod: 'bkash',
        },
        {
            id: 5,
            type: 'commission',
            description: 'Go2Let Platform Fee',
            property: 'Multiple Properties',
            amount: -3000,
            status: 'completed',
            date: '2024-01-15',
            paymentMethod: 'bank',
        },
    ];

    const monthlyData: MonthlyRevenue[] = [
        { month: 'Jan 2024', revenue: 120000, expenses: 15000, net: 105000 },
        { month: 'Dec 2023', revenue: 118000, expenses: 12000, net: 106000 },
        { month: 'Nov 2023', revenue: 115000, expenses: 18000, net: 97000 },
        { month: 'Oct 2023', revenue: 120000, expenses: 14000, net: 106000 },
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'rent': return <Building2 className="w-4 h-4" />;
            case 'maintenance': return <ArrowDownRight className="w-4 h-4" />;
            case 'commission': return <ArrowDownRight className="w-4 h-4" />;
            case 'service': return <ArrowDownRight className="w-4 h-4" />;
            case 'deposit': return <ArrowUpRight className="w-4 h-4" />;
            default: return <DollarSign className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'rent': return 'bg-green-100 text-green-800';
            case 'maintenance': return 'bg-red-100 text-red-800';
            case 'commission': return 'bg-orange-100 text-orange-800';
            case 'service': return 'bg-yellow-100 text-yellow-800';
            case 'deposit': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    const getPaymentMethodDisplay = (method: string) => {
        switch (method) {
            case 'bkash': return 'bKash';
            case 'nagad': return 'Nagad';
            case 'rocket': return 'Rocket';
            case 'bank': return 'Bank Transfer';
            case 'cash': return 'Cash';
            default: return method;
        }
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (transaction.tenant && transaction.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = filterType === 'all' || transaction.type === filterType;
        const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    const totalRevenue = transactions
        .filter(t => t.amount > 0 && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = Math.abs(transactions
        .filter(t => t.amount < 0 && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0));

    const netIncome = totalRevenue - totalExpenses;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
                    <p className="text-gray-600 mt-1">Track your rental income and expenses</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-600">৳{totalRevenue.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                            <p className="text-2xl font-bold text-red-600">৳{totalExpenses.toLocaleString()}</p>
                        </div>
                        <ArrowDownRight className="w-8 h-8 text-red-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Net Income</p>
                            <p className="text-2xl font-bold text-blue-600">৳{netIncome.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">৳{monthlyData[0].net.toLocaleString()}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Monthly Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 text-sm font-medium text-gray-600">Month</th>
                                <th className="text-right py-2 text-sm font-medium text-gray-600">Revenue</th>
                                <th className="text-right py-2 text-sm font-medium text-gray-600">Expenses</th>
                                <th className="text-right py-2 text-sm font-medium text-gray-600">Net Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((month, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                    <td className="py-3 text-sm text-gray-900">{month.month}</td>
                                    <td className="py-3 text-sm text-right text-green-600 font-medium">
                                        ৳{month.revenue.toLocaleString()}
                                    </td>
                                    <td className="py-3 text-sm text-right text-red-600 font-medium">
                                        ৳{month.expenses.toLocaleString()}
                                    </td>
                                    <td className="py-3 text-sm text-right text-blue-600 font-bold">
                                        ৳{month.net.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Type Filter */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Types</option>
                        <option value="rent">Rent</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="service">Service</option>
                        <option value="commission">Commission</option>
                        <option value="deposit">Deposit</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>

                    {/* Date Range */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Time</option>
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 3 months</option>
                    </select>
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                </div>

                <div className="divide-y divide-gray-200">
                    {filteredTransactions.length === 0 ? (
                        <div className="p-12 text-center">
                            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Found</h3>
                            <p className="text-gray-600">
                                {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'No transactions have been recorded yet'
                                }
                            </p>
                        </div>
                    ) : (
                        filteredTransactions.map(transaction => (
                            <div key={transaction.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-lg ${getTypeColor(transaction.type)}`}>
                                            {getTypeIcon(transaction.type)}
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">{transaction.description}</h4>
                                            <div className="text-sm text-gray-600 mt-1">
                                                <span>{transaction.property}</span>
                                                {transaction.tenant && <span> • {transaction.tenant}</span>}
                                            </div>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs text-gray-500">{transaction.date}</span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-500">{getPaymentMethodDisplay(transaction.paymentMethod)}</span>
                                                {transaction.transactionId && (
                                                    <>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-500">{transaction.transactionId}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <div className={`text-lg font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {transaction.amount > 0 ? '+' : ''}৳{Math.abs(transaction.amount).toLocaleString()}
                                            </div>
                                            <div className="flex items-center space-x-1 mt-1">
                                                {getStatusIcon(transaction.status)}
                                                <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}