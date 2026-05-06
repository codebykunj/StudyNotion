// // const mongoose = require("mongoose");
// // require("dotenv").config();

// // mongoose.connect(process.env.MONGODB_URL,
// // {
// //     useNewUrlParser:true,
// //     useUnifiedTopology:true,
// // })
// // .then(()=>{console.log("DB and App Conect Successfully")})
// // .catch((error)=>{console.log(error)
// //                 console.log("DB Connection Failed")
// //                 process.exit(1);
// // })


// const mongoose = require("mongoose");
// require("dotenv").config();

// exports.database = ()=>{
// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => { console.log("DB and App Connect Successfully") })
//     .catch((error) => {
//         console.log(error)
//         console.log("DB Connection Failed")
//         process.exit(1);
//     })

// }
const mongoose = require("mongoose");

require("dotenv").config();

const dbConnection = () =>
{

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("Server and Database Connect Sucessfully")})
.catch(()=>{console.log("Due to Some Reason Connection is intrupted")})
}
module.exports = dbConnection