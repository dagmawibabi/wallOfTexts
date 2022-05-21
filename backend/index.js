let mongoose = require('mongoose');
let express = require('express');
let app = new express();
let cors = require('cors');

//? Middleware
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
    date: String,
    time: String
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
// Get Noteson
app.get("/wot/getNotes", async (req, res) => {
    let notes = await noteModel.find().sort({date: -1, time: -1});
    res.send(notes);

});

// Send Notes
app.get("/wot/sendNote/:title/:content", async (req, res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);    
    let response = await noteModel.create({
        title: req.params.title,
        content: req.params.content,
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
    });
    res.status(200).send("done");
});

  
connectToDB();


