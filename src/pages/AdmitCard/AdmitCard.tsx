import React, { useState, useRef } from 'react';
// All necessary icons imported here
import { 
    FileText, ChevronDown, Upload, Signature, Image, X, 
    Download, Send, User, MapPin, Check 
} from 'lucide-react'; 

// =========================================================================
// 1. Success Modal Component (Image Type Success Card)
// =========================================================================

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Background color matching the deep blue/teal from the screenshot
    const modalBgColor = '#003366'; // Deep blue/teal background
    const buttonColor = '#1ABC9C'; // Bright teal button color

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-sm">
                
                <div 
                    className="p-8 flex flex-col items-center justify-center text-white relative" 
                    style={{ backgroundColor: modalBgColor }}
                >
                    {/* Close Button (Top right X) */}
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-300 hover:text-white transition">
                        <X className="w-6 h-6" />
                    </button>

                    {/* Checkmark Icon */}
                    <div className="bg-green-500 rounded-full p-2 mb-4 border-4 border-white">
                        <Check className="w-10 h-10 text-white" />
                    </div>

                    {/* Success Message */}
                    <p className="text-lg font-semibold mt-4 mb-6">
                        Successfully completed
                    </p>
                    <p className="text-sm text-gray-300 text-center mb-6">
                        Admit Cards have been successfully generated and sent!
                    </p>

                    {/* OK Button */}
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
// 2. Signature Modal Component (Unchanged)
// =========================================================================

