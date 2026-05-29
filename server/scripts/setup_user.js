const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');
const Profile = require('./models/Profile');

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/StudyNotion", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("DB Connected");
    const email = "ompatel9601@gmail.com";
    let user = await User.findOne({email});
    const hashedPassword = await bcrypt.hash("12345678", 10);

    if(!user) {
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        user = new User({
            firstName: "Om",
            lastName: "Patel",
            email: email,
            password: hashedPassword,
            accountType: "Instructor",
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=Om%20Patel`,
            approved: true
        });
        await user.save();
        console.log("User created!");
    } else {
        user.password = hashedPassword;
        user.accountType = "Instructor";
        await user.save();
        console.log("User updated!");
    }
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
