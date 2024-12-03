// Step 1
import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";

// Step 2
import connectDB from "./config/mongodb.js";
import teammemberRouter from "./routes/teammemberRoutes.js";
import meetingRouter from "./routes/meetingRoutes.js";

// App Config
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

//middleware json req
app.use(bodyParser.json());

connectDB() //connect mongodb

//routes
app.use('/member/',teammemberRouter);
app.use('/',meetingRouter);

app.get("/", (req, res) => {
    res.send("API Working");
  });
  
  
app.listen(port, () => {
    console.log(`Server started on PORT : ${port} 🌐`);
    console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
  