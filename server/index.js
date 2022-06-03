import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import ticketRoutes from './routes/tickets.js';
import authRoutes from './routes/auth.js';
import privateRoutes from './routes/private.js';
import userRoute from './routes/users.js';



//dotenv variables
dotenv.config();
const PORT = process.env.PORT || 3700;
const URL = process.env.DB_CONNECT;

const app = express();



//limit json files to 100mb ..
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

//routes
app.use("/api/auth", authRoutes)
app.use("/api/private", privateRoutes)
app.use('/Home', ticketRoutes);
app.use("/admin", userRoute);

//DB connection 
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log('Server is up and running !!')))
.catch((error) => console.log(error));

