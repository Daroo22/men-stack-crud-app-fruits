
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
 
    age: { type: Number, required: true },
  
  });


export default `Customer`;
// import Fruit from '../models/fruit.js'

const index = async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
}

export {
    index
}
// Here is where we import modules
// We begin by loading Express
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import morgan from "morgan";

import Fruit from './models/fruit.js';
import * as fruitsCtrl from "./controllers/fruits.js"

const app = express();

app.use(express.urlencoded({ extended: false })) 
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 

mongoose.connect(process.env.MONGODB_URI);


app.get("/", fruitsCtrl.home)
app.get("/fruits/new", fruitsCtrl.newFruit);
app.post("/fruits", fruitsCtrl.create)
app.get("/fruits", fruitsCtrl.index);
app.get("/fruits/:fruitId", fruitsCtrl.edit)
app.delete("/fruits/:fruitId", fruitsCtrl.deleteFruit) 
app.get("/fruits/:fruitId/edit", fruitsCtrl.findFruit);
app.put("/fruits/:fruitId", fruitsCtrl.update)


mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
