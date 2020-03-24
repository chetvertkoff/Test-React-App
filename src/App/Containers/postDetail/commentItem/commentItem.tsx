import React from 'react';

const CommentItem = (props) => {
    const getCommentId = (e)=>{
        props.getCommentId(e)
    }

    return (
        <li className="comment_item">
            {
                props.getCommentId &&
                <i className="fa fa-trash-o deleteComment" onClick={getCommentId.bind(this,props.id)}></i>
            }
            <h4>{props.author}</h4>
            <p>{props.text}</p>
        </li>
    );
}

export default CommentItem
