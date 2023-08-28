const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require('cors');
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/tasks");
const userRoute = require("./routes/user");

const app = express();

app.use(cors());
dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DB Connection Succesfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/task", taskRoute);
app.use("/user", userRoute);



app.listen(4000, function () {
  console.log("Server is running on port 4000");
});
