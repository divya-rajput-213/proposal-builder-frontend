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

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                AI-Powered Content
              </h3>
              <p className="text-sm text-gray-600">
                Intelligent content generation based on your requirements
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Professional Templates
              </h3>
              <p className="text-sm text-gray-600">
                Beautiful, customizable PowerPoint templates
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                PDF Enhancement
              </h3>
              <p className="text-sm text-gray-600">
                Transform existing PDFs into engaging presentations
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalWizard;
