require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { isAuth } = require("./services/common");
const fetchuser = require("./Functions/CheckUserToken");

// JWT options

server.use(cors());
server.use(express.static("public"));

server.use(express.json()); // to parse req.body
server.use("/products", productsRouter.router);
// we can also use JWT token for client-only auth
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", fetchuser, usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", fetchuser, cartRouter.router);
server.use("/orders", fetchuser, ordersRouter.router);

// Passport Strategies

// this creates session variable req.user on being called from callbacks

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("database connected");
}
main();
server.listen(process.env.PORT, () => {
  console.log("server started");
});
