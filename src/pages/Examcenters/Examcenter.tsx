import React, { useState } from 'react';
import { Upload, Send, X, Check } from 'lucide-react';

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
// Main ExamCenter Component (Color Variables Defined and Applied)
// =========================================================================

interface ExamCenterData {
    supportType: 'Online' | 'Offline' | 'Both' | '';
    collegeName: string;
    collegeAddress: string;
    collegeLocation: string;
    authorizedName: string;
    phoneNumber: string;
    mailID: string;
    noOfLabsOnline: string;
    noOfRoomsOnline: string;
    ccCameras: string;
    systemsWorking: string;
    totalRooms: string;
    sittingCapacityPerRoom: string;
}

const ExamCenter: React.FC = () => {
    const [formData, setFormData] = useState<ExamCenterData>({
        supportType: '',
        collegeName: '',
        collegeAddress: '',
        collegeLocation: '',
        authorizedName: '',
        phoneNumber: '',
        mailID: '',
        noOfLabsOnline: '',
        noOfRoomsOnline: '',
        ccCameras: '',
        systemsWorking: '',
        totalRooms: '',
        sittingCapacityPerRoom: '',
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // --- 🎨 DEFINED COLOR VARIABLES 🎨 ---
    const customBlue = '#3b82f6'; // Used for both buttons
    const submitBlue = '#1d4ed8'; // A slightly darker blue for Submit
    // --------------------------------------

    const isNumericField = (name: keyof ExamCenterData) => {
        return ['phoneNumber', 'noOfLabsOnline', 'noOfRoomsOnline', 'ccCameras', 'systemsWorking', 'totalRooms', 'sittingCapacityPerRoom'].includes(name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof ExamCenterData;
        let newValue = value;

        if (isNumericField(fieldName)) {
            newValue = value.replace(/[^0-9]/g, '');
        }

        setFormData(prev => ({
            ...prev,
            [fieldName]: newValue,
        }));
    };

    const handleSupportChange = (value: 'Online' | 'Offline' | 'Both') => {
        setFormData(prev => ({ ...prev, supportType: value }));
    };

    const handleUploadDetails = () => {
        console.log('Uploading details:', formData);
        alert('Details simulated for upload. Check console.');
    };

    const handleSubmit = () => {
        const requiredFields: (keyof ExamCenterData)[] = [
            'supportType', 'collegeName', 'mailID', 'phoneNumber', 'authorizedName'
        ];
        
        const missingFields = requiredFields.filter(key => !formData[key].trim());

        if (missingFields.length > 0) {
             const alertMessage = "🛑 Please fill the required fields:\n\n" + missingFields.join('\n');
             alert(alertMessage);
             return; 
        }

        console.log('Submitting Exam Center Data:', formData);
        setIsSuccessModalOpen(true); 
    };

    const renderInputField = (label: string, name: keyof ExamCenterData, type: string = 'text') => {
        const htmlType = type; 
        const isNum = isNumericField(name);

        return (
            <div key={name} className="flex flex-col sm:flex-row sm:items-center mt-3">
                <label className="sm:w-1/3 text-gray-700 font-medium pr-2">{label} :</label>
                <input
                    type={htmlType}
                    name={name}
                    value={formData[name]} 
                    onChange={handleChange}
                    inputMode={isNum ? 'numeric' : 'text'}
                    pattern={isNum ? '[0-9]*' : undefined} 
                    className="flex-1 p-2 border-b border-gray-300 focus:border-blue-500 outline-none transition duration-150 bg-transparent rounded-sm sm:rounded-none"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden sm:p-6">
                
                {/* Header */}
                <div className="text-center py-4 rounded-t-xl mb-6" style={{ backgroundColor: '#EEF0FF', borderBottom: '1px solid #ddd' }}>
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">Exam Center Allocation</h2>
                </div>

                <div className="px-2 sm:px-4">
                    
                    {/* Support Type Radio Buttons */}
                    <div className="mb-6">
                        <p className="text-gray-700 font-bold mb-2">Are You Support?</p>
                        <div className="flex flex-col sm:flex-row sm:space-x-6 items-center space-y-2 sm:space-y-0">
                            {['Online', 'Offline', 'Both'].map((type) => (
                                <label key={type} className="flex items-center text-gray-700 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="supportType"
                                        value={type}
                                        checked={formData.supportType === type}
                                        onChange={() => handleSupportChange(type as 'Online' | 'Offline' | 'Both')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-2">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-3">
                        {renderInputField("College Name", "collegeName", "text")}
                        {renderInputField("College Address", "collegeAddress", "text")}
                        {renderInputField("College Location", "collegeLocation", "text")}
                        {renderInputField("Authorized Name", "authorizedName", "text")}
                        {renderInputField("Phone Number", "phoneNumber", "tel")} 
                        {renderInputField("Mail ID", "mailID", "email")}

                        <div className="pt-4 space-y-3">
                            {renderInputField("No of Labs For Online Exam", "noOfLabsOnline", "number")}
                            {renderInputField("No of Rooms For Online Exams", "noOfRoomsOnline", "number")}
                            {renderInputField("How Many CC Cameras are Working", "ccCameras", "number")}
                            {renderInputField("How Many Systems Are Working", "systemsWorking", "number")}
                            {renderInputField("How Many Rooms", "totalRooms", "number")}
                            {renderInputField("Sitting Capacity per Room", "sittingCapacityPerRoom", "number")}
                        </div>
                    </div>

                    {/* Footer Buttons - Blue Colors Applied */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-200 gap-3 sm:gap-0">
                        <button
                            onClick={handleUploadDetails}
                            className="flex items-center justify-center w-full sm:w-auto px-6 py-2 text-white font-bold rounded-lg shadow-md transition transform hover:scale-105"
                            style={{ backgroundColor: customBlue }}
                        >
                            <Upload className="w-4 h-4 mr-2" /> Upload Details
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex items-center justify-center w-full sm:w-auto px-8 py-2 text-white font-bold rounded-lg shadow-md transition transform hover:scale-105"
                            style={{ backgroundColor: submitBlue }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal Render */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            />
        </div>
    );
};

export default ExamCenter;