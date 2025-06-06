"use client";
import React from "react";
import { FileText, Wand2, Upload, } from "lucide-react";
import ProposalHistory from "./ProposalHistory";
import ProposalBuilder from "./ProposalBuilder";
import Header from "./Header";


const ProposalWizard: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex">
        <div className="w-[300px] border-r">
          <ProposalHistory />
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <ProposalBuilder />
        </div>
      </div>
    </>
  );
};

export default ProposalWizard;
