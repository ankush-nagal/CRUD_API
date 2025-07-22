const express = require("express");

const app = express();
const PORT = 5000;
const { connectMongoDb } = require("./connection")
const userRouter = require("./routes/user")
const { logReqRes } = require("./middlewares/user")



//connection
connectMongoDb("mongodb://127.0.0.1:27017/app2")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("mongodb error", err))

//middlewares
app.use(express.json())
app.use(logReqRes("log.txt"))


//Routes
app.use("/user", userRouter);


app.listen(PORT, () => {
    console.log(`server chal pda h ${PORT} par`)
})
