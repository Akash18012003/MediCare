const express = require('express')
require("dotenv").config()
const cors = require('cors')
const app = express()
const port = 5000
const mongoDB=require("./db")
mongoDB();
app.use(cors());
  // {
  //   origin:["https://deploy-mern-1whq.vercel.app"],
  //   methods:["POST","GET"],
  //   credentials:true
  // }
app.use((req,res,next)=>{
  res.setHeader("Acces-Control-Allow-Origin","http://localhost:3000");
  res.header(
    
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.get('/', (req, res) => {
    res.send('Hello World! frr')
  })

  app.use(express.json())
  app.use('/api',require("./Routes/CreatUser"));
  app.use('/api',require("./Routes/DisplayData"));
  app.use('/api',require("./Routes/OrderData"));
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })