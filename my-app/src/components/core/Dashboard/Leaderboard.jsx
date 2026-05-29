import React, { useEffect, useState } from 'react'
import { apiconnector } from '../../../services/apiconnector'

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1"
                const response = await apiconnector("GET", `${BASE_URL}/gamification/leaderboard`)
                if (response?.data?.success) {
                    setLeaderboard(response.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeaderboard()
    }, [])

    if (loading) {
        return <div className="text-richblack-5">Loading Leaderboard...</div>
    }

    return (
        <div className="flex flex-col gap-y-6">
            <h1 className="text-3xl font-medium text-richblack-5">Global Leaderboard 🏆</h1>
            <p className="text-richblack-300">Compete with other students and earn XP to climb the ranks!</p>

            <div className="bg-richblack-800 border border-richblack-700 rounded-md p-6">
                <div className="flex flex-col gap-y-4">
                    {leaderboard.length === 0 ? (
                        <p className="text-richblack-200">No students on the leaderboard yet.</p>
                    ) : (
                        leaderboard.map((student, index) => (
                            <div 
                                key={student._id} 
                                className={`flex items-center justify-between p-4 rounded-lg border ${
                                    index === 0 ? 'border-yellow-50 bg-yellow-900/20' : 
                                    index === 1 ? 'border-richblack-200 bg-richblack-700/50' : 
                                    index === 2 ? 'border-[#cd7f32] bg-[#cd7f32]/20' : 
                                    'border-richblack-700 bg-richblack-800'
                                }`}
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className="text-2xl font-bold text-richblack-5 w-8">
                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                    </div>
                                    <img 
                                        src={student.image} 
                                        alt={`${student.firstName} profile`} 
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-richblack-5">
                                            {student.firstName} {student.lastName}
                                        </p>
                                        <p className="text-sm text-richblack-300">
                                            🔥 {student.streak || 0} Day Streak
                                        </p>
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-yellow-50">
                                    {student.xp || 0} <span className="text-sm text-richblack-300">XP</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
