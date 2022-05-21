import './TextCards.css';
import Popup from 'reactjs-popup';

export const TextCards = (props) => {
    function ctcb(){
        console.log(this);
        navigator.clipboard.writeText(props.title + "\n" + props.content);
    }
    return (
        <Popup trigger={
            <div className="card" onClick={ctcb()} >
                <h4 className='title'> {props.title}</h4> 
                <p className='content'> {props.content}</p>
            </div>
        } position="top center">
            <div className='clipboard'> {props.time + " - " + props.date} </div>
        </Popup>
    );
}