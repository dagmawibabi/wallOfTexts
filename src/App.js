import './App.css';
import { InputBox } from './components/InputBox';
import { TextCards } from './components/TextCards';
import { useEffect, useState} from 'react';

let initContent = [];
let curAPIURLBase = 'https://dagmawibabi.com'; // 'http://localhost:5000'; // "".
function App() {  
  const [content, setContent] = useState([]);
  const [numOfPosts, setNumOfPosts] = useState(0);
  const [sort, setSort] = useState("time");
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState(-1);
  const [chosenColor, setChosenColor] = useState("61b59f");

  useEffect(()=>{
    fetch(curAPIURLBase + '/wot/getNotes/' + sort + '/' + order) 
    .then((response) => response.json())
    .then((responseJSON) => {setContent(responseJSON); initContent = responseJSON; setNumOfPosts(responseJSON.length)})
    .catch((e) => console.log("error: " + e))
  }, [sort, order]); 

  function setColor(color){
    setChosenColor(color);
  }
  async function addNote(){
    let newTitle = document.getElementById("titleInputBox").value;
    let newContent = document.getElementById("contentInputBox").value;
    let newObj = {
      title: newTitle,
      content: newContent,
      color: chosenColor
    };
    document.getElementById("titleInputBox").value = "";
    document.getElementById("contentInputBox").value = "";
    initContent.push(newObj);
    //initContent.reverse();

    //copy
    //navigator.clipboard.writeText(`${newTitle} \n ${newContent}`); 

    // add to db
    await fetch(`https://dagmawibabi.com/wot/sendNote/${newTitle}/${newContent}/${chosenColor}`) 
    .then((response) => console.log(response))
    .catch((e) => console.log("error"))

    // Refresh
    // setContent([...initContent]);

    // Update
    fetch('https://dagmawibabi.com/wot/getNotes' + sort + '/' + order) //http://localhost:5000  //https://dagmawibabi.com
    .then((response) => response.json())
    .then((responseJSON) => {setContent(responseJSON); initContent = responseJSON; setNumOfPosts(responseJSON.length)})
    .catch((e) => console.log("error"))
    .finally(() => setContent([...initContent]));

    // Refresh
    // setContent([...initContent]);
  }

  async function likeNote(title, content){
    fetch(`https://dagmawibabi.com/wot/likeNote/${title}/${content}`)
    .then(()=> {
      initContent.forEach((obj)=>{
        if(obj.title === title && obj.content === content){
          obj.likes++;
        }
      })})
    .then(()=>{setContent([...initContent]);})
    .catch((e) => console.log("error"));
  }

  async function dislikeNote(title, content){
    fetch(`https://dagmawibabi.com/wot/dislikeNote/${title}/${content}`)
    .then(()=> {
      initContent.forEach((obj)=>{
        if(obj.title === title && obj.content === content){
          obj.dislikes--;
        }
      })})
    .then(()=>{setContent([...initContent]);})
    .catch((e) => console.log("error"));
  }

  return (
    <div>
      <div className="App">
        <h1 className='appName'> Words of Strangers </h1>
        <div style={{display: "flex", justifyContent: "center"}}>
          <InputBox btnFunc={addNote} color={'#' + chosenColor} numOfPosts={numOfPosts} setColorFunc={setColor}/>
        </div>
        <div className='navBar'>
            <select className='optionBtn' style={{marginRight: '10px'}} value={sort} onChange={(e)=>{setSort(e.target.value);}}>
                <option value="likes" > Likes </option>
                <option value="dislikes"> Dislikes </option>
                <option value="time"> Chronological </option>
            </select>
            <select className='optionBtn' style={{marginRight: '10px'}} value={category} onChange={(e)=>{setCategory(e.target.value);}}>
                <option value="all"> All </option>
                <option value="bots" > Bots </option>
                <option value="strangers"> Strangers </option>
            </select>
            <select className='optionBtn' value={order} onChange={(e)=>{setOrder(e.target.value);}}>
                <option value="1"> Ascending </option>
                <option value="-1"> Descending </option>
            </select>
        </div>

        <div className='gridView'>
          {
              content.length > 0 ? 
                content.map((content, index) => {
                  return(
                    category === "all" ? 
                        <TextCards key={index} likeFunc={likeNote} dislikeFunc={dislikeNote} color={'#' + content['color']} title={content['title']} content={content['content']} date={content['date']} isBot={content['isBot']} time={content['time']} likes={content['likes']} dislikes={content['dislikes']} />  
                    : (
                      category === "bots" ?
                        content["isBot"] === true ? 
                          <TextCards key={index} likeFunc={likeNote} dislikeFunc={dislikeNote} color={'#' + content['color']} title={content['title']} content={content['content']} date={content['date']} isBot={content['isBot']} time={content['time']} likes={content['likes']} dislikes={content['dislikes']} />  
                        : null
                      : category === "strangers" ? 
                          content["isBot"] !== true ? 
                            <TextCards key={index} likeFunc={likeNote} dislikeFunc={dislikeNote} color={'#' + content['color']} title={content['title']} content={content['content']} date={content['date']} isBot={content['isBot']} time={content['time']} likes={content['likes']} dislikes={content['dislikes']} />  
                          : null
                        : null
                    ) 
                  )
                })
              : <div className='loading'> Loading... </div> 
          }
        </div>
      </div>

      <p style={{padding: "30px 0px 30px 0px", color: "#61b59f", borderTop: "1px solid #61b59f", backgroundColor: "#0c1a2f", fontSize: "15px", justifyContent: "center", textAlign: "center"}}> Made with 💙 by <a href="https://t.me/dagmawi_babi" style={{color: "#61b59f"}}> DagmawiBabi </a> </p>

    </div>
  );
}

export default App;
