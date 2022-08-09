require("dotenv").config();
const http = require("http");
const fileUpload = require("express-fileupload");
// const cookieParser = require("cookie-parser");
const Sequelize = require("sequelize");
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4010;
const app = express();

// Initialize sequelize and connect to the db
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);

// let server;
// const initializeBackendServer = async () => {
//   try {
//     await sequelize.authenticate();
//     // Only start server after the db connect was verified
//     console.log("API::Database connection has been established successfully.");
//     app.listen(PORT || 4010);
//     console.log("API::Twaa API Engine started on: " + PORT);
//     server = http.createServer(app);
//     const { START_SOCKETS_SERVER } = require("./sockets");
//     START_SOCKETS_SERVER(app, server); //share the same app & server instance for the socket's passport instance
//   } catch (error) {
//     console.error("API::Unable to connect to the database:", error);
//   }
// };
// initializeBackendServer();

app.use(express.json());

// app.use(passport.initialize());

// passportInit();

// app.use(cookieParser());

app.use(cors());
app.use(
  fileUpload({
    safeFileNames: true,
    // preserveExtension: true,
    // tempFileDir: `${__dirname}/public/files/temp`
  })
);

// Register middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //or specific separated by commas
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, POST, GET, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

// Register routes
