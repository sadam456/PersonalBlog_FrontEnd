import React from "react";

const SimpleLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="mb-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div className="text-xl font-bold text-gray-800">
          Loading your posts...
        </div>
        <div className="mt-2 text-gray-600">
          Please wait while we fetch your latest content.
        </div>
      </div>
    </div>
  );
};

export default SimpleLoader;
