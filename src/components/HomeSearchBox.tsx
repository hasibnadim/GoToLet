'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomeSearchBox = () => {

    // Main search states
    const [area, setArea] = useState('');
    const [roomCapacity, setRoomCapacity] = useState('');
    const [duration, setDuration] = useState('');

    // Advanced search states
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [amenities, setAmenities] = useState('');
    const [furnished, setFurnished] = useState('');
    const [petFriendly, setPetFriendly] = useState('');
    const [parking, setParking] = useState('');
    const [internet, setInternet] = useState('');
    const [kitchenAccess, setKitchenAccess] = useState('');

    // UI state
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleSearch = () => {
        console.log({
            area, roomCapacity, duration, city, country, propertyType,
            priceRange, bedrooms, bathrooms, amenities, furnished,
            petFriendly, parking, internet, kitchenAccess
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-full max-w-4xl mx-auto backdrop-blur-sm">

            {/* Portable Search - Main Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">

                {/* Area */}
                <div className="hover:bg-gray-50 transition-colors p-3 rounded-lg border border-gray-100">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Area</label>
                    <input
                        type="text"
                        placeholder="Enter area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none"
                    />
                </div>

                {/* Room Capacity */}
                <div className="hover:bg-gray-50 transition-colors p-3 rounded-lg border border-gray-100">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Room Capacity</label>
                    <select
                        value={roomCapacity}
                        onChange={(e) => setRoomCapacity(e.target.value)}
                        className="w-full text-sm text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                    >
                        <option value="">Select capacity</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5+ People</option>
                        <option value="family">Family</option>
                    </select>
                </div>

                {/* Duration */}
                <div className="hover:bg-gray-50 transition-colors p-3 rounded-lg border border-gray-100">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Duration</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full text-sm text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                    >
                        <option value="">Select duration</option>
                        <option value="per-night">Per Night</option>
                        <option value="short-term">Short Term</option>
                        <option value="long-term">Long Term</option>
                    </select>
                </div>
            </div>

            {/* Advanced Search Toggle */}
            <div className="flex items-center justify-between mb-4">
                <Button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center text-sm bg-transparent hover:bg-transparent text-gray-600 hover:text-gray-900 transition-colors px-8 py-3 "
                >
                    <Settings className="w-5 h-5 mr-2" />
                    Advanced Search
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </Button>
                {!showAdvanced && <Button
                    size="lg"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full w-auto cursor-pointer"
                    onClick={handleSearch}
                >
                    <Search className="w-5 h-5 mr-2" />
                    {/* <Loader className="w-5 h-5 mr-2 animate-spin inline-block" /> */}

                    Search
                </Button>}
            </div>

            {/* Advanced Search Fields - Collapsible */}
            {showAdvanced && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border">

                    {/* Compact Grid - Mobile Optimized */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">

                        {/* City */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="dhaka">Dhaka</option>
                                <option value="chittagong">Chittagong</option>
                                <option value="sylhet">Sylhet</option>
                                <option value="rajshahi">Rajshahi</option>
                                <option value="khulna">Khulna</option>
                            </select>
                        </div>

                        {/* Country */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="bangladesh">Bangladesh</option>
                                <option value="india">India</option>
                                <option value="pakistan">Pakistan</option>
                                <option value="nepal">Nepal</option>
                            </select>
                        </div>

                        {/* Property Type */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="studio">Studio</option>
                                <option value="mess">Mess</option>
                                <option value="hotel">Hotel</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="0-5000">৳0-5K</option>
                                <option value="5000-10000">৳5K-10K</option>
                                <option value="10000-20000">৳10K-20K</option>
                                <option value="20000-50000">৳20K-50K</option>
                                <option value="50000+">৳50K+</option>
                            </select>
                        </div>

                        {/* Bedrooms */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Beds</label>
                            <select
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                            </select>
                        </div>

                        {/* Bathrooms */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Baths</label>
                            <select
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4+">4+</option>
                            </select>
                        </div>

                        {/* Furnished */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Furnished</label>
                            <select
                                value={furnished}
                                onChange={(e) => setFurnished(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="fully-furnished">Fully</option>
                                <option value="semi-furnished">Semi</option>
                                <option value="unfurnished">No</option>
                            </select>
                        </div>

                        {/* Parking */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Parking</label>
                            <select
                                value={parking}
                                onChange={(e) => setParking(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="available">Yes</option>
                                <option value="car-parking">Car</option>
                                <option value="bike-parking">Bike</option>
                                <option value="no-parking">No</option>
                            </select>
                        </div>

                        {/* Internet */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Internet</label>
                            <select
                                value={internet}
                                onChange={(e) => setInternet(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="wifi-included">WiFi</option>
                                <option value="high-speed">Fast</option>
                                <option value="fiber">Fiber</option>
                                <option value="no-internet">No</option>
                            </select>
                        </div>

                        {/* Kitchen */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Kitchen</label>
                            <select
                                value={kitchenAccess}
                                onChange={(e) => setKitchenAccess(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="private-kitchen">Private</option>
                                <option value="shared-kitchen">Shared</option>
                                <option value="kitchenette">Mini</option>
                                <option value="no-kitchen">No</option>
                            </select>
                        </div>

                        {/* Pets */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Pets</label>
                            <select
                                value={petFriendly}
                                onChange={(e) => setPetFriendly(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="pet-friendly">OK</option>
                                <option value="cats-only">Cats</option>
                                <option value="dogs-only">Dogs</option>
                                <option value="no-pets">No</option>
                            </select>
                        </div>

                        {/* Amenities */}
                        <div className="hover:bg-white transition-colors p-2 rounded border border-gray-100">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Extras</label>
                            <select
                                value={amenities}
                                onChange={(e) => setAmenities(e.target.value)}
                                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Any</option>
                                <option value="gym">Gym</option>
                                <option value="swimming-pool">Pool</option>
                                <option value="balcony">Balcony</option>
                                <option value="garden">Garden</option>
                                <option value="security">Security</option>
                                <option value="elevator">Elevator</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Button */}
            <div>
                {showAdvanced && <Button
                    size="lg"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full w-full cursor-pointer"
                    onClick={handleSearch}
                >
                    <Search className="w-5 h-5 mr-2" />
                    {/* <Loader className="w-5 h-5 mr-2 animate-spin inline-block" /> */}

                    Search
                </Button>}
            </div>
        </div>
    );
};

export default HomeSearchBox;
