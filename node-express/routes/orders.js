const { Router } = require("express");
const Order = require("../models/order");
const router = Router();

router.get("/", async (req, res) => {
  res.render("orders", {
    isOrder: true,
    title: "Заказы",
  });
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.courseId").execPopulate();

    console.log("items",  user.cart);

    const courses = user.cart.itmes.map((i) => ({
      count: i.count,
      course: { ...i.courseId._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    });

    await order.save();
    await req.user.crearCart();

    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
