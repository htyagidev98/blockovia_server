const express = require('express');
mongoose = require('mongoose'),
    cors = require('cors')
bodyParser = require('body-parser')
app = express();
require('dotenv').config();

// Database connectivity

var connectDb = () => {
    return mongoose.connect(`${process.env.databaseURL}`,
        console.log("Database connected")
    )
};
connectDb();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
})
);
mongoose.Promise = global.Promise;
app.use(cors());

//API ROUTES for Homa-Page
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/home"));
app.use("/", require("./routes/feature"));
app.use("/", require("./routes/bulid"));
app.use("/", require("./routes/calculation"));
app.use("/", require("./routes/blockchain"));
app.use("/", require("./routes/animated"));
app.use("/", require("./routes/application"));
app.use("/", require("./routes/network"));
app.use("/", require("./routes/drivingtext"));
app.use("/", require("./routes/drivinganimate"));
app.use("/", require("./routes/footprint"));
app.use("/", require("./routes/community"));
app.use("/", require("./routes/animatedcard"));




app.listen(`${process.env.PORT}`, () => {

    console.log("Server Running on port", `${process.env.PORT}`)

});


