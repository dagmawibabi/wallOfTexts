import './TextCards.css';
import Popup from 'reactjs-popup';

export const TextCards = (props) => {
    function like(){
        props.likeFunc(props.title, props.content);
    }
    function dislike(){
        props.dislikeFunc(props.title, props.content);
    }

    return (
        <Popup trigger={
            <div className="card">
                <div className='votesDiv'>
                    <h4 className='title'> {props.title}</h4> 
                    <div style={{display: "float", justifyContent: "space-between"}}>
                        <button className='votes' style={{marginRight: "2px", marginBottom: "2px"}} onClick={like}> {props.likes + " 👍" } </button>
                        <button className='votes' onClick={dislike}> {props.dislikes + " 👎" } </button>
                    </div>
                </div>
                <p className='content'> {props.content}</p>
            </div> 
        } position="top center">
            <div className='clipboard'> {props.time + " - " + props.date} </div>
        </Popup>
    );
}