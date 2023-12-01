// src/pages/DashboardPage.js
import React, { useRef } from 'react';

const DashboardPage = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Logic to handle file
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  }
    return (
      <div className="w-full h-screen bg-[#18181b] font-roboto flex flex-col">
            
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept=".csv"
        />
            
        <div className="flex flex-grow">
          <div className="w-16 h-full bg-[#2d2d2d] p-4 flex flex-col items-center justify-between">
            <button className="mb-4 text-white text-xl">
              <i className="fas fa-user-plus text-blue-500"></i>
            </button>
            <button className="mb-4 text-white text-xl">
              <i className="fas fa-car text-red-600"></i>
            </button>
            <button className="mb-4 text-white text-xl">
              <i className="fas fa-road text-green-500"></i>
            </button>
          </div>
          <div className="w-[calc(33.33%-5rem)] h-full bg-[#242424] p-4 relative">
            <div className="flex items-center absolute left-0 top-0 bg-[#333333] px-2 py-1 border border-gray-700 rounded">
              <span className="bg-[#3498db] text-white px-3 py-1 text-sm">
                Quick Search
              </span>
              <input
                name="quick_search"
                type="text"
                className="pl-2 pr-2 w-full border-none bg-[#2d2d2d] text-white"
                placeholder="Enter search term"
              />
              <button className="bg-[#3498db] text-white px-3 py-1 text-sm rounded-md hover:bg-[#2980b9] transition-colors duration-200">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <h2 className="text-white font-semibold">Top Left</h2>
            {/* Content here */}
          </div>
          <div className="w-[calc(33.33%+2rem-4rem)] h-full bg-[#242424] p-4">
            <h2 className="text-white font-semibold">Top Middle</h2>
            <div className="w-full h-full">
              <img
                src="path-to-map.png"
                alt="Interactive map centered in the top middle section with increased space on a dark background"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="w-[calc(33.33%-5rem)] h-full bg-[#242424] p-4">
            <h2 className="text-white font-semibold">Driver Status</h2>
            <ul className="divide-y divide-gray-700 overflow-y-auto h-[calc(100%-32px)]">
              <li className="flex justify-between items-center p-2">
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-full bg-[#3498db]"></span>
                  <div>
                    <h4 className="font-bold text-sm text-white">John Doe</h4>
                    <p className="text-xs text-gray-400">Trip #1234</p>
                    <p className="text-xs text-gray-400">
                      Status: <span className="text-[#3498db]">On route</span>
                    </p>
                  </div>
                </div>
                <img
                  src="path-to-driver-photo.png"
                  alt="Driver John Doe portrait on dark theme"
                  className="w-10 h-10 rounded-full"
                />
              </li>
              {/* More list items */}
            </ul>
          </div>
          <div className="w-16 h-full bg-[#2d2d2d] p-4">
            {/* Small sidebar for buttons was added on the left */}
          </div>
        </div>
        <div className="h-[40%] bg-[#1f2937] p-4">
          <div className="flex items-center justify-between bg-[#333333] p-2 mb-4 shadow-md h-10">
            <div className="flex gap-2">
              <div className="bg-[#3498db] text-white px-3 py-1 text-sm flex items-center gap-2 rounded-md">
                <input
                  name="from_date"
                  type="date"
                  className="border p-1 bg-[#2d2d2d] text-white rounded-md"
                  placeholder="From date"
                />
                <input
                  name="to_date"
                  type="date"
                  className="border p-1 bg-[#2d2d2d] text-white rounded-md"
                  placeholder="To date"
                />
                <select
                  name="trip_status"
                  className="border p-1 bg-[#2d2d2d] text-white rounded-md"
                >
                  <option>Trip Status</option>
                </select>
                <input
                  name="trip_number"
                  type="text"
                  className="border p-1 bg-[#2d2d2d] text-white rounded-md"
                  placeholder="Trip Number"
                />
                <input
                  name="driver"
                  type="text"
                  className="border p-1 bg-[#2d2d2d] text-white rounded-md"
                  placeholder="Driver"
                />
                <button className="bg-[#3498db] text-white px-3 py-1 text-sm flex items-center gap-2 rounded-md">
                  Filter
                </button>
              </div>
              <button className="bg-[#9b59b6] text-white px-3 py-1 text-sm flex items-center gap-2">
                <i className="fa fa-sync-alt"></i>
                Refresh
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleImportClick}
                className="bg-[#4CAF50] text-white px-3 py-1 text-sm flex items-center gap-2"
              >
                Import CSV
              </button>
              <button className="bg-[#4CAF50] text-white px-3 py-1 text-sm flex items-center gap-2">
                <i className="fa fa-file-export"></i>
                Export CSV
              </button>
            </div>
          </div>
         <div className="overflow-y-auto h-[calc(100%-40px)]">
        <h2 className="text-white font-semibold">Trips</h2>
        {/* Render trips here */}
            {trips.map((trip, index) => (
              <div key={index} className="trip-item">
                {/* Render trip details here */}
                <p>{trip.name}</p> {/* Example, replace with actual trip properties */}
              </div>
            ))}
        </div>
      </div>
    );
  };
export default DashboardPage;