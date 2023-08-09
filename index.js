const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");

app.use(express.urlencoded());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const Task = require("./models/task");
const User = require("./models/user");

app.use(express.static("assets"))

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// app.use(session({
//     name: "codial",
//     secret: "Manbha151",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

//use express router
app.use('/', require("./routes"));



app.listen(port, function (err) {
    if (err) {
        console.log(`Error : ${err}`);
    }
    console.log(`Server running successfully in port : ${port}`)
})