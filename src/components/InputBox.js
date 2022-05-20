import './InputBox.css';
import './SendBtn.css';


export const InputBox = (props) => {
    return (
        <div className='container'>
            <input className='titleInputBox' id='titleInputBox' type='text' placeholder='Title of your note'></input>
            <br/>
            <textarea className='contentInputBox' id='contentInputBox' placeholder='What do you want to say?'></textarea>
            <br/>

            <div style={{display: 'flex', justifyContent: 'right'}}>
                <button className='btn' onClick={props.btnFunc}> Post Note </button>
            </div>
        </div>
    );
}