// Step 1
import express from "express";
import "dotenv/config";
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Step 2
import connectDB from "./config/mongodb.js";
import teammemberRouter from "./routes/teammemberRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

//swager
const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "One-on-One Meeting API",
        version: "1.0.0",
        description: "API documentation for managing team members and meetings",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
    apis: ["./routes/teammemberRoutes.js","server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
connectDB()

app.use('/api/team-members',teammemberRouter);


/**
 * @swagger
 * /:
 *   get:
 *     summary: "API Health Check"
 *     description: "Returns a simple message to indicate the API is working"
 *     responses:
 *       200:
 *         description: "API is working"
 */
app.get("/", (req, res) => {
    res.send("API Working");
  });
  
  
app.listen(port, () => {
    console.log(`Server started on PORT : ${port} 🌐`);
    console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
  