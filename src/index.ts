import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import RestaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";
import {v2 as cloudinary} from 'cloudinary'


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("db connected");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());


app.use("/api/order/checkout/webhook",express.raw({type:"*/*"}));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use('/api/my/restaurant',myRestaurantRoute);
app.use('/api/restaurant',RestaurantRoute);
app.use('/api/order',orderRoute);



app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
