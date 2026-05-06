const express = require("express");

const app = express();

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

// Default route
app.use("/", (req, res) => {
  // res.json({
  //   success: true,
  //   message: "Your Server is Running",
  // });
  console.log("This is the default route")
});

// Start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
// Trigger nodemon restart after .env change
