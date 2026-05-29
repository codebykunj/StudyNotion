import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-hot-toast"
import { apiconnector } from '../../../../services/apiconnector'
import { useSelector } from 'react-redux'

const AIGeneratorModal = ({ setAiModal, subsectionText }) => {
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState(subsectionText || "")
    const { token } = useSelector((state) => state.auth)

    const handleGenerate = async () => {
        if (!text) {
            toast.error("Please enter some text")
            return
        }
        
        setLoading(true)
        try {
            // Note: Update base URL if needed, relying on relative or apiconnector configuration
            const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1"
            const response = await apiconnector("POST", `${BASE_URL}/ai-tools/generate`, { text }, {
                Authorization: `Bearer ${token}`
            })

            if (response?.data?.success) {
                toast.success("Content generated successfully!")
                // Here we can save the data to state/redux or pass to parent
                console.log("Generated Content:", response.data.data)
                setAiModal(false)
            } else {
                toast.error("Failed to generate content")
            }
        } catch (error) {
            console.error("AI Generation error:", error)
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-xl font-semibold text-richblack-5">AI Quiz & Flashcard Generator</p>
                    <button onClick={() => setAiModal(false)}>
                        <AiOutlineClose className="text-2xl text-richblack-5" />
                    </button>
                </div>
                
                <div className="flex flex-col gap-y-4">
                    <label className="text-sm text-richblack-5">
                        Subsection Transcript / Text <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea 
                        className="form-style min-h-[200px] w-full bg-richblack-700 p-3 text-richblack-5 rounded-md"
                        placeholder="Paste the text from your course here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    
                    <button
                        disabled={loading}
                        onClick={handleGenerate}
                        className={`flex items-center bg-yellow-50 justify-center gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Generating..." : "Generate Magic ✨"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AIGeneratorModal
