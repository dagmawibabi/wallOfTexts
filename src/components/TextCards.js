import './TextCards.css';

export const TextCards = (props) => {
    return (
        <div className="card">
            <h4 className='title'> {props.title}</h4> 
            <p className='content'> {props.content}</p>
        </div>
    );
}