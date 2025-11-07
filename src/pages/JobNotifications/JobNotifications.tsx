import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FileText,
  List,
  ClipboardCheck,
  Award,
  BarChart,
} from "lucide-react";
import Syllabus from "./Syllabus";
import PQP from "./PQP";
import Answers from "./Answers";
import Result from "./Result";
import Cutoff from "./NotificationCutOff";

// -------------------------------
// ✅ Type Definitions
// -------------------------------
interface JobFormData {
  jobCategory: string;
  jobTitle: string;
  totalVacancy: string;
  description: string;
  postDate: string;
  lastDate: string;
  qualification: string;
  religion?: string;
  gender?: string;
  fee?: string;
  importantDate?: string;
  interviewDate?: string;
  ageLimit?: string;
  vacancyDetails?: string;
  pdf?: File | null;
}

// -------------------------------
// ✅ Main Component
// -------------------------------
const JobNotification: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobFormData>({
    jobCategory: "",
    jobTitle: "",
    totalVacancy: "",
    description: "",
    postDate: "",
    lastDate: "",
    qualification: "",
    religion: "",
    gender: "",
    fee: "",
    importantDate: "",
    interviewDate: "",
    ageLimit: "",
    vacancyDetails: "",
    pdf: null,
  });

  const tabs = [
    { name: "Syllabus", icon: FileText },
    { name: "PQP", icon: List },
    { name: "Answer Key", icon: ClipboardCheck },
    { name: "Results", icon: Award },
    { name: "Cut-off", icon: BarChart },
  ];

  // -------------------------------
  // ✅ Handlers
  // -------------------------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, pdf: file }));

    if (file) {
      setPreviewFile(file.name);
    } else {
      setPreviewFile(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // -------------------------------
  // ✅ Render Functions
  // -------------------------------
  const renderInput = (
    label: string,
    name: keyof JobFormData,
    value: string,
    type: string = "text"
  ) => (
    <div className="flex flex-col w-full">
      <label className="font-semibold mb-1 text-gray-700 text-sm sm:text-base">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={`Enter ${label}`}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-sm sm:text-base"
      />
    </div>
  );

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "Syllabus":
        return <Syllabus />;
      case "PQP":
        return <PQP />;
      case "Answer Key":
        return <Answers />;
      case "Results":
        return <Result />;
      case "Cut-off":
        return <Cutoff />;
      default:
        return null;
    }
  };

  // -------------------------------
  // ✅ Long Notification Form
  // -------------------------------
  const renderLongForm = () => (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md p-4 sm:p-6 rounded-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          Object.keys(formData) as (keyof JobFormData)[]
        ).map((key) =>
          key !== "pdf" ? (
            renderInput(
              key.replace(/([A-Z])/g, " $1"),
              key,
              formData[key] ?? "",
              key.includes("Date") ? "date" : "text"
            )
          ) : null
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="font-semibold mb-1 text-gray-700">Upload PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full"
        />
        {previewFile && (
          <p className="text-sm text-indigo-600 mt-2">
            Selected File: <span className="font-medium">{previewFile}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white px-9 py-2 rounded-lg shadow-md transition-all text-sm sm:text-base font-semibold hover:scale-105 active:scale-95 duration-300"
        >
          <span className="relative z-10">Submit</span>
        </button>
      </div>
    </form>
  );

  // -------------------------------
  // ✅ Render
  // -------------------------------
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 shadow-2xl rounded-2xl   ">
      <div className="mx-auto bg-white shadow-2xl rounded-2xl border border-indigo-100 overflow-hidden ">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-6 text-center text-white shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
            Job Notification Management
          </h1>
        </div>

        {/* Sub Tabs */}
        <nav className="flex flex-wrap justify-center gap-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 shadow-lg p-4 border-b border-indigo-200">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveSubTab((prev) => (prev === name ? null : name))}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all text-sm sm:text-base group
                ${activeSubTab === name
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white shadow-md scale-105"
                  : "bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 text-gray-700 shadow-sm hover:shadow-md"
                }`}
            >
              <Icon
                size={18}
                className={`transition-transform duration-300 ${activeSubTab === name ? "scale-110" : "group-hover:scale-110"
                  }`}
              />
              {name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <div className="p-4 sm:p-8">
          {!activeSubTab ? (
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl p-4 sm:p-6 shadow-inner">
              {renderLongForm()}
            </div>
          ) : (
            <div className="w-full bg-white border border-indigo-100 rounded-2xl shadow-inner p-4 sm:p-6">
              {renderSubTabContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobNotification;
