/**
 * seedAdmin.js — Run this ONCE to create the default Admin account.
 * 
 * Usage: node server/seedAdmin.js
 * 
 * This creates an Admin user with the credentials below.
 * Change the email/password BEFORE running if you want different credentials.
 */

const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const User = require("./models/User");
const Profile = require("./models/Profile");
const bcrypt = require("bcrypt");

const ADMIN_EMAIL = "admin@studynotion.com";
const ADMIN_PASSWORD = "Admin@12345";
const ADMIN_FIRST_NAME = "Super";
const ADMIN_LAST_NAME = "Admin";

async function seedAdmin() {
    try {
        // Connect to MongoDB
        const dbUrl = process.env.MONGODB_URL;
        if (!dbUrl) throw new Error("MONGODB_URL not found in .env file");

        await mongoose.connect(dbUrl);
        console.log("✅ Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
        if (existingAdmin) {
            console.log("⚠️  Admin already exists with email:", ADMIN_EMAIL);
            console.log("   Login Credentials:");
            console.log("   Email:   ", ADMIN_EMAIL);
            console.log("   Password:", ADMIN_PASSWORD);
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        // Create a profile for Admin
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: "Platform Administrator",
            contactNumber: null,
        });

        // Create Admin user
        const admin = await User.create({
            firstName: ADMIN_FIRST_NAME,
            lastName: ADMIN_LAST_NAME,
            email: ADMIN_EMAIL,
            password: hashedPassword,
            accountType: "Admin",
            instructorStatus: "Approved",
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${ADMIN_FIRST_NAME} ${ADMIN_LAST_NAME}`,
        });

        console.log("\n🎉 Admin account created successfully!");
        console.log("─────────────────────────────────────");
        console.log("   Name:    ", ADMIN_FIRST_NAME, ADMIN_LAST_NAME);
        console.log("   Email:   ", ADMIN_EMAIL);
        console.log("   Password:", ADMIN_PASSWORD);
        console.log("─────────────────────────────────────");
        console.log("⚠️  Please change the password after first login!\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding admin:", error.message);
        process.exit(1);
    }
}

seedAdmin();
