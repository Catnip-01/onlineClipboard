const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const clipboardSchema = new mongoose.Schema({
  id: Number,
  content: String,
});

const clipboardModel = mongoose.model("onlineClipboard", clipboardSchema);

app.post("/add-mongo", async (req, res) => {
  const clipping = new clipboardModel(req.body);
  try {
    await clipping.save();
    res.status(201).send("data stored !");
  } catch (err) {
    res.status(400).send("someone fucked up " + err);
  }
});

app.post("/accept-req", async (req, res) => {
  const randomNumber = Math.ceil(Math.random() * 9000) + 1000;
  const clipping = new clipboardModel({
    id: randomNumber,
    content: req.body.text,
  });
  try {
    await clipping.save();
    res.status("201").send({
      message: "help",
      code: randomNumber,
    });
    // res.send(randomNumber);
    console.log("clipping sent!");
  } catch (error) {
    console.log("error while sending clipping : " + error);
  }
  console.log(req.body);
});

app.get("/get-data", async (req, res) => {
  try {
    console.log("requested id : " + JSON.stringify(req.query.id));
    const data = await clipboardModel.find({ id: req.query.id });
    res.status(200).json(data);
  } catch (err) {
    console.log("error while getting data from database : " + err);
  }
});

const port = process.env.port || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`mongodb connected and server running on port ${port}`)
    )
  )
  .catch((err) => console.log("mongodb not connected : " + err));
