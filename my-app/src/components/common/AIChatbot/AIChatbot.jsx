import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiconnector } from "../../../services/apiconnector";
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ChatMessage = ({ msg }) => (
    <div className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${msg.role === "user" ? "bg-yellow-400 text-richblack-900" : "bg-indigo-600 text-white"
            }`}>
            {msg.role === "user" ? "U" : "🤖"}
        </div>
        <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                ? "bg-yellow-400 text-richblack-900 rounded-tr-none"
                : "bg-richblack-700 text-richblack-100 rounded-tl-none"
            }`}>
            {msg.role === "model" ? (
                <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
            ) : (
                msg.text
            )}
        </div>
    </div>
);

const AIChatbot = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "model", text: `Hello ${user?.firstName || "there"}! 👋 I'm **StudyBro**, your AI tutor. Ask me anything about your course or any topic you're learning!` }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Drag state
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef(null);
    const posRef = useRef(position);

    useEffect(() => {
        posRef.current = position;
    }, [position]);

    const handlePointerDown = (e) => {
        setIsDragging(true);
        // Prevent triggering the click event if we drag
        dragRef.current = {
            startX: e.clientX || e.touches?.[0]?.clientX,
            startY: e.clientY || e.touches?.[0]?.clientY,
            initialX: posRef.current.x,
            initialY: posRef.current.y,
            isDragged: false
        };
    };

    const handlePointerMove = (e) => {
        if (!isDragging || !dragRef.current) return;
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        const dx = clientX - dragRef.current.startX;
        const dy = clientY - dragRef.current.startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            dragRef.current.isDragged = true;
        }

        let newX = dragRef.current.initialX + dx;
        let newY = dragRef.current.initialY + dy;

        // Boundaries (60px buffer)
        newX = Math.max(20, Math.min(newX, window.innerWidth - 60));
        newY = Math.max(20, Math.min(newY, window.innerHeight - 60));

        setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);
            window.addEventListener('touchmove', handlePointerMove, { passive: false });
            window.addEventListener('touchend', handlePointerUp);
        } else {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
        }
        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [isDragging]);

    // Update position on window resize
    useEffect(() => {
        const handleResize = () => {
            setPosition(prev => ({
                x: Math.min(prev.x, window.innerWidth - 60),
                y: Math.min(prev.y, window.innerHeight - 60)
            }));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            inputRef.current?.focus();
        }
    }, [isOpen, messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", text: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const history = messages
                .filter((m) => m.role !== "model" || messages.indexOf(m) > 0)
                .map((m) => ({ role: m.role, text: m.text }));

            const response = await apiconnector(
                "POST",
                `${BASE_URL}/chatbot/chat`,
                { message: userMsg.text, history },
                { Authorization: `Bearer ${token}` }
            );

            if (response?.data?.success) {
                setMessages((prev) => [...prev, { role: "model", text: response.data.reply }]);
            } else {
                setMessages((prev) => [...prev, { role: "model", text: "Sorry, I couldn't get a response. Please try again." }]);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Sorry, there was an error. Please try again.";
            setMessages((prev) => [...prev, { role: "model", text: errorMsg }]);
        }
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Only show for logged-in users
    if (!user) return null;

    // Calculate dynamic chat window position to stay on-screen
    const getChatWindowStyle = () => {
        let chatX = position.x - 380 + 56; // Try to right-align with icon
        if (chatX < 20) chatX = 20;
        if (chatX + 380 > window.innerWidth - 20) chatX = window.innerWidth - 380 - 20;

        let chatY = position.y - 520 - 16; // Try to place above icon
        if (chatY < 20) {
            // If not enough space above, place below icon
            chatY = position.y + 56 + 16;
        }
        if (chatY + 520 > window.innerHeight - 20) {
            // Stick to bottom edge if too tall
            chatY = window.innerHeight - 520 - 20;
        }

        return {
            position: 'fixed',
            left: `${chatX}px`,
            top: `${chatY}px`,
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            pointerEvents: 'auto',
            zIndex: 9998
        };
    };

    return (
        <div
            className="fixed z-[9999]"
            style={{ left: `${position.x}px`, top: `${position.y}px`, transition: isDragging ? 'none' : 'transform 0.3s ease' }}
        >
            {/* Chat Window */}
            {isOpen && (
                <div
                    className="w-[350px] sm:w-[380px] h-[520px] bg-richblack-800 rounded-2xl border border-richblack-600 shadow-2xl flex flex-col overflow-hidden"
                    style={getChatWindowStyle()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-700 to-purple-700 flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
                            <div>
                                <p className="text-white font-bold text-sm">StudyBro</p>
                                <p className="text-indigo-200 text-xs">AI Tutor • Online</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-richblack-700 scrollbar-thumb-richblack-500">
                        {messages.map((msg, i) => (
                            <ChatMessage key={i} msg={msg} />
                        ))}
                        {loading && (
                            <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm">🤖</div>
                                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-richblack-700">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-richblack-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-richblack-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-richblack-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="px-3 py-3 border-t border-richblack-700 flex-shrink-0">
                        <div className="flex items-end gap-2 bg-richblack-700 rounded-xl px-3 py-2">
                            <textarea
                                ref={inputRef}
                                rows={1}
                                className="flex-1 bg-transparent text-richblack-100 text-sm outline-none resize-none max-h-[80px] placeholder:text-richblack-400"
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-richblack-900 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? <FaSpinner className="animate-spin text-xs" /> : <FaPaperPlane className="text-xs" />}
                            </button>
                        </div>
                        <p className="text-richblack-500 text-[10px] text-center mt-1.5">Powered by Google Gemini AI</p>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <div
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
                onClick={(e) => {
                    if (dragRef.current && dragRef.current.isDragged) return;
                    setIsOpen((prev) => !prev);
                }}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl transition-colors duration-300 cursor-grab active:cursor-grabbing ${isOpen
                        ? "bg-richblack-700 text-white hover:bg-richblack-600"
                        : "bg-gradient-to-br from-indigo-600 to-purple-700 text-white hover:shadow-indigo-500/40"
                    }`}
                style={{
                    boxShadow: isOpen ? "" : "0 8px 30px rgba(99,102,241,0.4)",
                    position: 'absolute',
                    bottom: isOpen ? '0px' : '0px',
                    right: isOpen ? '0px' : '0px',
                    pointerEvents: 'auto'
                }}
                title="StudyBro AI Tutor"
            >
                {isOpen ? <FaTimes /> : <FaRobot />}
            </div>
        </div>
    );
};

export default AIChatbot;
