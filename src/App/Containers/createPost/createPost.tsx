import React, { Component } from 'react'
import Input from './../../Components/UI/input';
import TextArea from './../../Components/UI/textarea';

export default class CreatePost extends Component {
    state = {
        post: {
            title: null,
            body:null
        }
    }

    setNewPost = ():void=>{
        var getPost
        var getPosts = JSON.parse(localStorage.getItem('data'))
        const newPreview = this.state.post.body.slice(0,70).trim()
        var getMaxid=0
        if (getPosts.length > 0) {
            getPosts.forEach(item => {
                if(item.id > getMaxid){
                    getMaxid = item.id 
                }
            })
            getMaxid++
            
        }

        getPost = this.state.post
        getPost.id = getMaxid
        getPost.preview = newPreview
        getPost.body = getPost.body.trim()
        if (getPost) {
            getPosts.push(getPost)   
            localStorage.setItem('data',JSON.stringify(getPosts))  
        }
        setTimeout(() => {
            this.props.history.push('/')            
        }, 0);

    }

    getTitle=(e:string):void=>{
        this.setState({
            post:{
                ...this.state.post,
                title: e
            }
        })   
    }

    getBody=(e:string):void=>{
        this.setState({
            post:{
                ...this.state.post,
                body: e
            }
        })
        
    }

    render() {
        return (
            <div className="post create">
                <Input 
                    classes={['titleEdit']}
                    label={'Заголовок'}
                    getValue={this.getTitle}
                />
                <br/>
                <TextArea
                    classes={["bodyEdit"]}
                    label={'Описание'}
                    getValue={this.getBody}
                />
                <button onClick={this.setNewPost}>
                    Создать
                </button>
            </div>
        )
    }
}
