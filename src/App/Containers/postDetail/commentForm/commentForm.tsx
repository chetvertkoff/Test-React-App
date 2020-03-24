import React from 'react';
import { IProps } from './../../../types/index.d';

const CommentForm = (props:IProps) => {

    const getName =(e)=>{
        props.getCommentAuthor(e.target.value)
    }

    const getText = (e)=>{
        props.getCommentText(e.target.value)
    }

    const sendData =()=>{
        props.putComment()
    }
    
    return (
        <div className="comment_form">
            <h2>
                {
                    props.isComment ? 'Оставить комментарий'
                    : 
                    'К данной записи пока нет комментариев, Вы можете стать первым :)'
                }
            </h2>
            <div className="input">
                <label htmlFor="">Ваше имя</label>
                <input type="text" onChange={getName} value={props.authorName} placeholder="Имя"/>
            </div>
            <br/>
            <textarea placeholder="Введите текст..." onChange={getText} value={props.text}>
    
            </textarea>
            {
                props.isInvalid &&
                <p style={{marginBottom:0}} className="danger">Пожалуйста, заполните пустые поля</p>
            }
            <br/>
            <button onClick={sendData}>Отправить</button>
        </div>
    );
}

export default CommentForm;
