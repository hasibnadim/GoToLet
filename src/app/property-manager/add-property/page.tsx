'use client';

import { useState } from 'react';
import { Building2, MapPin, Camera, Save, X, Plus, Phone, Globe, FileText } from 'lucide-react';
import { PropertyDoc } from '@/app/api/property/property';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const phoneRegex = /^(\+\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const formSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title cannot exceed 100 characters'),
    phone: z.array(z.string().regex(phoneRegex, 'Please enter a valid phone number').min(8, 'Phone number too short').max(18, 'Phone number too long')).min(1, 'At least one phone number is required'),
    address: z.string().min(10, 'Address must be at least 10 characters').max(200, 'Address cannot exceed 200 characters'),
    city: z.string().min(2, 'City must be at least 2 characters').max(50, 'City cannot exceed 50 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters').max(50, 'Country cannot exceed 50 characters'),
    google_embed_link: z.string().min(2, 'Google Maps embed link required').startsWith("<iframe").endsWith("</iframe>"), // Custom validation to check if it starts with <iframe> and ends with </iframe>
    amenities: z.array(z.string()).min(1, 'At least one amenity is required'),
    terms_conditions: z.string().optional(),
    type: z.enum(['boys hostel', 'girls hostel', 'house', 'apartment', 'duplex', 'bungalow', 'farmhouse', 'castle']),
    bedrooms: z.number().min(1).max(20).optional(),
    visibility: z.enum(['public', 'private']).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProperty() {
    const [phoneInput, setPhoneInput] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('+880');
    const [phoneError, setPhoneError] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            phone: [],
            address: '',
            city: 'Rajshahi',
            country: 'Bangladesh',
            visibility: 'public',
            google_embed_link: '',
            amenities: [],
            type: 'boys hostel',
            bedrooms: 1,
        },
    });
    const propertyTypes: { value: PropertyDoc['type']; label: string }[] = [
        { value: 'boys hostel', label: 'Boys Hostel' },
        { value: 'girls hostel', label: 'Girls Hostel' },
        { value: 'house', label: 'House' },
        { value: 'duplex', label: 'Duplex' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'bungalow', label: 'Bungalow' },
        { value: 'farmhouse', label: 'Farmhouse' },
        { value: 'castle', label: 'Castle' },
    ];

    const cities = [
        'Rajshahi'
    ];
    const countries = ['Bangladesh'];

    const availableAmenities = [
        'Air Conditioning', 'Balcony', 'Parking', 'Elevator', 'Security',
        'Generator', 'Gas Line', 'Internet', 'Gym', 'Swimming Pool',
        'Garden', 'Rooftop Access', 'CCTV', 'Intercom', 'Furnished',
        'Wi-Fi', 'Laundry', 'Kitchen', 'Dining Room', 'Prayer Room'
    ];
    const mapLink = form.watch('google_embed_link');

    // Country codes with their patterns and examples
    const countryData = {
        '+880': {
            name: 'Bangladesh',
            pattern: /^(\+880|880)?\s?1[3-9]\d{8}$/,
            example: '+880 1712-345678',
            maxLength: 14
        },
        '+91': {
            name: 'India',
            pattern: /^(\+91|91)?\s?[6-9]\d{9}$/,
            example: '+91 98765-43210',
            maxLength: 13
        },
        '+92': {
            name: 'Pakistan',
            pattern: /^(\+92|92)?\s?3\d{9}$/,
            example: '+92 300-1234567',
            maxLength: 13
        },
        '+977': {
            name: 'Nepal',
            pattern: /^(\+977|977)?\s?98\d{8}$/,
            example: '+977 9841-234567',
            maxLength: 14
        },
        '+353': {
            name: 'Ireland',
            pattern: /^(\+353|353)?\s?8[3-9]\d{7}$/,
            example: '+353 83-123-4567',
            maxLength: 14
        },
        '+971': {
            name: 'UAE',
            pattern: /^(\+971|971)?\s?5[0-9]\d{7}$/,
            example: '+971 50-123-4567',
            maxLength: 13
        }
    };

    // Format phone number as user types
    const formatPhoneNumber = (value: string, countryCode: string) => {
        // Remove all non-digit characters except +
        const cleaned = value.replace(/[^\d+]/g, '');

        // If it doesn't start with the country code, add it
        if (!cleaned.startsWith(countryCode)) {
            return countryCode + (cleaned.startsWith('+') ? cleaned.slice(1) : cleaned);
        }

        return cleaned;
    };

    // Validate phone number for specific country
    const validatePhoneNumber = (phone: string, countryCode: string) => {
        const data = countryData[countryCode as keyof typeof countryData];
        if (!data) return { valid: false, message: 'Unsupported country code' };

        const cleaned = phone.replace(/[^\d+]/g, '');
        if (cleaned.length < 8) return { valid: false, message: 'Phone number too short' };
        if (cleaned.length > data.maxLength) return { valid: false, message: 'Phone number too long' };

        if (!data.pattern.test(cleaned)) {
            return { valid: false, message: `Invalid format. Example: ${data.example}` };
        }

        return { valid: true, message: '' };
    };

    const handlePhoneInputChange = (value: string) => {
        const formatted = formatPhoneNumber(value, selectedCountryCode);
        setPhoneInput(formatted);

        // Clear previous error
        setPhoneError('');

        // Validate if input is not empty
        if (formatted.trim()) {
            const validation = validatePhoneNumber(formatted, selectedCountryCode);
            if (!validation.valid) {
                setPhoneError(validation.message);
            }
        }
    };

    const handleCountryCodeChange = (value: string) => {
        const newCountryCode = value;
        setSelectedCountryCode(newCountryCode);

        // Update phone input with new country code if there's existing input
        if (phoneInput && !phoneInput.startsWith(newCountryCode)) {
            const withoutCountryCode = phoneInput.replace(/^\+\d{1,4}/, '');
            const newPhoneInput = newCountryCode + withoutCountryCode;
            setPhoneInput(newPhoneInput);

            // Validate with new country code
            const validation = validatePhoneNumber(newPhoneInput, newCountryCode);
            setPhoneError(validation.valid ? '' : validation.message);
        }
    };

    const handleAddPhone = () => {
        const currentPhones = form.getValues('phone');
        const trimmedPhone = phoneInput.trim();

        if (!trimmedPhone) {
            setPhoneError('Please enter a phone number');
            return;
        }

        // Validate phone number
        const validation = validatePhoneNumber(trimmedPhone, selectedCountryCode);
        if (!validation.valid) {
            setPhoneError(validation.message);
            return;
        }

        // Check for duplicates
        if (currentPhones.includes(trimmedPhone)) {
            setPhoneError('This phone number is already added');
            return;
        }

        // Add phone number
        form.setValue('phone', [...currentPhones, trimmedPhone]);
        setPhoneInput('');
        setPhoneError('');
        form.clearErrors('phone');
    };

    const handleRemovePhone = (phoneToRemove: string) => {
        const currentPhones = form.getValues('phone');
        form.setValue('phone', currentPhones.filter(p => p !== phoneToRemove));
    };

    const handleAmenityToggle = (amenity: string) => {
        const currentAmenities = form.getValues('amenities');
        const newAmenities = currentAmenities.includes(amenity)
            ? currentAmenities.filter(a => a !== amenity)
            : [...currentAmenities, amenity];
        form.setValue('amenities', newAmenities);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        // Validate files
        const validFiles: File[] = [];
        const maxFileSize = 10 * 1024 * 1024; // 10MB per file
        const maxTotalFiles = 10; // Maximum 10 images
        
        for (const file of files) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} is not an image file`);
                continue;
            }
            
            // Check file size
            if (file.size > maxFileSize) {
                toast.error(`${file.name} is too large. Maximum size per image: 10MB`);
                continue;
            }
            
            validFiles.push(file);
        }
        
        // Check total number of files
        const currentTotal = imageFiles.length + validFiles.length;
        if (currentTotal > maxTotalFiles) {
            toast.error(`Maximum ${maxTotalFiles} images allowed. You're trying to add ${currentTotal} images.`);
            return;
        }
        
        // Check total size
        const currentSize = imageFiles.reduce((sum, file) => sum + file.size, 0);
        const newSize = validFiles.reduce((sum, file) => sum + file.size, 0);
        const totalSize = currentSize + newSize;
        const maxTotalSize = 25 * 1024 * 1024; // 25MB total
        
        if (totalSize > maxTotalSize) {
            toast.error(
                `Total image size too large: ${(totalSize / 1024 / 1024).toFixed(2)}MB. ` +
                `Maximum allowed: 25MB total`
            );
            return;
        }
        
        setImageFiles(prev => [...prev, ...validFiles]);
        
        if (validFiles.length > 0) {
            toast.success(`Added ${validFiles.length} image(s). Total: ${imageFiles.length + validFiles.length} images`);
        }
        
        // Clear the input
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Convert files to base64 with data URL format
    const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
        const base64Images: string[] = [];
        
        for (const file of files) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error(`File ${file.name} is not an image`);
            }
            
            // Validate file size (max 10MB per image before compression)
            const maxFileSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxFileSize) {
                throw new Error(`Image ${file.name} is too large. Maximum size is 10MB per image.`);
            }
            
            const reader = new FileReader();
            const base64 = await new Promise<string>((resolve, reject) => {
                reader.onload = () => {
                    const result = reader.result as string;
                    resolve(result); // Keep full data URL format
                };
                reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
                reader.readAsDataURL(file);
            });
            
            base64Images.push(base64);
        }
        
        return base64Images;
    };

    // Calculate total file size
    const calculateTotalSize = (files: File[]): number => {
        return files.reduce((total, file) => total + file.size, 0);
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            // Validate total file size before processing
            const totalSize = calculateTotalSize(imageFiles);
            const maxTotalSize = 25 * 1024 * 1024; // 25MB (leaving some buffer for the rest of the request)
            
            if (totalSize > maxTotalSize) {
                throw new Error(`Total image size too large: ${(totalSize / 1024 / 1024).toFixed(2)}MB. Maximum allowed: 25MB`);
            }

            // Convert images to base64 if any
            let base64Images: string[] = [];
            if (imageFiles.length > 0) {
                toast.info(`Processing ${imageFiles.length} images...`);
                base64Images = await convertFilesToBase64(imageFiles);
            }

            // Prepare property data for API
            const propertyData = {
                title: data.title,
                phone: data.phone,
                address: data.address,
                city: data.city,
                country: data.country,
                google_embed_link: data.google_embed_link || '',
                amenities: data.amenities,
                terms_conditions: data.terms_conditions || '',
                type: data.type,
                bedrooms: data.bedrooms,
                images: base64Images
            };

            // Submit to API
            toast.info('Creating property...');
            const response = await fetch('/api/property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                toast.success(
                    `Property "${result.data.title}" created successfully! ` +
                    `${result.meta.totalImages} images compressed to ${result.meta.totalCompressedSize}`
                );
                
                // Reset form
                form.reset();
                setImageFiles([]);
                setPhoneInput('');
                setPhoneError('');
                
                // Optional: redirect to property page
                // window.location.href = `/property/${result.data.slug}`;
            } else {
                throw new Error(result.error || 'Failed to create property');
            }

        } catch (error) {
            console.error('Error adding property:', error);
            
            if (error instanceof Error) {
                if (error.message.includes('too large')) {
                    toast.error(error.message);
                } else if (error.message.includes('already in use')) {
                    toast.error('One or more phone numbers are already registered with another property.');
                } else {
                    toast.error(error.message);
                }
            } else {
                toast.error('Failed to add property. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                    <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
                        <p className="text-gray-600 mt-1">Create a new property listing for rent</p>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Property Title *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Modern 3BR Apartment in Dhanmondi"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Property Type *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select property type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {propertyTypes.map(type => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visibility</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Visibility" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="public">Public</SelectItem>
                                                <SelectItem value="private">Private</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Phone className="w-5 h-5 mr-2" />
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Numbers *</FormLabel>
                                        <FormControl>
                                            <div className="space-y-3">
                                                <div className="flex space-x-2">
                                                    <Select
                                                        value={selectedCountryCode}
                                                        onValueChange={handleCountryCodeChange}
                                                    >
                                                        <SelectTrigger className="w-48">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="+880">🇧🇩 Bangladesh (+880)</SelectItem>
                                                            {/* <SelectItem value="+91">🇮🇳 India (+91)</SelectItem>
                                                            <SelectItem value="+92">🇵🇰 Pakistan (+92)</SelectItem>
                                                            <SelectItem value="+977">🇳🇵 Nepal (+977)</SelectItem>
                                                            <SelectItem value="+353">🇮🇪 Ireland (+353)</SelectItem>
                                                            <SelectItem value="+971">🇦🇪 UAE (+971)</SelectItem> */}
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="flex-1 relative">
                                                        <Input
                                                            type="tel"
                                                            value={phoneInput}
                                                            onChange={(e) => handlePhoneInputChange(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleAddPhone();
                                                                }
                                                            }}
                                                            placeholder={countryData[selectedCountryCode as keyof typeof countryData]?.example || "Enter phone number"}
                                                            className={`pr-20 ${phoneError ? 'border-red-500 focus:border-red-500' : phoneInput && !phoneError ? 'border-green-500 focus:border-green-500' : ''}`}
                                                            maxLength={countryData[selectedCountryCode as keyof typeof countryData]?.maxLength || 18}
                                                        />
                                                        {phoneInput && !phoneError && (
                                                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={handleAddPhone}
                                                        disabled={!phoneInput.trim() || !!phoneError}
                                                        className="px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        variant={phoneError ? "outline" : "default"}
                                                    >
                                                        <Plus className="w-4 h-4 mr-1" />
                                                        Add
                                                    </Button>
                                                </div>

                                                {phoneError && (
                                                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2 flex items-center">
                                                        <X className="w-4 h-4 mr-2 flex-shrink-0" />
                                                        {phoneError}
                                                    </div>
                                                )}

                                                <div className="flex flex-wrap gap-2">
                                                    {field.value.map((phone, index) => (
                                                        <div key={index} className="flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200 shadow-sm">
                                                            <Phone className="w-3 h-3 mr-2" />
                                                            <span className="text-sm font-medium">{phone}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemovePhone(phone)}
                                                                className="ml-2 text-green-500 hover:text-red-500 transition-colors duration-200"
                                                                title="Remove phone number"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                {field.value.length === 0 && (
                                                    <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
                                                        No phone numbers added yet. Add at least one contact number.
                                                    </div>
                                                )}

                                                <div className="text-xs text-gray-500 mt-1">
                                                    <strong>Format example:</strong> {countryData[selectedCountryCode as keyof typeof countryData]?.example}
                                                    <br />
                                                    <strong>Tip:</strong> Press Enter to quickly add the phone number
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            Location
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="House/Flat number, Road, Block, Area"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select city" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities.map(city => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select country" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {countries.map(country => (
                                                    <SelectItem key={country} value={country}>
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="google_embed_link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center">
                                                <Globe className="w-4 h-4 mr-1" />
                                                Google Maps Embed Link *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="https://www.google.com/maps/embed?pb=..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Get embed link from Google Maps → Share → Embed a map
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* preview */}
                                <div className="mt-4">
                                    {mapLink ? (
                                        <div className='mx-auto' dangerouslySetInnerHTML={{ __html: mapLink }} />
                                    ) : (
                                        <div className="w-full h-48 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                                            <span className="text-gray-400">Map preview will appear here</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Terms & Conditions
                        </h2>
                        <FormField
                            control={form.control}
                            name="terms_conditions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Terms & Conditions</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={6}
                                            placeholder="Enter terms and conditions for this property (rental rules, deposit requirements, lease terms, etc.)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Amenities */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h2>
                        <FormField
                            control={form.control}
                            name="amenities"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {availableAmenities.map(amenity => (
                                                <label key={amenity} className="flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value.includes(amenity)}
                                                        onChange={() => handleAmenityToggle(amenity)}
                                                        className="sr-only"
                                                    />
                                                    <div className={`flex items-center px-3 py-2 rounded-lg border-2 transition-colors ${field.value.includes(amenity)
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                        }`}>
                                                        <span className="text-sm font-medium">{amenity}</span>
                                                        {field.value.includes(amenity) && (
                                                            <X className="w-4 h-4 ml-2" />
                                                        )}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Camera className="w-5 h-5 mr-2" />
                            Property Images
                        </h2>

                        <div className="mb-4">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors block"
                            >
                                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Upload property images</p>
                                <p className="text-sm text-gray-500 mb-2">Click to browse or drag and drop images here</p>
                                <div className="text-xs text-gray-400 space-y-1">
                                    <p>• Maximum 10 images</p>
                                    <p>• Max 10MB per image</p>
                                    <p>• Total size limit: 25MB</p>
                                    <p>• Images will be compressed to WebP format</p>
                                </div>
                            </label>
                        </div>

                        {/* Image Preview */}
                        {imageFiles.length > 0 && (
                            <div className="space-y-4">
                                {/* Image Statistics */}
                                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center space-x-4 text-sm">
                                        <span className="text-blue-700">
                                            <strong>{imageFiles.length}</strong> images selected
                                        </span>
                                        <span className="text-blue-600">
                                            Total size: <strong>{(imageFiles.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(2)}MB</strong>
                                        </span>
                                        <span className="text-blue-500 text-xs">
                                            (Will be compressed to WebP format)
                                        </span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setImageFiles([]);
                                            toast.info('All images removed');
                                        }}
                                        className="text-red-600 border-red-300 hover:bg-red-50"
                                    >
                                        Clear All
                                    </Button>
                                </div>

                                {/* Image Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {imageFiles.map((file, index) => (
                                        <div key={index} className="relative group">
                                            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-colors"
                                                    title={`Remove ${file.name}`}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-xs text-gray-600 truncate font-medium" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {(file.size / 1024 / 1024).toFixed(2)}MB
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Publish Property
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}