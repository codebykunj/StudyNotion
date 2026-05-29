const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Import routes (ensure correct filename and path)
const CourseRoutes = require("./routes/Course");
const PaymentsRoutes = require("./routes/Payments");
const ProfileRoutes = require("./routes/Profile");
const UserRoutes = require("./routes/User");
const ContactRoutes = require("./routes/Contact");
const AdminRoutes = require("./routes/Admin");
const QuizRoutes = require("./routes/Quiz");
const ChatbotRoutes = require("./routes/Chatbot");
const DiscussionRoutes = require("./routes/Discussion");
const AIToolsRoutes = require("./routes/AITools");
const AnalyticsRoutes = require("./routes/Analytics");
const GamificationRoutes = require("./routes/Gamification");





// Cloudinary connection
//  require("./utils/imageUploader");
// const { uploadImageToCloudinary } = require("./utils/imageUploader");
// uploadImageToCloudinary();


//cloudinary connection
const cloudinary = require('./config/cloudinary')
cloudinary();

// Database connection
const dbConnection = require("./config/database");
dbConnection();




// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const fileUpload = require("express-fileupload");
const os = require("os");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  })
);


// Mount routes with different base paths
app.use("/api/v1/courses", CourseRoutes);
app.use("/api/v1/payments", PaymentsRoutes);
app.use("/api/v1/profile", ProfileRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/contact", ContactRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/quiz", QuizRoutes);
app.use("/api/v1/chatbot", ChatbotRoutes);
app.use("/api/v1/discussion", DiscussionRoutes);
app.use("/api/v1/ai-tools", AIToolsRoutes);
app.use("/api/v1/analytics", AnalyticsRoutes);
app.use("/api/v1/gamification", GamificationRoutes);


// Default route
app.use("/", (req, res) => {
  // res.json({
  //   success: true,
  //   message: "Your Server is Running",
  // });
  console.log("This is the default route")
});

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-course-room", (courseId) => {
    socket.join(courseId);
    console.log(`User ${socket.id} joined room ${courseId}`);
  });

  socket.on("send-message", (data) => {
    // Broadcast to others in the room, including the sender if desired
    io.to(data.courseId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

