import './InputBox.css';
import './SendBtn.css';


export const InputBox = (props) => {
    function setColor(e, color){
        // console.log(color);
        props.setColorFunc(color);
    }
    let colorList = [
        "ffffff",
        "2BAE66FF",
        "EDFF00FF",
        "00A4CCFF",
        "FFA177FF",
        "A2A2A1FF",
        "F9A12EFF",
        "FE4773",
        "933DC9",
        "61b59f",
        "F63CCA",
        "00ED00",
        "EC2A1C",
        "FF7C00",
    ];
    return (
        <div className='container'>
            <input style={{borderColor: `${props.color}`}} className='titleInputBox' id='titleInputBox' type='text' placeholder='Title of your note' maxLength={100}></input>
            <br/>
            <textarea style={{borderColor: `${props.color}`}} className='contentInputBox' id='contentInputBox' placeholder={'What do you want to say?'} maxLength={400}></textarea>
            <br/>

            <div className='colorContainer' >
                {
                    colorList.map((color, index) => {
                        return (
                            <div className='colorCircles' key={index} onClick={(e) => setColor(e, color)} style={{backgroundColor: `#${color}`}}></div>
                        );
                    })
                }                
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button className='postCount' style={{marginRight: "0px"}} > {props.numOfPosts + " notes so far"} </button>
                <button className='btn' onClick={props.btnFunc}> Post Note </button>
            </div>
        </div>
    );
}