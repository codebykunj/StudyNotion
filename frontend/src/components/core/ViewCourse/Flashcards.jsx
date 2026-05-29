import React, { useState } from 'react'
import { IoArrowBack, IoArrowForward } from "react-icons/io5"

const Flashcards = ({ flashcards = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    if (!flashcards || flashcards.length === 0) {
        return <div className="text-richblack-5">No flashcards available for this section.</div>
    }

    const currentCard = flashcards[currentIndex]

    const handleNext = () => {
        setIsFlipped(false)
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        setIsFlipped(false)
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    return (
        <div className="flex flex-col items-center gap-y-6 my-10">
            <h2 className="text-2xl font-bold text-richblack-5">Study Flashcards</h2>
            
            <div 
                className="relative w-full max-w-[500px] h-[300px] cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-8 bg-richblack-800 border-2 border-yellow-50 rounded-xl shadow-[0_0_15px_rgba(255,214,10,0.2)]">
                        <p className="text-xl text-center text-richblack-5">{currentCard?.front}</p>
                    </div>
                    
                    {/* Back */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-8 bg-yellow-50 border-2 border-yellow-50 rounded-xl">
                        <p className="text-xl text-center text-richblack-900 font-medium">{currentCard?.back}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-3 bg-richblack-700 rounded-full text-richblack-5 disabled:opacity-50 hover:bg-richblack-600 transition-all"
                >
                    <IoArrowBack size={24} />
                </button>
                <p className="text-richblack-200">
                    {currentIndex + 1} / {flashcards.length}
                </p>
                <button 
                    onClick={handleNext}
                    disabled={currentIndex === flashcards.length - 1}
                    className="p-3 bg-richblack-700 rounded-full text-richblack-5 disabled:opacity-50 hover:bg-richblack-600 transition-all"
                >
                    <IoArrowForward size={24} />
                </button>
            </div>
            <p className="text-richblack-300 text-sm">Click the card to flip</p>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    )
}

export default Flashcards
