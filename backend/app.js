import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js"

import { errorMiddleware } from "./middlewares/error.js";

const app = express();  // initialize app

// Middlewares usecase 
app.use(
	cors({
		origin: [process.env.FRONTEND_URL, process.env.MONGODB_URL],
		methods: ["GET", "POST", "DELETE", "PUT"],
		credentials: true
	})
);
app.use(cookieParser());
app.use(express.static("public")) // to storing file data like png , favicon etc.. 
app.use(express.json({ limit: "16kb" })); // it will only parse json data.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  // it convert string data into json.mostly used for URL param data sort.
app.use(fileUpload(
	{
		useTempFiles: true,
		tempFileDir: "/temp/",
	}
));


// using the routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/application', applicationRouter)

app.use(errorMiddleware); // always use this at the end and never call it like this "errorMiddleware()"

export default app;