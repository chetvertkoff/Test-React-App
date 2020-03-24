import React from 'react';

const Input = (props) => {
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
                <input value={props.value} onChange={getValue} />
                :
                <input onChange={getValue} />
            }
        </div>
    );
}

export default Input;
