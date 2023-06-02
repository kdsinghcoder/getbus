import dotenv from "dotenv"
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser"

//Routes
import authRoutes from "./routes/auth.js"
import busRoutes from "./routes/bus.js"
import adminRoutes from "./routes/admin.js"
import paymentRoutes from "./routes/payment.js"

//middlewaer setup
const app = express();
dotenv.config({ path: './config.env' });
app.use(bodyParser.json({ limit: '30mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))
app.use(cors());
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send("welcome to the portal")
})


app.use(authRoutes)
app.use('/bus',busRoutes );
app.use('/admin',adminRoutes);
app.use('/payment',paymentRoutes);




const PORT = process.env.PORT || 5000;
const CONNECT_URL = process.env.CONNECT_URL;
//Database connect
mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECT_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => app.listen(PORT, () => console.log("server is running on port :" + PORT)))
  .catch((err) => {
    console.log(err);
  });