interface SignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (signatureData: string) => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, onSave }) => {
    const [signatureFile, setSignatureFile] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSignatureFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (signatureFile) {
            onSave(signatureFile);
            setSignatureFile(''); 
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <Signature className="w-5 h-5 mr-2 text-red-500" /> Upload Authorized Signature
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X /></button>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Please upload your digital signature image (.png, .jpg).</p>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div 
                        className="h-32 w-full border border-gray-400 border-dashed rounded-lg flex items-center justify-center text-gray-500 bg-gray-50 cursor-pointer p-2 overflow-hidden"
                        onClick={() => fileInputRef.current?.click()}
                        title="Click to Upload Signature Image"
                    >
                        {signatureFile ? (
                            <img 
                                src={signatureFile} 
                                alt="Uploaded Signature" 
                                className="h-full w-auto object-contain" 
                            />
                        ) : (
                            <div className="flex flex-col items-center">
                                <Upload className="w-6 h-6 mb-2" />
                                <span>Click here to upload signature image</span>
                                <span className="text-xs text-gray-400 mt-1">PNG, JPG recommended</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button 
                            onClick={handleSave} 
                            disabled={!signatureFile}
                            className={`px-4 py-2 text-white rounded-lg transition ${signatureFile ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            <Image className="w-4 h-4 mr-2 inline-block"/> Save Uploaded Signature
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// =========================================================================
// 3. Candidate List View Component (Unchanged)
// =========================================================================

interface Candidate {
    id: number;
    candidateId: string;
}

const mockCandidates: Candidate[] = [
    { id: 1, candidateId: 'AP125A0001' },
    { id: 2, candidateId: 'AP125B0002' },
    { id: 3, candidateId: 'AP125C0003' },
    { id: 4, candidateId: 'AP125D0004' },
    { id: 5, candidateId: 'AP125E0005' },
    { id: 6, candidateId: 'AP125F0006' },
    { id: 7, candidateId: 'AP125G0007' }, 
    { id: 8, candidateId: 'AP125H0008' },
    { id: 9, candidateId: 'AP125I0009' },
    { id: 10, candidateId: 'AP125J0010' },
];

interface AdmitCardCandidateListProps {
    onSendSuccess: () => void; // Prop to open the Success Modal
}

const AdmitCardCandidateList: React.FC<AdmitCardCandidateListProps> = ({ onSendSuccess }) => {
    const handleAdmitCardAction = (id: number) => {
        console.log(`Viewing/Downloading Admit Card for Candidate ${id}`);
    };

    const handleDownloadAll = () => {
         console.log('Downloading all Admit Cards...');
    };
    
    // The pink color from the user's screenshot
    const buttonPinkColor = '#ff3399'; 

    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
            
            {/* Header Row (Blue Background) */}
            <div className="flex items-center text-white p-3 font-bold text-lg" style={{ backgroundColor: '#5C5CFF' }}>
                <div className="w-1/12 text-center">Sr. No</div>
                <div className="w-2/3 ml-4">Candidate ID</div>
                <div className="w-1/3 text-center">Action</div>
            </div>

            {/* Candidate List Container with Scroll Limit */}
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {mockCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center py-3 px-3 hover:bg-gray-50 transition">
                        
                        {/* Sr. No */}
                        <div className="w-1/12 text-center text-gray-600">{candidate.id}.</div>
                        
                        {/* Candidate Info */}
                        <div className="w-2/3 flex items-center ml-4">
                            <div className="rounded-full bg-green-100 p-1 mr-3 border-2 border-green-500">
                                <User className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700 font-mono">{candidate.candidateId}</span>
                        </div>
                        
                        {/* Admit Card Button */}
                        <div className="w-1/3 text-center">
                            <button
                                onClick={() => handleAdmitCardAction(candidate.id)}
                                className="px-3 py-1 bg-teal-500 text-white rounded-lg text-sm font-semibold hover:bg-teal-600 transition shadow-md"
                            >
                                Admit Card
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-around items-center p-4 border-t border-gray-200">
                
                {/* Send Button (Triggers Success Modal) */}
                <button
                    onClick={onSendSuccess} // <-- Triggers the Success Modal
                    className="flex items-center px-6 py-2 text-white font-bold rounded-lg shadow-xl transition transform hover:scale-105"
                    style={{ backgroundColor: buttonPinkColor, hover: '#c9277d' }}
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                </button>

                {/* Download Button */}
                <button
                    onClick={handleDownloadAll}
                    className="flex items-center px-6 py-2 text-white font-bold rounded-lg shadow-xl transition transform hover:scale-105"
                    style={{ backgroundColor: buttonPinkColor, hover: '#c9277d' }}
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                </button>
            </div>
        </div>
    );
};


// =========================================================================
// 4. Main Admit Card Component (With Validation)
// =========================================================================

const AdmitCard: React.FC = () => {
    const [view, setView] = useState<'form' | 'list'>('form'); 
    const [jobCategory, setJobCategory] = useState('ssc');
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState(''); 
    const [signatureData, setSignatureData] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    
    // New state for the success modal
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 

    const handleGenerate = () => {
        // --- 🚨 Validation Logic Added Here 🚨 ---
        const missingFields: string[] = [];

        if (!jobTitle.trim()) missingFields.push('Job Title');
        if (!location.trim()) missingFields.push('Location');
        if (!signatureData) missingFields.push('Authorized Signature');
        if (!pdfFile) missingFields.push('PDF Template');

        if (missingFields.length > 0) {
            const alertMessage = "🛑 Please fill or complete all required fields before generating:\n\n" + missingFields.join('\n');
            alert(alertMessage);
            return; // Stop execution and do not switch view
        }
        // --- End Validation Logic ---

        // If validation passes, switch to list view
        setView('list'); 
    };

    const handleSignatureSave = (data: string) => {
        setSignatureData(data);
    };

    const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPdfFile(event.target.files[0]);
        }
    };
    
    const categories = ['ssc', 'rrb', 'upsc', 'ibps'];

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-full">
            
            {/* View 1: Admit Card Generation Form */}
            {view === 'form' && (
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
                    
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-6 border-b pb-3 flex items-center justify-center">
                        <FileText className="w-6 h-6 mr-2 text-blue-600" /> Admit Card Form
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-y-6">
                        
                        {/* Job Category */}
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 font-medium w-1/3">Job Category :</label>
                            <div className="relative w-2/3">
                                <select
                                    value={jobCategory}
                                    onChange={(e) => setJobCategory(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Job Title */}
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 font-medium w-1/3">Job Title :</label>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Enter Job Title (Required)"
                                className="w-2/3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Authorized Signature */}
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 font-medium w-1/3">Authorized Signature :</label>
                            <div className="w-2/3 flex items-center space-x-3">
                                <div 
                                    className={`flex-1 p-1 border rounded-lg h-10 flex items-center justify-center cursor-pointer 
                                        ${signatureData ? 'border-green-500' : 'border-red-500 bg-red-50'}`}
                                    onClick={() => setIsSignatureModalOpen(true)}
                                    title="Click to Add Signature Image"
                                >
                                    {signatureData ? (
                                        <img 
                                            src={signatureData} 
                                            alt="Authorized Signature" 
                                            className="h-full w-auto object-contain"
                                        />
                                    ) : (
                                        <span className="text-red-500 text-sm italic">Required: Click to Add Signature</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsSignatureModalOpen(true)}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                                >
                                    <Signature className="w-4 h-4 mr-2" /> Sign
                                </button>
                            </div>
                        </div>
                        
                        {/* Location */}
                         <div className="flex items-center justify-between">
                            <label className="text-gray-700 font-medium w-1/3">Location :</label>
                            <div className="w-2/3 flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter Location/Place (Required)"
                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        
                        {/* PDF Upload */}
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 font-medium w-1/3">PDF Template :</label>
                            <div className="w-2/3 flex items-center space-x-3">
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={handlePdfUpload} 
                                    id="pdf-upload" 
                                    className="hidden"
                                />
                                <label 
                                    htmlFor="pdf-upload"
                                    className={`flex-1 flex items-center justify-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition shadow-md cursor-pointer ${pdfFile ? 'bg-green-600' : 'bg-blue-600'}`}
                                >
                                    <Upload className="w-4 h-4 mr-2" /> {pdfFile ? 'Change PDF' : 'Upload PDF (Required)'}
                                </label>
                                {pdfFile && <span className="text-sm text-green-600 font-semibold truncate max-w-[100px]">{pdfFile.name}</span>}
                            </div>
                        </div>

                        {/* Generate Button (Triggers view switch) */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleGenerate}
                                className="px-12 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View 2: Candidate List (After generation) */}
            {view === 'list' && (
                <AdmitCardCandidateList 
                    onSendSuccess={() => setIsSuccessModalOpen(true)} // Pass handler to list
                />
            )}

            {/* Signature Modal Render */}
            <SignatureModal 
                isOpen={isSignatureModalOpen} 
                onClose={() => setIsSignatureModalOpen(false)} 
                onSave={handleSignatureSave} 
            />
            
            {/* Success Modal Render (The 'Image Type' Pop-up) */}
            <SuccessModal 
                isOpen={isSuccessModalOpen} 
                onClose={() => setIsSuccessModalOpen(false)} 
            />
        </div>
    );
};

export default AdmitCard;