import dotenv from "dotenv"; // as early as server start env file will get load.  
import app from "./app.js"
import dbConnection from "./database/dbConnection.js";

dotenv.config({ path: "./config/config.env" });// loading the environment variable.

dbConnection(); // calling dbConnection

// Starting the service
app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is  running on port ${process.env.PORT}`);
});


// Importing cloudinary credentials.
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDNARY_CLIENT_NAME,
	api_key: process.env.CLOUDNARY_CLIENT_API_KEY,
	api_secret: process.env.CLOUDNARY_CLIENT_API_SECRET,
});

