import { FileText } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


const Header = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Left side: Icon + Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <FileText className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proposal Builder</h1>
          <p className="text-sm text-gray-600">
            AI-powered PowerPoint generation
          </p>
        </div>
      </div>

      {/* Right side: View Dashboard button */}
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard")}
      >
        View Dashboard
      </Button>
    </div>
  );
};

export default Header;
