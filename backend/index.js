let mongoose = require('mongoose');
let express = require('express');
let app = new express();
let cors = require('cors');

var corsOptions = {
    origin: '*',    
    crossDomain: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());

//? Server
let portNum = process.env.PORT || 5000;
app.listen(portNum, () => {
    console.log(`Server is running on port ${portNum}`);
});


//? Database
// Schema
let noteSchema = new mongoose.Schema({
    title: String,
    content: String,
});

// Model
let noteModel = new mongoose.model('note', noteSchema);

// Connect to DB
async function connectToDB() {
    console.log("Connecting...");
    let mongoAtlastUrl = "mongodb+srv://NewSocialAPI:NewSocialAPI1234@cluster0.fivp4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    await mongoose.connect(mongoAtlastUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("MDBA Connected!") ).catch(err => console.log("ERROR"));
    console.log("connected!");
}      


//? Routes
// Intro
app.get("/wot/", async (req, res, next) => {
    res.send("Welcome to Wall of Texts API");
});
// Get Notes
app.get("/wot/getNotes", async (req, res) => {
    let notes = await noteModel.find({});
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(notes);

});

// Send Notes
app.get("/wot/sendNote/:title/:content", async (req, res) => {
    let response = await noteModel.create({
        title: req.params.title,
        content: req.params.content
    });
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200).send("done");
});

  
connectToDB();


