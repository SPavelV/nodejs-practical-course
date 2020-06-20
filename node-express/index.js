const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const session = require("express-session");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const addRoutes = require("./routes/add");
const ordersRoutes = require("./routes/orders");
const coursesRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const varMiddleWare = require("./middleware/variables");

const app = express();

const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5edb5aee98ab364b5cc4ca98");
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "some secret value",
  resave: false,
  saveUninitialized: false
}));
app.use(varMiddleWare);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

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

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "pablo@gmail.com",
        name: "Pablo",
        cart: { items: [] },
      });

      await user.save();
    }

    app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
