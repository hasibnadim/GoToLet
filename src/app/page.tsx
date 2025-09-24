import Image from "next/image";
import { houses } from "./dummy";
import Link from "next/link";
import slugify from "slugify";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-200">
      {/* Compact Hero Section */}
      <section id="home" className="pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b ">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Find Your Perfect Housing
              </span>
            </h1>
            <p className="text-sm text-gray-600 mb-4 max-w-lg mx-auto">
              Discover safe, affordable, and verified housing options.
            </p>
          </div>
        </div>
      </section>
      {/* Property Feed Section */}
      <section className="pb-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>All Areas</option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>Any Price</option>
                      <option>৳5,000 - ৳10,000</option>
                      <option>৳10,000 - ৳20,000</option>
                      <option>৳20,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                        <span className="ml-2 text-sm text-gray-700">Single Room</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                        <span className="ml-2 text-sm text-gray-700">Shared Room</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                        <span className="ml-2 text-sm text-gray-700">Apartment</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Feed */}
            <div className="lg:w-3/4">
              <div className="space-y-4">

                {houses.map((house) => (
                  <Link href={`/${slugify(house.title).toLowerCase()}`} key={house.id} 
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 block relative overflow-hidden group" >
                    {/* Gradient overlay that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                    <div className="relative z-10 flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <Image
                          src={house.image}
                          alt="Property"
                          className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{house.title}</h3>
                          <span className="text-2xl font-bold text-blue-600">৳{house.rent}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{house.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {house.label.map((label) => (
                            <span key={label.text} className={`px-2 py-1 text-xs rounded-full ${label.color === "green" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                              {label.text}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-1">{house.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Load More Button */}
                <div className="text-center pt-6">
                  <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                    Load More Properties
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
