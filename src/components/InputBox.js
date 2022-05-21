import './InputBox.css';
import './SendBtn.css';


export const InputBox = (props) => {
    return (
        <div className='container'>
            <input className='titleInputBox' id='titleInputBox' type='text' placeholder='Title of your note'></input>
            <br/>
            <textarea className='contentInputBox' id='contentInputBox' placeholder='What do you want to say?' maxLength={300}></textarea>
            <br/>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button className='postCount' style={{marginRight: "10px"}} > {props.numOfPosts + " notes so far"} </button>
                <button className='btn' onClick={props.btnFunc}> Post Note </button>
            </div>
        </div>
    );
}