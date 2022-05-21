import './TextCards.css';
import Popup from 'reactjs-popup';

export const TextCards = (props) => {
    return (
        <Popup trigger={
            <div className="card">
                <h4 className='title'> {props.title}</h4> 
                <p className='content'> {props.content}</p>
                <button className='votes'> 2.6k </button>
            </div>
        } position="top center">
            <div className='clipboard'> {props.time + " - " + props.date} </div>
        </Popup>
    );
}