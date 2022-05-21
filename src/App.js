import './App.css';
import { InputBox } from './components/InputBox';
import { TextCards } from './components/TextCards';
import { useEffect, useState} from 'react';

let initContent = [];

function App() {  
  const [content, setContent] = useState([]);

  useEffect(()=>{
    fetch('https://dagmawibabi.com/wot/getNotes') //http://localhost:5000 
    .then((response) => response.json())
    .then((responseJSON) => {setContent(responseJSON); initContent = responseJSON;})
    .catch((e) => console.log("error"))
  }, []); 

  async function addNote(){
    let newTitle = document.getElementById("titleInputBox").value;
    let newContent = document.getElementById("contentInputBox").value;
    let newObj = {
      title: newTitle,
      content: newContent,
    };
    initContent.push(newObj);

    // add to db
    fetch(`https://dagmawibabi.com/wot/sendNote/${newTitle}/${newContent}`) 
    .then((response) => console.log(response))
    .catch((e) => console.log("error"))

    // Refresh
    setContent([...initContent]);
  }

  useEffect(() => {
    console.log(content);
  }, [content]);


  return (
    <div className="App">
      <h1 style={{padding: "60px 0px 30px 0px", fontSize: "40px"}}> Words of Strangers </h1>
      <div style={{display: "flex", justifyContent: "center"}}>
        <InputBox btnFunc={addNote} />
      </div>

      <div className='gridView'>
        {
          content.length > 0 ? content.map((content, index) => {return <TextCards key={index} title={content['title']} content={content['content']} />}) : null
        }
      </div>

    </div>
  );
}

export default App;
