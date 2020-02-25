const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// BRING ROUTES
const postRoutes = require("./routes/post");
const tagRoutes = require("./routes/tag");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");
const formRoutes = require("./routes/form");
const homeRoutes = require("./routes/home");

const app = express();

// DATABASE
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database Connected"));

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// ROUTES MIDDLEWARE
app.use("/api", postRoutes);
app.use("/api", tagRoutes);
app.use("/api", categoryRoutes);
app.use("/api", authRoutes);
app.use("/api", formRoutes);
app.use("/api", homeRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
