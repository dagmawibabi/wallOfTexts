import './SendBtn.css';

export const SendBtn = (props) => {
    return (
        <div>
            <button className='btn' onClick={props.btnFunc}> Post Note </button>
        </div>
    );
}