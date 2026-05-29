const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Course = require('./models/Course');
const Section = require('./models/Section');
const SubSection = require('./models/SubSection');
const Category = require('./models/Category');

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/StudyNotion", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("DB Connected for Seeding Courses");
    
    const email = "ompatel9601@gmail.com";
    const instructor = await User.findOne({email});
    
    if(!instructor) {
        console.error("Instructor not found!");
        process.exit(1);
    }

    // Get a category
    let category = await Category.findOne();
    if(!category) {
        category = await Category.create({ name: "Web Development", description: "All web dev courses" });
    }

    const coursesData = [
        {
            title: "Web Development Bootcamp",
            desc: "Learn HTML, CSS, JavaScript and more.",
            learn: "Build fully functional web applications.",
            price: 500,
            tags: ["Web", "Development", "HTML"],
            instructions: ["Have a working computer", "Basic understanding of typing"],
        },
        {
            title: "React Mastery 2024",
            desc: "Master React Hooks, Context, and Redux.",
            learn: "Build complex SPAs with React.",
            price: 0,
            tags: ["React", "JavaScript", "Frontend"],
            instructions: ["Know basic JavaScript", "Familiarity with ES6"],
        },
        {
            title: "Node.js Essentials",
            desc: "Backend development with Express and MongoDB.",
            learn: "Create scalable RESTful APIs.",
            price: 800,
            tags: ["Node", "Express", "Backend"],
            instructions: ["Understand JavaScript", "Understand basic HTTP"],
        },
        {
            title: "Python for Data Science",
            desc: "Pandas, Numpy, Matplotlib, and Scikit-Learn.",
            learn: "Analyze data and build machine learning models.",
            price: 1200,
            tags: ["Python", "Data", "Science"],
            instructions: ["Basic programming concepts", "Interest in math"],
        },
        {
            title: "Machine Learning 101",
            desc: "A beginner's introduction to ML.",
            learn: "Understand supervised and unsupervised learning.",
            price: 750,
            tags: ["ML", "AI", "Python"],
            instructions: ["High school math", "Basic Python"],
        }
    ];

    const placeholderThumbnail = "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
    const placeholderVideo = "https://res.cloudinary.com/demo/video/upload/v1355998632/dog.mp4";

    for(let i=0; i<coursesData.length; i++) {
        const cData = coursesData[i];
        
        // Create Subsections
        const subSec1 = await SubSection.create({
            title: `Lecture 1: Introduction to ${cData.title}`,
            timeDuration: "10:00",
            description: "An overview of the entire course.",
            videoUrl: placeholderVideo
        });
        const subSec2 = await SubSection.create({
            title: `Lecture 2: Getting Started`,
            timeDuration: "15:00",
            description: "Setting up your environment.",
            videoUrl: placeholderVideo
        });

        // Create Section
        const section = await Section.create({
            sectionName: "Section 1: Basics",
            subSection: [subSec1._id, subSec2._id]
        });

        // Create Course
        const newCourse = await Course.create({
            courseName: cData.title,
            courseDescription: cData.desc,
            instructor: instructor._id,
            whatYouWillLearn: cData.learn,
            price: cData.price,
            thumbnail: placeholderThumbnail,
            category: category._id,
            tags: cData.tags,
            instructions: cData.instructions,
            courseContent: [section._id],
            status: "Published"
        });

        // Update Instructor with Course
        instructor.courses.push(newCourse._id);
        
        // Update Category with Course
        category.courses.push(newCourse._id);
        await category.save();

        console.log(`Created Course: ${cData.title}`);
    }
    await instructor.save();

    console.log("Successfully seeded 5 courses.");
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
