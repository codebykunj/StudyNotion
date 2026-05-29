import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiconnector } from "../../../services/apiconnector";
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner, FaMicrophone, FaBrain, FaLightbulb } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SUGGESTED_PROMPTS = [
    "Summarize this topic briefly",
    "Explain this to me like I'm 5",
    "Quiz me on React concepts",
    "Give me an example code snippet"
];

const ChatMessage = ({ msg }) => (
    <div className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${msg.role === "user" ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-richblack-900" : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
            }`}>
            {msg.role === "user" ? "U" : <FaRobot />}
        </div>
        <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                ? "bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 rounded-tr-none"
                : "bg-richblack-800/80 backdrop-blur-sm border border-richblack-700 text-richblack-50 rounded-tl-none"
            }`}>
            {msg.role === "model" ? (
                <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <div className="rounded-xl overflow-hidden my-3 border border-richblack-700 shadow-md">
                                        <div className="bg-richblack-900 text-richblack-300 text-xs px-4 py-1.5 flex justify-between items-center">
                                            <span className="font-mono">{match[1]}</span>
                                        </div>
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{ margin: 0, padding: '1rem', background: '#000814', fontSize: '0.85rem' }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className="bg-richblack-900 px-1.5 py-0.5 rounded text-pink-300 font-mono text-[0.9em]" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
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
    const [messages, setMessages] = useState([]);

    // Reset history when the logged-in user changes
    useEffect(() => {
        if (user) {
            setMessages([
                { role: "model", text: `Hello ${user?.firstName || "there"}! 👋 I'm **StudyBro**, your AI tutor. Ask me anything about your course or any topic you're learning!` }
            ]);
            setInput("");
        }
    }, [user?._id]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [isListening, setIsListening] = useState(false);

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (SpeechRecognition && !recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(prev => (prev + " " + transcript).trim());
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, [SpeechRecognition]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Your browser does not support Speech Recognition.");
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };


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
    }, [isOpen, messages, loading]);

    const handleSend = async (customText = null) => {
        const textToSend = typeof customText === "string" ? customText : input.trim();
        if (!textToSend || loading) return;

        const userMsg = { role: "user", text: textToSend };
        setMessages((prev) => [...prev, userMsg]);
        if (typeof customText !== "string") setInput("");
        setLoading(true);

        try {
            const history = messages
                .filter((m) => m.role !== "model" || messages.indexOf(m) > 0)
                .map((m) => ({ role: m.role, text: m.text }));

            const response = await apiconnector(
                "POST",
                `${BASE_URL}/chatbot/chat`,
                { message: textToSend, history },
                { Authorization: `Bearer ${token?.replace(/"/g, "")}` }
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

    if (!user) return null;

    const getChatWindowStyle = () => {
        let chatX = position.x - 380 + 56; 
        if (chatX < 20) chatX = 20;
        if (chatX + 380 > window.innerWidth - 20) chatX = window.innerWidth - 380 - 20;

        let chatY = position.y - 520 - 16; 
        if (chatY < 20) {
            chatY = position.y + 56 + 16;
        }
        if (chatY + 520 > window.innerHeight - 20) {
            chatY = window.innerHeight - 520 - 20;
        }

        return {
            position: 'fixed',
            left: `${chatX}px`,
            top: `${chatY}px`,
            boxShadow: "0 30px 60px -10px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.1)",
            pointerEvents: 'auto',
            zIndex: 9998,
            width: '380px',
            height: '520px',
            minWidth: '320px',
            minHeight: '400px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            resize: 'both',
            overflow: 'hidden'
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
                    className="bg-richblack-900/80 backdrop-blur-xl rounded-3xl border border-richblack-700/50 flex flex-col"
                    style={getChatWindowStyle()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md flex-shrink-0 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shadow-inner border border-white/10">🤖</div>
                            <div>
                                <p className="text-white font-bold text-[15px] tracking-wide">StudyBro</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-caribbeangreen-200 animate-pulse"></span>
                                    <p className="text-indigo-100 text-xs font-medium">AI Tutor • Online</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-richblack-600">
                        {messages.map((msg, i) => (
                            <ChatMessage key={i} msg={msg} />
                        ))}

                        {/* Suggested Prompts - Only show at start */}
                        {messages.length === 1 && !loading && (
                            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                {SUGGESTED_PROMPTS.map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(prompt)}
                                        className="bg-richblack-800 hover:bg-richblack-700 text-richblack-100 border border-richblack-600 hover:border-indigo-500 text-[11px] px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
                                    >
                                        <FaLightbulb className="text-yellow-100" />
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Animated Thinking State */}
                        {loading && (
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                                    <FaBrain className="text-sm" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-richblack-800 border border-richblack-700">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                        <span className="text-xs text-richblack-300 font-medium ml-1">Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="px-4 py-4 bg-richblack-900/50 backdrop-blur-md border-t border-richblack-700/50 flex-shrink-0">
                        <div className="flex items-end gap-2 bg-richblack-800 rounded-2xl p-2 border border-richblack-600 shadow-inner focus-within:border-indigo-500/50 transition-colors">
                            <textarea
                                ref={inputRef}
                                rows={1}
                                className="flex-1 bg-transparent text-richblack-50 text-sm outline-none resize-none max-h-[80px] min-h-[36px] py-2 px-2 placeholder:text-richblack-400"
                                placeholder="Message StudyBro..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            
                            {/* Dynamic Voice Waveforms */}
                            {isListening ? (
                                <div className="flex-shrink-0 flex items-center justify-center h-9 w-9 bg-pink-500/20 rounded-xl mr-1 cursor-pointer" onClick={toggleListening}>
                                    <div className="flex items-end justify-center gap-[2px] h-4">
                                        <div className="w-1 bg-pink-500 rounded-full animate-[bounce_1s_infinite] h-2"></div>
                                        <div className="w-1 bg-pink-500 rounded-full animate-[bounce_1s_infinite_0.2s] h-4"></div>
                                        <div className="w-1 bg-pink-500 rounded-full animate-[bounce_1s_infinite_0.4s] h-3"></div>
                                        <div className="w-1 bg-pink-500 rounded-full animate-[bounce_1s_infinite_0.6s] h-5"></div>
                                        <div className="w-1 bg-pink-500 rounded-full animate-[bounce_1s_infinite_0.8s] h-2"></div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={toggleListening}
                                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-richblack-700 hover:bg-richblack-600 text-richblack-200 hover:text-white"
                                    title="Voice to Text"
                                >
                                    <FaMicrophone className="text-[13px]" />
                                </button>
                            )}

                            <button
                                onClick={() => handleSend(null)}
                                disabled={!input.trim() || loading || isListening}
                                className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-richblack-900 flex items-center justify-center transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? <FaSpinner className="animate-spin text-sm" /> : <FaPaperPlane className="text-sm ml-0.5" />}
                            </button>
                        </div>
                        {/* Empty space for resize handle to not overlap */}
                        <div className="h-1 w-full bg-transparent"></div>
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
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 cursor-grab active:cursor-grabbing ${isOpen
                        ? "bg-richblack-800 text-white hover:bg-richblack-700 scale-95"
                        : "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white hover:scale-105 animate-[pulse_3s_infinite]"
                    }`}
                style={{
                    boxShadow: isOpen ? "0 4px 15px rgba(0,0,0,0.3)" : "0 10px 25px rgba(99,102,241,0.5), 0 0 15px rgba(236,72,153,0.3)",
                    position: 'absolute',
                    bottom: isOpen ? '0px' : '0px',
                    right: isOpen ? '0px' : '0px',
                    pointerEvents: 'auto'
                }}
                title="StudyBro AI Tutor"
            >
                {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="drop-shadow-md" />}
            </div>
        </div>
    );
};

export default AIChatbot;
