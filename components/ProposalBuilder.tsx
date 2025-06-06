"use client";
import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { FileText, Wand2, Upload, X } from "lucide-react";

interface UploadedFile extends File {}

interface FormDataState {
  initialInput: string;
  uploadedFiles: UploadedFile[];
}

const ProposalBuilder: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    initialInput: "",
    uploadedFiles: [],
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [generatedSlides, setGeneratedSlides] = useState([]);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, initialInput: e.target.value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const allowedExtensions = [".pdf", ".ppt", ".pptx", ".doc", ".docx"];

    const newFiles: UploadedFile[] = Array.from(files).filter((file) => {
      const ext = file.name.toLowerCase().split(".").pop() || "";
      return allowedExtensions.includes(`.${ext}`);
    });

    if (newFiles.length === 0) {
      alert("Only PDF, PPT, PPTX, DOC, and DOCX files are allowed.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...newFiles],
    }));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }));
  };

  const handleCreateProposal = async () => {
    if (!formData.initialInput.trim() && formData.uploadedFiles.length === 0) {
      alert("Please provide either a description or upload a file.");
      return;
    }
  
    setIsGenerating(true);
  
    try {
      const form = new FormData();
      form.append("job_description", formData.initialInput);
  
      formData.uploadedFiles.forEach((file) => {
        form.append("file", file);
      });
  
      const response = await fetch("https://92c8-49-249-18-30.ngrok-free.app", {
        method: "POST",
        body: form,
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate proposal");
      }
  
      const data = await response.json();
      console.log("Response from API:", data);
  
      // If you get slides back:
      if (data) {
        console.log('data :>> ', data);
        setGeneratedSlides(data);
      }
  
      alert("Proposal PowerPoint generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while generating the proposal.");
    } finally {
      setIsGenerating(false);
    }
  };
  

  const handleHelpWriteIt = () => {
    const suggestions = [
      "I need a comprehensive project proposal for a web development initiative that includes modern responsive design, user authentication, and e-commerce functionality.",
      "Create a marketing proposal for a digital transformation strategy that focuses on social media engagement, SEO optimization, and content marketing.",
      "Develop a partnership proposal for a strategic alliance between two technology companies to collaborate on innovative solutions.",
      "Generate a sponsorship proposal for a music festival that highlights brand visibility, audience demographics, and marketing benefits.",
    ];

    const randomSuggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];
    setFormData((prev) => ({ ...prev, initialInput: randomSuggestion }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What would you like to create?
          </h2>
          <p className="text-gray-600 text-lg">
            Describe your proposal or upload an existing PDF to enhance
          </p>
        </div>

        {/* Text Input Section */}
        <div className="mb-8">
          <div className="relative">
            <textarea
              placeholder="E.g. I need a presentation for a software development project that includes timeline, budget breakdown, team structure, and deliverables..."
              value={formData.initialInput}
              onChange={handleInputChange}
              maxLength={2000}
              className="w-full min-h-[200px] text-lg p-6 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {formData.initialInput.length}/2000
                </span>
              </div>
              {/* Drag & Drop Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer border-2 rounded-md px-4 py-2 flex items-center gap-2 text-purple-600
                  ${
                    isDragOver
                      ? "border-purple-600 bg-purple-100"
                      : "border-gray-300 bg-white"
                  }
                  transition-colors duration-200 select-none`}
                style={{ userSelect: "none", minWidth: 180 }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  multiple
                  className="hidden"
                />
                <Upload className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Drag & drop or click to upload files
                </span>
              </div>
              <button
                onClick={handleHelpWriteIt}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 border-2 border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                <Wand2 className="w-4 h-4" />
                Help me write it
              </button>
            </div>
          </div>

          {/* Mini list of uploaded files */}
          {formData.uploadedFiles.length > 0 && (
            <div className="mt-2 space-y-1 text-sm text-gray-800">
              {formData.uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label={`Remove file ${file.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCreateProposal}
            disabled={
              isGenerating ||
              (!formData.initialInput.trim() &&
                formData.uploadedFiles.length === 0)
            }
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating PowerPoint...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Create PowerPoint Proposal
              </>
            )}
          </button>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Your proposal will be generated as a professional PowerPoint
            presentation
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProposalBuilder;
