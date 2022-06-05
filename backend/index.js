let mongoose = require('mongoose');
let express = require('express');
let app = new express();
let cors = require('cors');
let axios = require('axios');

//? Middleware
app.use(cors());

//? Server
let portNum = process.env.PORT || 5000;
let mongoAtlastUrl = process.env.DBURL || "mongodb+srv://Stranger:Stranger7@cluster0.fivp4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
    color: String,
    isBot: Boolean
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
    await populate();
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
app.get("/wot/sendNote/:title/:content/:color", async (req, res) => {
    await populate();
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
                dislikes: 0,
                color: req.params.color,
                isBot: false
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

// Random Number
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Feed Poplation
async function populate() {
    // https://www.reddit.com/r/confession.json
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);  

    let subredditList = ["quotes", "TraditionalCurses", "oneliners", "DirtyJokes", "cleanjokes", "dadjokes", "AskReddit", "whowouldwin", "AskWomen", "AskMen", "DecidingToBeBetter", "selfimprovement", "getdisciplined", "AskHistorians", "askscience","Anxiety", "depression", "books", "quoteporn", "whowouldwin"]; 
    subredditList = ["quotes", "TraditionalCurses", "oneliners", "DirtyJokes", "cleanjokes", "dadjokes", "whowouldwin", "DecidingToBeBetter", "selfimprovement", "getdisciplined", "Anxiety", "depression", "books", "quoteporn", "whowouldwin"]; 
    // subredditList = ["quotes", "cleanjokes", "dadjokes", "whowouldwin", "DecidingToBeBetter", "selfimprovement", "getdisciplined", "askscience", "books", "quoteporn"]; 
    let redditSortTime = ["hour", "day", "week", "month", "year", "all"];
    let redditSortType = ["hot", "new", "top", "controversial", "best", "random", "rising"];
    let colorList = ["ffffff","2BAE66FF","EDFF00FF","00A4CCFF","FFA177FF","A2A2A1FF","F9A12EFF","FE4773","933DC9","61b59f","F63CCA","00ED00","EC2A1C","FF7C00"];

    let randomSubreddit = getRandom(0, subredditList.length);
    let randomSortTime = getRandom(0, redditSortTime.length);
    let randomSortType = getRandom(0, redditSortType.length);
    let randomColor = getRandom(0, colorList.length);
    let redditResponse = await axios.get(`https://www.reddit.com/r/${randomSubreddit}/${randomSortType}.json?t=${randomSortTime}`);
    let randomPostNumber = getRandom(0, redditResponse["data"]["data"]["children"].length);    


    let newPostTitle = redditResponse["data"]["data"]["children"][randomPostNumber]["data"]["selftext"].toLowerCase();
    let newPostContent = redditResponse["data"]["data"]["children"][randomPostNumber]["data"]["title"].toLowerCase();
    if (newPostTitle.length < 100 && newPostContent.length < 400 && newPostTitle.indexOf("reddit") === -1 && newPostContent.indexOf("reddit") === -1) {
        let redditData = {
            title: ((newPostTitle !== "") ? newPostTitle : redditResponse["data"]["data"]["children"][randomPostNumber]["data"]["subreddit"].toLowerCase()),
            content: ((newPostContent !== "") ? newPostContent : "..."),
            date: today.toLocaleDateString(),
            time: today.toLocaleTimeString(),
            likes: redditResponse["data"]["data"]["children"][randomPostNumber]["data"]["ups"],
            dislikes: redditResponse["data"]["data"]["children"][randomPostNumber]["data"]["downs"],
            color: randomColor,
            isBot: true
        };
        let notes = await noteModel.find({title: redditData["title"], content: redditData["content"]});
        if(notes.length === 0){
            let response = await noteModel.create(redditData);
        };
    }
    return "done";
};




// Debugging
async function cleanBotMessage() {
    // remove note from db
    let result = await noteModel.deleteMany({isBot: true});
    console.log(result.length);
}

async function updateValue() {
    // remove note from db
    let result = await noteModel.updateMany({}, {color: "#61b59f"});
    console.log(result.length);
}

async function addNewField(){
    let result = await noteModel.updateMany({}, {$set: {isBot: false}});
    console.log(result);
}

connectToDB();

// updateValue();
// addNewField();
// cleanBotMessage();



