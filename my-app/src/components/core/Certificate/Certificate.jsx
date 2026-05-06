import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload, FaCertificate } from "react-icons/fa";
import LogoFullLight from "../../../assets/Logo/Logo-Full-Light.png";

const Certificate = ({ courseName, userName, date }) => {
  const certificateRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // High quality
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userName.replace(/\s+/g, "_")}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
    setDownloading(false);
  };

  return (
    <>
      {/* Import elegant cursive font for the signature */}
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
      
      <button
        onClick={(e) => {
            e.stopPropagation();
            handleDownload();
        }}
        disabled={downloading}
        className="flex flex-shrink-0 items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-richblack-900 font-bold rounded-xl hover:scale-105 transition-all disabled:opacity-50"
      >
        <FaCertificate />
        {downloading ? "Generating..." : "Download Certificate"}
      </button>

      {/* Hidden Certificate Template */}
      <div className="overflow-hidden h-0 w-0 absolute top-[-9999px] left-[-9999px]">
        <div 
            ref={certificateRef} 
            className="w-[1122px] h-[793px] bg-richblack-900 flex flex-col items-center justify-center relative p-10 font-sans"
            style={{
                backgroundImage: "radial-gradient(circle at center, #161d29 0%, #000814 100%)"
            }}
        >
            {/* Decorative Border */}
            <div className="absolute inset-4 border-[12px] border-double border-yellow-500 opacity-80" />
            <div className="absolute inset-8 border-[2px] border-solid border-yellow-200 opacity-50" />
            
            {/* Content */}
            <div className="z-10 flex flex-col items-center text-center px-20 py-16 w-full h-full justify-between">
                
                {/* Header / Logo */}
                <div className="flex flex-col items-center">
                    <img src={LogoFullLight} alt="StudyNotion Logo" className="h-12 mb-4 object-contain" />
                    
                    <h1 className="text-5xl font-extrabold text-yellow-50 tracking-widest uppercase mb-1">
                        Certificate of Completion
                    </h1>
                    <p className="text-xl text-yellow-200/80 tracking-widest uppercase">
                        StudyNotion Platform
                    </p>
                </div>

                {/* Main Body */}
                <div className="flex flex-col items-center">
                    <p className="text-xl text-richblack-300 italic mb-2">This is proudly presented to</p>
                    <h2 className="text-6xl font-bold text-yellow-400 mb-4 font-serif border-b-2 border-richblack-700 pb-2 inline-block px-10">
                        {userName}
                    </h2>

                    <p className="text-lg text-richblack-300 italic mb-4 max-w-[800px] leading-relaxed">
                        for demonstrating exceptional dedication, mastery of the subject matter, and successfully completing all rigorous coursework and assessments for the designated program.
                    </p>

                    <h3 className="text-4xl font-bold text-white max-w-[800px] leading-tight">
                        {courseName}
                    </h3>
                </div>

                {/* Footer / Signatures */}
                <div className="flex w-full max-w-[950px] justify-between items-end mt-4">
                    {/* Left: Date */}
                    <div className="text-center w-64">
                        <div className="text-xl font-bold text-white border-b border-richblack-600 pb-2 mb-2 px-8">
                            {date}
                        </div>
                        <p className="text-sm text-richblack-400 uppercase tracking-wider">Date of Completion</p>
                    </div>
                    
                    {/* Center: Signature (Replaced SN Seal) */}
                    <div className="text-center w-64 flex flex-col items-center">
                        <div 
                           className="text-yellow-400 border-b border-richblack-600 pb-2 mb-2 px-8 w-full"
                           style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.5rem", lineHeight: "1" }}
                        >
                            StudyNotion Admin
                        </div>
                        <p className="text-sm text-richblack-400 uppercase tracking-wider">Authorized Signature</p>
                    </div>

                    {/* Right: Certificate ID & Seal */}
                    <div className="text-center w-64 flex flex-col items-center">
                        <div className="text-xl font-bold text-white border-b border-richblack-600 pb-2 mb-2 px-8 font-mono">
                            {Math.random().toString(36).substring(2, 10).toUpperCase()}-SN
                        </div>
                        <p className="text-sm text-richblack-400 uppercase tracking-wider">Certificate ID</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;
