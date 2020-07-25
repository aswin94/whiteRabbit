import React, {Component} from 'react'
import { connect } from 'react-redux'
import {signIn} from '../../actions/authActions'
import {Redirect} from 'react-router-dom'
import {Row, Col, Button, Alert} from 'reactstrap'

class SignIn extends Component
{
    state = {
        username : '',
        password : '',
        checked : false
    }

    handleSignIn = (event) => {
        event.preventDefault();
        this.props.signIn(this.state)
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    // updateCheck = () => {
    //     this.setState((oldState) => {
    //       return {
    //         checked: !oldState.checked,
    //       };
    //     });
    //   }


    render() {
        const { authError, auth } = this.props;

        if(auth) return <Redirect to='/' />

        return(
            <div>
                <div className="container">
                    <p className="auth-para">Welcome back! Please login to your account</p>
                        <form className = "auth-form">
                            <div className = "input-field">
                                <label htmlFor = "email">Email</label>
                                <input id = "email" type = "email" onChange = {this.handleInputChange} />
                            </div>
                            <div className = "input-field">
                                <label htmlFor = "password">Password</label>
                                <input id = "password" type = "password" onChange = {this.handleInputChange} />
                            </div>
                            <Row>
                                <Col xs={6}>
                                    <Button onClick={this.handleSignIn} variant="contained">Login</Button>
                                </Col>
                            </Row>
                                { authError === 'Login Failed' ? 
                                    <Alert
                                        message="Error"
                                        description={authError}
                                        type="error"
                                        showIcon
                                        closable
                                    /> : null }
                        </form>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authErrorLogin,
        auth: state.auth.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn : (creds) => dispatch(signIn(creds)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(SignIn)