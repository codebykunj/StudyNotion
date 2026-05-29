const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const User = require("./models/User");
const bcrypt = require("bcrypt");

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB.");

        const emailToReset = process.argv[2];
        const newPassword = process.argv[3];

        if (!emailToReset || !newPassword) {
            console.log("No email/password provided. Listing all Admin accounts:");
            const admins = await User.find({ accountType: "Admin" });
            if (admins.length === 0) {
                console.log("No admins found.");
            } else {
                admins.forEach(a => console.log(`- ${a.firstName} ${a.lastName} | Email: ${a.email}`));
            }
            console.log("\nTo reset a password, run:");
            console.log("node reset_pwd.js <email> <newPassword>");
            process.exit(0);
        }

        const user = await User.findOne({ email: emailToReset });
        if (!user) {
            console.log(`User with email ${emailToReset} not found.`);
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        console.log(`Password for ${emailToReset} has been successfully updated to: ${newPassword}`);
        process.exit(0);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

resetPassword();
