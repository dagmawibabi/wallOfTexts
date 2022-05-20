import './App.css';
import { InputBox } from './components/InputBox';
import { TextCards } from './components/TextCards';
import { useEffect, useState} from 'react';

let content0 = [
  {
    title: "Hello World",
    content: "This is a test",
  },
]

let initContent = [];

function App() {  
  const [content, setContent] = useState([]);
  
  function addNote(){
    let newTitle = document.getElementById("titleInputBox").value;
    let newContent = document.getElementById("contentInputBox").value;
    console.log(content.length);
    initContent.push(
      {
        title: newTitle,
        content: newContent,
      }
    );
    setContent(initContent);
  }


  return (
    <div className="App">
      <h1 style={{padding: "60px 0px 30px 0px", fontSize: "40px"}}> Words of Strangers </h1>
      <div style={{display: "flex", justifyContent: "center"}}>
        <InputBox btnFunc={addNote} />
      </div>

      <div className='gridView'>
        {
          content.length > 0 ? content.map((content, index) => {return <TextCards title={content['title']} content={content['content']} />}) : null
        }
      </div>

    </div>
  );
}

export default App;
