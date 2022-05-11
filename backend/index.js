require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const flowersRoutes = require(`./routes/flowers`);
const ordersRoutes = require(`./routes/orders`);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  next();
});

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(flowersRoutes);
app.use(ordersRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server has been started`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
