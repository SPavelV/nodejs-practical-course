const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");

const app = express();

const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      "mongodb+srv://pavel:qbvQUmUy0744LTaV@cluster0-ximsm.mongodb.net/shop";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    // await mongoose.connect(url, {useUnifiedTopology: true});

    app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
