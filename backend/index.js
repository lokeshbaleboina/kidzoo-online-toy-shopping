const express = require('express')
require("dotenv").config();
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000

mongoose.connect("mongodb+srv://kidzoo:2508@cluster0.diurkr0.mongodb.net/kidzoodata",)
  .then(async () => {
    console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("toyscato");
    const cato = await mongoose.connection.db.collection("cato");
    const catodata = await cato.find({}).toArray()
    const toysData = await fetched_data.find({}).toArray()
    global.toyscato = toysData;
    global.cato = catodata;

  })
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept",
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())

app.use("/api", require("./routes/createUser"))

app.use("/api", require("./routes/Displaydata"))

app.use("/api", require("./routes/OrderData"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
