import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connect.js';
import authRoute from "./routes/auth.js"
import usersRoute  from './routes/users.js';
import hotelRoute  from './routes/hotels.js';
import roomsRoute  from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
dotenv.config();


//middlewares
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use(express.json());


app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelRoute);
app.use("/api/rooms",roomsRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


const startServer = async () => {
  try {
    connectDB(process.env.MONGO);

    app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
}

startServer();