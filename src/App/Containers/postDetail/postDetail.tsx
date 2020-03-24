import React, { Component } from 'react'
import CommentForm from './commentForm/commentForm';
import { IProps, IState } from './../../types/index.d';
import CommentItem from './commentItem/commentItem';
import { NavLink } from 'react-router-dom';

export default class PostDetail extends Component<IProps,IState>{
    constructor(props){
        super(props)

        this.getCommentAuthor = this.getCommentAuthor.bind(this)
        this.getCommentText = this.getCommentText.bind(this)
    }
    state={
        post:null,
        commentAuthor: '',
        commentText: '',
        isInvalid: false
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

    getCommentAuthor=(e)=>{
        this.setState({
            commentAuthor: e
        })
        
    }

    getCommentText=(e)=>{
        this.setState({
            commentText: e
        })
    }

    setNewComment=()=>{
        var getPosts = JSON.parse(localStorage.getItem('data'))
        
        var getPost = getPosts.find(item=>{
            return item.id == this.props.match.params.id
        })
        var getComments = getPost.comments    
        var getMaxid=0
        if(getComments){
            getComments.forEach(item => {
                if(item.id > getMaxid){
                    getMaxid = item.id 
                }
            });

            getMaxid+=1
        }
        const newComment={
            id: getMaxid,
            author: this.state.commentAuthor,
            text: this.state.commentText
        }

        if(getComments){
            getComments.push(newComment)
            getPost.comments  = getComments
            getPost.commentCount = getComments.length
        }else{
            getPost.comments =[newComment]
            getPost.commentCount = 1
        }

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

    putComment = ()=>{
        if(
            !this.state.commentAuthor ||  
            this.state.commentAuthor== '' ||
            !this.state.commentText ||  
            this.state.commentText== ''
        ){
            this.setState({
                isInvalid: true
            })
            return false
        }

            this.setNewComment()   

            var getPosts = JSON.parse(localStorage.getItem('data'))
            var getPost = getPosts.find(item=>{
                return item.id == this.props.match.params.id
            })

            this.setState({
                isInvalid: false,
                commentAuthor: '',
                commentText: '',
                post: getPost
            })
    }

    render() {        
        var post
        if(this.state){
            post = this.state.post
        }

        return (
            post &&
            <div className="post">
                <h1>{post.title}</h1>
                <NavLink to={`/edit/${this.props.match.params.id}`} className='edit'>
                    Редактировать запись
                </NavLink>
                <br/>
                <div className="body_detail">
                    <p>{post.body}</p>
                </div>
                {
                    post.comments && post.comments.length > 0 ?
                    <CommentForm 
                        isComment={true} 
                        getCommentAuthor={this.getCommentAuthor}
                        getCommentText={this.getCommentText}
                        putComment={this.putComment}
                        isInvalid={this.state.isInvalid}
                        authorName={this.state.commentAuthor}
                        text={this.state.commentText}
                    />
                    :
                    <CommentForm 
                        isComment={false}
                        getCommentAuthor={this.getCommentAuthor}
                        getCommentText={this.getCommentText} 
                        putComment={this.putComment}
                        isInvalid={this.state.isInvalid}
                        authorName={this.state.commentAuthor}
                        text={this.state.commentText}
                    />
                }
                {
                    post.comments ?
                    <ul className="comments">
                        {
                        post.comments.map(item=>{
                            return <CommentItem key={item.id}  {...item}/>
                        })
                        }
                    </ul>
                    : null
                }
            </div>
        )
    }
}
