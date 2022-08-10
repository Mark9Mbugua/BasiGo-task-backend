require("dotenv").config();
const http = require("http");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const session = require("express-session");
const passportInit = require("./config/passport.init");
const cookieParser = require("cookie-parser");
const Sequelize = require("sequelize");
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4010;
// console.log(firebaseInit.messaging);
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
let server;
const initializeBackendServer = async () => {
  try {
    await sequelize.authenticate();
    // Only start server after the db connect was verified
    console.log("API::Database connection has been established successfully.");
    app.listen(PORT || 4010);
    console.log("API::Twaa API Engine started on: " + PORT);
    server = http.createServer(app);
    // const { START_SOCKETS_SERVER } = require("./sockets");
    // START_SOCKETS_SERVER(app, server); //share the same app & server instance for the socket's passport instance
  } catch (error) {
    console.error("API::Unable to connect to the database:", error);
  }
};
initializeBackendServer();

app.use(express.json());

app.use(passport.initialize());

passportInit();

app.use(cookieParser());

app.use(cors());
app.use(
  fileUpload({
    safeFileNames: true,
    // preserveExtension: true,
    // tempFileDir: `${__dirname}/public/files/temp`
  })
);
// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
// TO BE REMOVED OR MODIFIED HERE***
app.use(
  session({
    secret: "jawiz",
    resave: true,
    saveUninitialized: true,
  })
);

// Chrone Jobs
// indexingJob.executeJob(); //Bulk indexing
// dbBackupJob.executeJob();
// usernameCheckJob.executeJob();
// meetingsCredentialsJob.executeJob();

//Register Routes
const authRoutes = require("./routes/auth.routes");
authRoutes(app);

const leadRoutes = require("./routes/lead.routes");
leadRoutes(app);