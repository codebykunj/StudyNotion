import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer











// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   projectTaskData: [],      // All tasks with nested subtasks
//   projectEntireData: [],    // Full project info
//   completedTasks: [],       // IDs of tasks that are fully completed
//   totalNoOfTasks: 0,
// };

// const viewProjectSlice = createSlice({
//   name: "viewProject",
//   initialState,
//   reducers: {
//     // Set all tasks including nested subtasks
//     setProjectTaskData: (state, action) => {
//       state.projectTaskData = action.payload;
//     },

//     // Set entire project data
//     setEntireProjectData: (state, action) => {
//       state.projectEntireData = action.payload;
//     },

//     // Replace completed tasks list (array of task IDs)
//     setCompletedTask: (state, action) => {
//       state.completedTasks = action.payload;
//     },

//     // Set total number of tasks
//     setTotalNoOfTask: (state, action) => {
//       state.totalNoOfTasks = action.payload;
//     },

//     // Update a subTask's status and auto-update parent task status
//     updateSubTaskStatus: (state, action) => {
//       const { taskId, subTaskId, newStatus } = action.payload;

//       // Find parent task
//       const task = state.projectTaskData.find((t) => t._id === taskId);
//       if (!task) return;

//       // Find the subTask
//       const subTask = task.subTasks.find((st) => st._id === subTaskId);
//       if (!subTask) return;

//       // Update subTask status
//       subTask.status = newStatus;

//       // Determine parent task status based on all its subtasks
//       const allCompleted = task.subTasks.every(
//         (st) => st.status === "Completed" || st.status === "Done"
//       );
//       const anyInProgress = task.subTasks.some(
//         (st) => st.status === "InProgress" || st.status === "Todo" || st.status === "Pending"
//       );

//       if (allCompleted) {
//         task.status = "Completed";
//         if (!state.completedTasks.includes(task._id)) {
//           state.completedTasks.push(task._id);
//         }
//       } else if (anyInProgress) {
//         task.status = "InProgress";
//         state.completedTasks = state.completedTasks.filter((id) => id !== task._id);
//       } else {
//         task.status = "Pending";
//         state.completedTasks = state.completedTasks.filter((id) => id !== task._id);
//       }
//     },

//     // Optionally reset completed tasks
//     clearCompletedTasks: (state) => {
//       state.completedTasks = [];
//     },
//   },
// });

// export const {
//   setProjectTaskData,
//   setEntireProjectData,
//   setCompletedTask,
//   setTotalNoOfTask,
//   updateSubTaskStatus,
//   clearCompletedTasks,
// } = viewProjectSlice.actions;

// export default viewProjectSlice.reducer;




























