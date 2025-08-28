import React from "react";

export default function StatusNetworkPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Status Network</h1>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Welcome to the Status Network extension for Scaffold-ETH 2!</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Extension Features</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Status network integration</li>
              <li>• Real-time status updates</li>
              <li>• Blockchain-based status storage</li>
              <li>• Decentralized social features</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              This is a simple demonstration page for the Status Network extension.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
