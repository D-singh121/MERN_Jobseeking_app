import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // node js inbuilt package;


cloudinary.config({
	cloud_name: process.env.CLOUDNARY_CLIENT_NAME,
	api_key: process.env.CLOUDNARY_CLIENT_API_KEY,
	api_secret: process.env.CLOUDNARY_CLIENT_API_SECRET,
});

// Once we get the file in our local server envirnoment then we can only proceed for file upload .
const uploadOnCloudnary = async (localFilePath) => {
	try {
		if (!localFilePath) return null; // if file is not selected.

		const uploadedRes = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto"
		})
		// file uploaded successfully
		// console.log("file is uploaded on cloudnary ", uploadedRes.url);
		return uploadedRes; // returning to user for additional usecase.
	} catch (error) {
		// console.log(error);
		fs.unlinkSync(localFilePath); // once file get uploaded or occured any error we will delete the file of our server.
		return null
	}
}

export { uploadOnCloudnary };