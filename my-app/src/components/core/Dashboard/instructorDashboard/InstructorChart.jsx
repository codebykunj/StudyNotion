import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState('students')

  // Generate random RGB colors
  const getRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName.length > 20 ? course.courseName.substring(0, 20) + "..." : course.courseName),
    datasets: [
      {
        label: "Students Enrolled",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
        borderColor: '#1d1f2f',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName.length > 20 ? course.courseName.substring(0, 20) + "..." : course.courseName),
    datasets: [
      {
        label: "Income Generated (Rs)",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
        borderColor: '#1d1f2f',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const [chartType, setChartType] = useState('bar')

  const options = {
    plugins: {
      legend: {
        display: false, // Hide long legend labels
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-5 rounded-md bg-richblack-800 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-richblack-5">Enhanced Analytics</p>
          <div className="flex bg-richblack-700 p-1 rounded-lg w-max">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${chartType === 'bar' ? 'bg-yellow-50 text-richblack-900' : 'text-richblack-300'}`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('doughnut')}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${chartType === 'doughnut' ? 'bg-yellow-50 text-richblack-900' : 'text-richblack-300'}`}
            >
              Doughnut
            </button>
          </div>
        </div>

        <div className="space-x-2 font-semibold">
          <button
            onClick={() => setCurrChart('students')}
            className={`rounded-md px-4 py-1 text-sm transition-all duration-200 ${
              currChart === 'students'
                ? 'bg-yellow-50 text-richblack-900'
                : 'text-yellow-400 hover:bg-richblack-700'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart('income')}
            className={`rounded-md px-4 py-1 text-sm transition-all duration-200 ${
              currChart === 'income'
                ? 'bg-yellow-50 text-richblack-900'
                : 'text-yellow-400 hover:bg-richblack-700'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Chart area */}
      <div className="relative mx-auto flex h-[330px] w-full items-center justify-center mt-4">
        {courses?.length > 0 ? (
          chartType === 'bar' ? (
            <Bar
              data={currChart === 'students' ? chartDataForStudents : chartDataForIncome}
              options={{...options, plugins: { legend: { display: true }}}}
            />
          ) : (
            <Doughnut
              data={currChart === 'students' ? chartDataForStudents : chartDataForIncome}
              options={options}
            />
          )
        ) : (
          <p className="text-center text-richblack-300">
            No data available to visualize
          </p>
        )}
      </div>
    </div>
  )
}
