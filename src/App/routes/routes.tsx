import React from 'react'
import {Route, Switch} from 'react-router-dom'

//components
import Main from './../Containers/Main/main'
import PostDetail from '../Containers/postDetail/postDetail';
import EditPost from './../Containers/editPost/editPost';
import CreatePost from './../Containers/createPost/createPost';

const routes = (
    <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/post/:id/' component={PostDetail} />
        <Route path='/edit/:id/' component={EditPost} />
        <Route path='/create' component={CreatePost} />
    </Switch>
)

export default routes;
