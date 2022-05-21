let mongoose = require('mongoose');
let express = require('express');
let app = new express();
let cors = require('cors');

//? Middleware poop
app.use(cors());

//? Server
let portNum = process.env.PORT || 5000;
let mongoAtlastUrl = process.env.DBURL;

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
    await mongoose.connect(mongoAtlastUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("MDBA Connected!") ).catch(err => console.log("ERROR"));
    console.log("connected!");
}      


//? Routes
// Intro
app.get("/wot/api/", async (req, res, next) => {
    res.send("Welcome to Wall of Texts API");
});
// Get Noteson
app.get("/wot/api/getNotes", async (req, res) => {
    let notes = await noteModel.find().sort({date: -1, time: -1});
    res.send(notes);
    console.log(req.socket);

});

// Send Notes
app.get("/wot/api/sendNote/:title/:content", async (req, res) => {
    let title = req.params.title.toLowerCase();
    let restrictedWords = ["bot", "hacker", "hacker!!!", "point maker!!!"];
    if (restrictedWords.indexOf(title) === -1) {
        let notes = await noteModel.find({title: req.params.title, content: req.params.content});
        if(notes.length === 0){
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);    
            let response = await noteModel.create({
                title: req.params.title,
                content: req.params.content,
                date: today.toLocaleDateString(),
                time: today.toLocaleTimeString(),
            });
            res.status(200).send("done");
        };
    }
});

async function cleanBotMessage() {
    // remove note from db
    let result = await noteModel.deleteMany({title: "point maker!!!"});
    console.log(result.length);
}

connectToDB();

//cleanBotMessage();



