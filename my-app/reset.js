const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config({path: './server/.env'});

mongoose.connect(process.env.MONGODB_URL).then(async () => {
    try {
        const hp = await bcrypt.hash('12345678', 10);
        await mongoose.connection.collection('users').updateOne(
            { email: 'parekhdev999@gmail.com' },
            { $set: { password: hp, instructorStatus: 'Approved' } }
        );
        console.log('Reset successful');
    } catch(e) {
        console.log(e);
    }
    process.exit(0);
});
