import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Layout from './hoc/layout';
import routes from './routes/routes';

class App  extends Component{
    render() {
        return (
            <Layout>
                {routes}
            </Layout>
        )
    }
}

export default withRouter(App)