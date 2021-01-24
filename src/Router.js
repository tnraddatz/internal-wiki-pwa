
import React from 'react'
import {
    withRouter,
    Switch,
    Route,
    Redirect,
    BrowserRouter
} from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { Home, Profile, PostArticle } from './pages';
import { SignIn, SignUp } from './auth';

class PrivateRoute extends React.Component {
    state = {
        loaded: false,
        isAuthenticated: false
    }
    componentDidMount() {
        this.authenticate()
        this.unlisten = this.props.history.listen(() => {
            Auth.currentAuthenticatedUser()
                .then(user => console.log('user: ', user))
                .catch(() => {
                    if (this.state.isAuthenticated) this.setState({ isAuthenticated: false })
                })
        });
    }
    componentWillUnmount() {
        this.unlisten()
    }
    authenticate() {
        Auth.currentAuthenticatedUser()
            .then(() => {
                this.setState({ loaded: true, isAuthenticated: true })
            })
            .catch(() => this.props.history.push('/signin'))
    }
    render() {
        const { component: Component, ...rest } = this.props
        const { loaded, isAuthenticated } = this.state
        if (!loaded) return null
        return (
            <Route
                {...rest}
                render={props => {
                    return isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/signin",
                                }}
                            />
                        )
                }}
            />
        )
    }
}

PrivateRoute = withRouter(PrivateRoute)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/register" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/post-article" component={PostArticle} />
            <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    </BrowserRouter>
)

export default Routes