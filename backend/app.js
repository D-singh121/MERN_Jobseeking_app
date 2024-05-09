import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
// import addCorsHeaders from "./middlewares/addCorsHeaders.js"; // future use only
import { errorMiddleware } from "./middlewares/error.js";

const app = express();  // initialize app

app.use(
	cors({
		origin: 'https://mern-jobseeking-app-devesh-choudharys-projects.vercel.app',
		// origin: [process.env.FRONTEND_URL, process.env.MONGODB_URL],
		method: ["GET", "POST", "DELETE", "PUT"],
		credentials: true,
	})
);

// app.use(addCorsHeaders) // future use only


app.use(cookieParser());
app.use(express.static("public")) // to storing file data like png , favicon etc.. 
app.use(express.json()); // it will only parse json data.
app.use(express.urlencoded({ extended: true }));  // it convert string data into json.mostly used for URL param data sort.
app.use(fileUpload(
	{
		useTempFiles: true,
		tempFileDir: "./public/temp",
	}
));


// Importing the routes
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js"

// using the routes
app.get('/', (req, res) => {
	res.send('Our Jobseeker application is perfectly working!')
})
app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applicationRouter)


app.use(errorMiddleware); // always use this at the end and never call it like this "errorMiddleware()"

export default app;
