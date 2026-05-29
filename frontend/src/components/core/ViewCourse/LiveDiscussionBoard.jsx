import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000"
let socket

const LiveDiscussionBoard = ({ courseId }) => {
    const { user } = useSelector((state) => state.profile)
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")

    useEffect(() => {
        // Initialize socket connection
        socket = io(BASE_URL)

        if (courseId) {
            socket.emit("join-course-room", courseId)
        }

        socket.on("receive-message", (data) => {
            setMessages((prev) => [...prev, data])
        })

        return () => {
            socket.disconnect()
        }
    }, [courseId])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                courseId: courseId,
                user: {
                    _id: user?._id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    image: user?.image,
                },
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            
            await socket.emit("send-message", messageData)
            setCurrentMessage("")
        }
    }

    return (
        <div className="flex flex-col h-[500px] w-full border border-richblack-700 bg-richblack-800 rounded-md p-4 mt-6">
            <h2 className="text-xl font-bold text-richblack-5 mb-4 border-b border-richblack-700 pb-2">Live Class Chat</h2>
            
            <div className="flex-1 overflow-y-auto flex flex-col gap-y-3 mb-4 pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-x-2 ${msg.user._id === user?._id ? "justify-end" : "justify-start"}`}>
                        {msg.user._id !== user?._id && (
                            <img src={msg.user.image} alt="avatar" className="w-8 h-8 rounded-full aspect-square" />
                        )}
                        <div className={`max-w-[75%] flex flex-col ${msg.user._id === user?._id ? "items-end" : "items-start"}`}>
                            {msg.user._id !== user?._id && (
                                <span className="text-[10px] text-richblack-300 ml-1">
                                    {msg.user.firstName} {msg.user.lastName}
                                </span>
                            )}
                            <div className={`px-3 py-2 rounded-lg text-sm ${msg.user._id === user?._id ? "bg-yellow-50 text-richblack-900 rounded-tr-none" : "bg-richblack-700 text-richblack-5 rounded-tl-none"}`}>
                                {msg.message}
                            </div>
                            <span className="text-[10px] text-richblack-400 mt-1">{msg.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-x-2 mt-auto">
                <input 
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage() }}
                    placeholder="Type a message..."
                    className="form-style flex-1 bg-richblack-700 text-richblack-5 rounded-md p-2 outline-none border border-richblack-600 focus:border-yellow-50"
                />
                <button 
                    onClick={sendMessage}
                    className="bg-yellow-50 text-richblack-900 font-semibold px-4 py-2 rounded-md hover:scale-95 transition-all"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default LiveDiscussionBoard
