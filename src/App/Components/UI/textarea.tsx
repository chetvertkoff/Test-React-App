import React from 'react';

const TextArea = (props) => {

    const getValue = (e)=>{
        props.getValue(e.target.value)
    }
    
    return (
        <div className={props.classes && props.classes.join(' ')}>
            {
                props.label &&
                <label>{props.label}</label>
            }
            {
                props.value ? 
                <textarea value={props.value} onChange={getValue} />
                :
                <textarea onChange={getValue} />
            }
        </div>
    );
}

export default TextArea;
