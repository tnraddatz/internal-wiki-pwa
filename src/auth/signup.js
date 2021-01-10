import React from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

/**
 * Registration Page
 */
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            email: '',
            password: '',
            confirm: '',
            code: ''
        };
    }

    async onSubmitForm(e) {
        e.preventDefault();
        try {
            const params = {
                username: this.state.email.replace(/[@.]/g, '|'),
                password: this.state.password,
                attributes: {
                    email: this.state.email
                },
                validationData: []
            };
            const data = await Auth.signUp(params);
            console.log(data);
            this.setState({ stage: 1 });
        } catch (err) {
            if (err === "No userPool") {
                // User pool not defined in Amplify config file
                console.error("User Pool not defined");
                alert("User Pool not defined. Amplify config must be updated with user pool config");
            } else if (err.message === "User already exists") {
                // Setting state to allow user to proceed to enter verification code
                this.setState({ stage: 1 });
            } else {
                alert(err.message);
                console.error("Exception from Auth.signUp: ", err);
                this.setState({ stage: 0, email: '', password: '', confirm: '' });
            }
        }
    }

    async onSubmitVerification(e) {
        e.preventDefault();
        try {
            const data = await Auth.confirmSignUp(
                this.state.email.replace(/[@.]/g, '|'),
                this.state.code
            );
            console.log(data);
            // Go to the sign in page
            this.props.history.replace('/signin');
        } catch (err) {
            alert(err.message);
            console.error("Exception from Auth.confirmSignUp: ", err);
        }
    }

    onEmailChanged(e) {
        this.setState({ email: e.target.value.toLowerCase() });
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    onConfirmationChanged(e) {
        this.setState({ confirm: e.target.value });
    }

    onCodeChanged(e) {
        this.setState({ code: e.target.value });
    }

    isValidEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    renderSignUp() {
        const isValidEmail = this.isValidEmail(this.state.email);
        const isValidPassword = this.state.password.length > 1;
        const isValidConfirmation = isValidPassword && this.state.password === this.state.confirm;

        return (
            <div className="app">
                {/* <section className="form-wrap">
                    <h1>Register</h1>
                    <form id="registrationForm" onSubmit={(e) => this.onSubmitForm(e)}>
                        <input className={isValidEmail ? 'valid' : 'invalid'} type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.onEmailChanged(e)} />
                        <input className={isValidPassword ? 'valid' : 'invalid'} type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.onPasswordChanged(e)} />
                        <input className={isValidConfirmation ? 'valid' : 'invalid'} type="password" placeholder="Confirm Password" value={this.state.confirm} onChange={(e) => this.onConfirmationChanged(e)} />
                        <input disabled={!(isValidEmail && isValidPassword && isValidConfirmation)} type="submit" value="Submit" />
                    </form>
                </section> */}

                <Form onSubmit={(e) => this.onSubmitForm(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(e) => this.onEmailChanged(e)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.onPasswordChanged(e)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={this.state.confirm} onChange={(e) => this.onConfirmationChanged(e)} required />
                    </Form.Group>

                    <Button disabled={!(isValidEmail && isValidPassword && isValidConfirmation)} variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </div>
        );
    }

    renderConfirm() {
        const isValidEmail = this.isValidEmail(this.state.email);
        const isValidCode = this.state.code.length === 6;

        return (
            <div className="app">
                {/* <section className="form-wrap">
                    <h1>Verify Email</h1>
                    <form id="verifyForm" onSubmit={(e) => this.onSubmitVerification(e)}>
                        <input className={isValidEmail ? 'valid' : 'invalid'} type="email" placeholder="Email" value={this.state.email} />
                        <input className={isValidCode ? 'valid' : 'invalid'} type="text" placeholder="Verification Code" value={this.state.code} onChange={(e) => this.onCodeChanged(e)} />
                        <input disabled={!(isValidCode && isValidEmail)} type="submit" value="Verify" />
                    </form>
                </section> */}
                <Form onSubmit={(e) => this.onSubmitVerification(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} disabled />
                    </Form.Group>

                    <Form.Group controlId="ValidateCode">
                        <Form.Label>Verification Code</Form.Label>
                        <Form.Control type="text" placeholder="Password" value={this.state.code} onChange={(e) => this.onCodeChanged(e)} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </div>
        );
    }

    render() {
        switch (this.state.stage) {
            case 0:
            default:
                return this.renderSignUp();
            case 1:
                return this.renderConfirm();
        }
    }
}

export default withRouter(SignUp);