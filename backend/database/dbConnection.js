import mongoose from "mongoose";

// BY using Promises method
/*
const dbConnection = () => {
	mongoose.connect(process.env.MONGODB_URL,
		{
			dbName: process.env.DB_NAME
		})
		.then(() => {
			console.log(`Connected to the datebase!`);
		})
		.catch((err) => {
			console.log(`Some error occured while connecting to the database: ${err}`);
		})
}
*/


// BY using Async-await method.
// /*
const dbConnection = async () => {
	try {
		const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
		console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

	} catch (error) {
		console.log(`MONGODB connection FAILED : ${error}`);
		process.exit(1)
	}
}
// */

export default dbConnection;



