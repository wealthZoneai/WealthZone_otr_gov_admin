import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    ClipboardList, Calendar, CheckCircle2, UploadCloud, X, Check
} from "lucide-react";
import { motion } from "framer-motion";

// =========================================================================
// Success Modal Component (Unchanged)
// =========================================================================

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const modalBgColor = '#003366'; 
    const buttonColor = '#1ABC9C'; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-sm">
                
                <div 
                    className="p-8 flex flex-col items-center justify-center text-white relative" 
                    style={{ backgroundColor: modalBgColor }}
                >
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-300 hover:text-white transition">
                        <X className="w-6 h-6" />
                    </button>

                    <div className="bg-green-500 rounded-full p-2 mb-4 border-4 border-white">
                        <Check className="w-10 h-10 text-white" />
                    </div>

                    <p className="text-lg font-semibold mt-4 mb-6">
                        Successfully completed
                    </p>

                    <button
                        onClick={onClose}
                        className="px-8 py-2 text-white font-bold rounded-lg transition shadow-md hover:opacity-90"
                        style={{ backgroundColor: buttonColor }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};


// =========================================================================
// Main CustomerForm Component (Updated handleSubmit)
// =========================================================================

interface CustomerFormData {
    jobCategory: string;
    jobTitle: string;
    totalVacancy: string;
    description: string;
    postDate: string;
    lastDate: string;
    qualification: string;
    religion: string;
    gender: string;
    fee: string;
    importantDate: string;
    interviewDate: string;
    ageLimit: string;
    vacancyDetails: string;
    livePhoto: boolean;
    signature: boolean;
    declaration: boolean;
    customerFile?: File | null;
}

const CustomerForm: React.FC = () => {
    const [formData, setFormData] = useState<CustomerFormData>({
        jobCategory: "",
        jobTitle: "",
        totalVacancy: "",
        description: "",
        postDate: "",
        lastDate: "",
        qualification: "Degree",
        religion: "",
        gender: "",
        fee: "",
        importantDate: "",
        interviewDate: "",
        ageLimit: "",
        vacancyDetails: "",
        livePhoto: false,
        signature: false,
        declaration: false,
        customerFile: null,
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        if (target instanceof HTMLInputElement && target.type === "checkbox") {
            setFormData({ ...formData, [target.name]: target.checked });
        } else {
            setFormData({ ...formData, [target.name]: target.value });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            e.target.value = ""; 
            return;
        }

        setFormData({ ...formData, customerFile: file });
    };

    // Define the list of required field keys
    const requiredFields: (keyof CustomerFormData)[] = [
        "jobCategory", "jobTitle", "totalVacancy", "postDate", "lastDate", "qualification",
        "religion", "gender", "fee", "ageLimit", "description"
        // Note: Checkbox fields (livePhoto, signature, declaration) and optional file (customerFile) are often excluded from this basic check.
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // 1. **Validation Check**
        const missingFields: string[] = [];

        requiredFields.forEach(key => {
            const value = formData[key];
            if (!value || (typeof value === 'string' && value.trim() === '')) {
                // Formatting the key for a friendlier message
                const friendlyName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                missingFields.push(friendlyName);
            }
        });

        if (!formData.customerFile) {
            missingFields.push("PDF File Upload");
        }


        if (missingFields.length > 0) {
            return; // Stop execution
        }

        // 3. **If Validation Passes, Proceed with Submission & Modal**
        console.log("Submitted Data:", formData);
        setIsSuccessModalOpen(true);
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 rounded-3xl shadow-xl border border-pink-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
                <ClipboardList className="text-pink-600 mr-2" size={26} />
                <h2 className="text-2xl font-semibold text-gray-800">Customer Form</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields (JSX omitted for brevity, it remains the same as your last version) */}
                {/* ... all your input fields and selects here ... */}
                
                {/* Job Info */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div>
                        <label className="text-sm font-medium text-gray-600">Job Category</label>
                        <select
                            name="jobCategory"
                            value={formData.jobCategory}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="SSC">SSC</option>
                            <option value="APPSC">APPSC</option>
                            <option value="TSPSC">TSPSC</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Enter job title"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Total Vacancy</label>
                        <input
                            type="number"
                            name="totalVacancy"
                            placeholder="255"
                            value={formData.totalVacancy}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Qualification</label>
                        <select
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                        >
                            <option value="Degree">Degree</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="10th">10th</option>
                            <option value="PG">PG</option>
                        </select>
                    </div>
                </motion.div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <Calendar size={16} /> Post Date
                        </label>
                        <input
                            type="date"
                            name="postDate"
                            value={formData.postDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <Calendar size={16} /> Last Date
                        </label>
                        <input
                            type="date"
                            name="lastDate"
                            value={formData.lastDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Interview Date</label>
                        <input
                            type="date"
                            name="interviewDate"
                            value={formData.interviewDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                </div>

                {/* Other Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-sm font-medium text-gray-600">Religion</label>
                        <select
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                        >
                            <option value="">Select</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Christian">Christian</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Age Limit</label>
                        <input
                            type="text"
                            name="ageLimit"
                            placeholder="18–35 Years"
                            value={formData.ageLimit}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Fee</label>
                        <input
                            type="text"
                            name="fee"
                            placeholder="₹ 255"
                            value={formData.fee}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600">Important Date</label>
                        <input
                            type="text"
                            name="importantDate"
                            placeholder="e.g., Exam Date, Admit Card Date"
                            value={formData.importantDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600">Vacancy Details URL/Info</label>
                        <input
                            type="text"
                            name="vacancyDetails"
                            placeholder="URL or short details"
                            value={formData.vacancyDetails}
                            onChange={handleChange}
                            className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm font-medium text-gray-600">Job Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        placeholder="Enter job description..."
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                {/* PDF Upload */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl py-6 hover:border-pink-500 transition-all cursor-pointer bg-white/40">
                    <label className="flex flex-col items-center text-gray-700 cursor-pointer">
                        <UploadCloud size={40} className="text-pink-500 mb-2" />
                        <span className="font-semibold">Upload PDF File</span>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            hidden
                        />
                    </label>
                    {formData.customerFile && (
                        <p className="mt-3 text-sm text-green-700 font-medium">
                            ✅ {formData.customerFile.name}
                        </p>
                    )}
                </div>

                {/* Checkboxes */}
                <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Additional Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {["livePhoto", "signature", "declaration"].map((id) => (
                            <label
                                key={id}
                                className="flex items-center gap-2 bg-white border rounded-lg p-2 hover:bg-pink-50 transition cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    name={id}
                                    checked={(formData as any)[id]}
                                    onChange={handleChange}
                                />
                                <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center gap-4 pt-6">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg"
                    >
                        <CheckCircle2 size={18} /> Submit
                    </motion.button>
                </div>
            </form>

            {/* Success Modal Render */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            />
        </motion.div>
    );
};

export default CustomerForm;