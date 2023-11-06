const cloudinary = require("cloudinary").v2;
require("dotenv").config();


cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.cloud_apiKey,
    api_secret:process.env.cloud_secretKey,
});

module.exports = cloudinary;