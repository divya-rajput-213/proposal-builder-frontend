// components/ProposalHistory.tsx
"use client";
import React from "react";

const ProposalHistory: React.FC = () => {
  // Replace with actual data
  const historyItems = [
    { id: "1", title: "Web Dev Proposal", createdAt: "2025-06-06" },
    { id: "2", title: "Marketing Strategy", createdAt: "2025-06-01" },
  ];

  return (
    <div className="w-full h-full p-4 border-r bg-white">
      <h2 className="text-xl font-bold mb-4">Proposal History</h2>
      <ul className="space-y-2">
        {historyItems.map((item) => (
          <li
            key={item.id}
            className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
          >
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">{item.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalHistory;
