import React, { Component } from 'react'
import { IProps, IState } from './../../types/index.d';
import PostItem from './postItem/postItem';


export default class Main extends Component<IProps,IState>{
    constructor(props){
        super(props)
        this.handleScroll = this.handleScroll.bind(this);
    }

    state={
        data: null,
        dataLen: null
    }

    shouldComponentUpdate(prevProps, prevState){
        if(this.state.dataLen != prevState.data.length){
            return true
        }
        return false
    }
        

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        const firstData=[
                {
                id: 0,
                title: "eum et est occaecati",
                body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
                preview:"ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis",
                comments:[
                    {
                        id:0,
                        author: 'kirill',
                        text: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis"
                    }
                ],
                commentCount: 1
              }
            ]
          
        if(!localStorage.getItem('data')){
            this.setState({
                data: firstData
            })
            setTimeout(() => {
                localStorage.setItem('data',JSON.stringify(firstData))
            }, 0);
        }else{
            this.setState({
                data: JSON.parse(localStorage.getItem('data')).slice(0,4)
            })             
        }
    }

    handleScroll() {

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        const diff = docHeight-windowBottom 

        if(diff <=120 && diff < 1){
            const newData = JSON.parse(localStorage.getItem('data')).slice(0, this.state.data.length+2)
            this.setState({
                data: newData,
                dataLen: newData.length
            })
        }
        
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        console.log(this.state);
        
        return (
            <ul onScroll={this.handleScroll}>
                {   this.state.data &&
                    this.state.data.map((item,)=>(
                        <PostItem key={item.id} {...item} />
                    ))
                }
            </ul>
        )
    }
}
