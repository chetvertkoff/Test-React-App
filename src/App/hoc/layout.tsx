import React, { Component } from 'react'
import Header from './../Containers/header/header';
import Sidebar from './../Containers/sidebar/sidebar';

export default class Layout extends Component {


    render() {
        return (
            <React.Fragment>
                {Header}
                <Sidebar />
                <main className="app-content" >
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
