const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

const categoriesData = [
  { name: "Web Development", description: "Learn to build modern web applications" },
  { name: "Data Science", description: "Master data analysis and machine learning" },
  { name: "Artificial Intelligence", description: "Explore the frontiers of AI" },
  { name: "UI/UX Design", description: "Design beautiful user interfaces" }
];

async function seed() {
  try {
    const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/StudyNotion";
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB for seeding...");
    
    for (const data of categoriesData) {
      const existing = await Category.findOne({ name: data.name });
      if (!existing) {
        await Category.create(data);
        console.log(`Created category: ${data.name}`);
      } else {
         console.log(`Category already exists: ${data.name}`);
      }
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
