// Here is where we import modules
// We begin by loading Express
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Fruit from './models/fruit.js'; 
dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODB_URI)

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });;
  });

  app.get("/fruits/new", async (req, res) => {
    res.render("fruits/new.ejs");
  });

  app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
  });

  app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });


  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    app.listen(3000, () => { 
        console.log("Listening on port 3000");
      });
  });
  
  
