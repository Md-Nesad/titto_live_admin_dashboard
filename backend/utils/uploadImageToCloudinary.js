const cloudinary = require("../config/cloudinary");

//upload single image
const uploadSingleImage = async (file) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "titto_live" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(file.buffer);
  });

  return result;
};

module.exports = uploadSingleImage;
