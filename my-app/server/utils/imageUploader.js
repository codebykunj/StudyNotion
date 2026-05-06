const cloudinary =require("cloudinary").v2;

exports.uploadImageToCloudinary = async(file,folder,quality,height)=>{
    const options = {folder}
    if(quality)
    {
        options.quality=quality;
    }
    if(height)
    {
        options.height=height;
    }  
    // options.resoure_type="auto";
// options.resource_type = "video";
 const fileType = file.mimetype.split("/")[0]; // "image" or "video"

    if (fileType === "video") {
        options.resource_type = "video";
    } else {
        options.resource_type = "image"; // default
    }


    return  await cloudinary.uploader.upload(file.tempFilePath,options);
}


