let mongoose = require('mongoose');
let express = require('express');
let app = new express();
let cors = require('cors');

//? Middleware
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
    time: String,
    likes: Number,
    dislikes: Number,
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
app.get("/wot/", async (req, res, next) => {
    res.send("Welcome to Wall of Texts API");
});
// Get Noteson
app.get("/wot/getNotes/:sortParam/:sort", async (req, res) => {
    let sortParam = req.params.sortParam;
    let sort = req.params.sort;
    let notes = [];
    if(sortParam === "time"){
        notes = await noteModel.find();
        notes = (sort == -1 ? notes.reverse() : notes);
    }
    if(sortParam === "likes"){
        notes = await noteModel.find().sort({likes: sort});
    }
    if(sortParam === "dislikes"){
        sort = (sort == -1 ? 1 : -1);
        notes = await noteModel.find().sort({dislikes: sort});
    }
    res.send(notes);
});

// Send Notes
app.get("/wot/sendNote/:title/:content", async (req, res) => {
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
                likes: 0,
                dislikes: 0
            });
            res.status(200).send("done");
        };
    }
});

// Like Note
app.get("/wot/likeNote/:title/:content", async (req, res) => {
    let result = await noteModel.updateOne({title: req.params.title, content: req.params.content}, {$inc: {likes: 1}});
    res.status(200).send("done");
});

// Dislike Note
app.get("/wot/dislikeNote/:title/:content", async (req, res) => {
    let result = await noteModel.updateOne({title: req.params.title, content: req.params.content}, {$inc: {dislikes: -1}});
    res.status(200).send("done");
});

// Debugging
async function cleanBotMessage() {
    // remove note from db
    let result = await noteModel.deleteMany({title: "point maker!!!"});
    console.log(result.length);
}

async function addNewField(){
    let result = await noteModel.updateMany({}, {$set: {dislikes: 0}});
    console.log(result);
}

connectToDB();

//addNewField();
//cleanBotMessage();



