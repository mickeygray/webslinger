const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
connectDB();
app.use(cors());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.use(express.static(__dirname + "/public"));

app.use("/api/verticals", require("./routes/verticals"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/firms", require("./routes/firms"));
app.use("/api/users", require("./routes/users"));
app.use("/api/articles", require("./routes/articles"));
app.use("/api/emails", require("./routes/emails"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/states", require("./routes/states"));
app.use("/api/quizs", require("./routes/quizs"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/images", require("./routes/images"));
app.use("/api/sites", require("./routes/sites"));

if (process.env.NODE_ENV === "production") {
 // Set static folder
 app.use(express.static("client/build"));
 app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
 );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
