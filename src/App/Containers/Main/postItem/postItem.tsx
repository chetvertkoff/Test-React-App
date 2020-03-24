import React from 'react';
import { NavLink } from 'react-router-dom';

const PostItem = (props) => {
    
    return (
        <li key={props.id} className="post_item">
            <h2 className="title">
                <NavLink to={`/post/${props.id}`}>
                    {props.title}
                </NavLink>
            </h2>
            <p className="body">{props.preview+'...'}</p>
            <div>
                <p className="comment_count">Кол-во комментарий: {props.commentCount ? props.commentCount : 0}</p>
                <NavLink to={`/post/${props.id}`} className="go_full">
                    Перейти
                </NavLink>
            </div>
        </li>
    );
}

export default PostItem
