const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const coluldConnect = () => {
    const CLOUD_NAME = process.env.CLOUD_NAME
    const APP_KEY = process.env.APP_KEY
    const SCRECT_KEY = process.env.SCRECT_KEY
    try{
    // cloudinary.config(CLOUD_NAME,APP_KEY,SCRECT_KEY);
    cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: APP_KEY,
    api_secret: SCRECT_KEY
});

    }
    catch(error){
    console.log(error)
    console.log("Due to some Error connection to cloudnary is not setablish")
    }
}
module.exports = coluldConnect;