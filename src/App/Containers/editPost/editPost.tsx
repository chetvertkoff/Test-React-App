import React, { Component } from 'react'
import { IProps, IState } from './../../types/index.d';
import Input from './../../Components/UI/input';
import TextArea from './../../Components/UI/textarea';
import CommentItem from './../postDetail/commentItem/commentItem';

export default class EditPost extends Component<IProps, IState>{

    state={
        post: null
    }

    componentDidMount(){
        const postId:number= this.props.match.params.id
        
        if(localStorage.getItem('data')){
            var post
            const posts = JSON.parse(localStorage.getItem('data'))
            post = posts.find(item=>{
                return item.id == postId
            })
            
            this.setState({post: post})
        }
    }

    deletePost=()=>{
        console.log(JSON.parse(localStorage.getItem('data')));
        console.log();
        
        var getPosts = JSON.parse(localStorage.getItem('data'))

        var newPosts = getPosts.filter(item=>(
            item.id != this.props.match.params.id
        ))
        console.log(newPosts);
        
        localStorage.setItem('data',JSON.stringify(newPosts))

        this.props.history.push('/')            
   

    }

    updatePost=()=>{
        this.setNewPost()
        setTimeout(() => {
            const posts = JSON.parse(localStorage.getItem('data'))
            var post = posts.find(item=>{
                return item.id == this.props.match.params.id
            })
            
            this.setState({
                post: post
            })
        }, 0);
    }

    getCommentId=(e:number):void=>{
        this.deleteComment(e)

        setTimeout(() => {
            const posts = JSON.parse(localStorage.getItem('data'))
            var post = posts.find(item=>{
                return item.id == this.props.match.params.id
            })
            
            this.setState({
                post: post
            })
        }, 0);
    }


    deleteComment=(comid:number):void=>{

        var getPosts = JSON.parse(localStorage.getItem('data'))
        console.log(JSON.parse(localStorage.getItem('data')));
        var getPost = getPosts.find(item=>{
            return item.id == this.props.match.params.id
        })
        var getComments = getPost.comments   
        var newComments = getComments.filter(item=>(
            item.id != comid
        ))

        getPost.comments = newComments
        getPost.commentCount = newComments.length

        var newPosts = new Array

        getPosts.forEach(item => {
            if(item.id == this.props.match.params.id){
                newPosts.push(getPost)
            }else{
                newPosts.push(item)
            }
        });

        localStorage.setItem('data',JSON.stringify(newPosts))  
        console.log(newPosts);
    }

    setNewPost = ()=>{
        var getPosts = JSON.parse(localStorage.getItem('data'))
        var getPost = getPosts.filter(item=>(
            item.id != this.props.match.params.id
        ))
        const newPreview = this.state.post.body.slice(0,70).trim()

        getPost = this.state.post
        getPost.preview = newPreview
        getPost.body = getPost.body.trim()

        var newPosts = new Array

        getPosts.forEach(item => {
            if(item.id == this.props.match.params.id){
                newPosts.push(getPost)
            }else{
                newPosts.push(item)
            }
        });

        localStorage.setItem('data',JSON.stringify(newPosts))  
        console.log(newPosts);
        
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
        var post
        if(this.state){
            post = this.state.post
        }
        return (
            post &&
            <div className="post edit">
                <Input 
                    classes={["titleEdit"]}  
                    label={"Заголовок"}
                    value={post.title}
                    getValue={this.getTitle}
                />
                <br/>
                <TextArea 
                    classes={["bodyEdit"]} 
                    label={"Описание"} 
                    value={post.body}
                    getValue={this.getBody}
                />
                <div className="buttonGroup">
                    <button onClick={this.updatePost}>
                        Обновить
                    </button>
                    <button className="dangerButton" onClick={this.deletePost}>
                        Удалить
                    </button>
                </div>
                {
                    post.comments ?
                    <ul className="comments">
                        {
                        post.comments.map(item=>{
                            return <CommentItem 
                                        key={item.id} 
                                          
                                        {...item}
                                        getCommentId={this.getCommentId}
                                    />
                        })
                        }
                    </ul>
                    : null
                }
            </div>

        )
    }
}
