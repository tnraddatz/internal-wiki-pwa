import React from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import "./style.css";

/**
 * Sign-in Page
 */
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            code: '',
            userObject: null
        };
    }

    async onSubmitForm(e) {
        e.preventDefault();
        console.log("here")
        try {
            const userObject = await Auth.signIn(
                this.state.email.replace(/[@.]/g, '|'),
                this.state.password
            );
            console.log('userObject', userObject);
            const session = await Auth.currentSession();
            console.log('Cognito User Identity Token:', session.getIdToken().getJwtToken());
            this.setState({ email: '', password: '', code: '' });
            this.props.history.replace('/profile');
        } catch (err) {
            alert(err.message);
            console.error('Auth.signIn(): ', err);
        }
    }

    onEmailChanged(e) {
        this.setState({ email: e.target.value.toLowerCase() });
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    onCodeChanged(e) {
        this.setState({ code: e.target.value });
    }

    isValidEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    renderSignIn() {
        const isValidEmail = this.isValidEmail(this.state.email);
        const isValidPassword = this.state.password.length > 1;

        return (
            <div className="Standard">
                <Form onSubmit={(e) => this.onSubmitForm(e)}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={(e) => this.onEmailChanged(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.onPasswordChanged(e)}
                            required
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        );
    }

    render() {
        return this.renderSignIn();
    }
}

export default withRouter(SignIn);