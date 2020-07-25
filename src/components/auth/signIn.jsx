import React, {Component} from 'react'
import { connect } from 'react-redux'
import {signIn} from '../../actions/authActions'
import {Redirect} from 'react-router-dom'
import {Row, Col, Button, Alert, Container} from 'reactstrap'
import './auth.css';

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

    render() {
        const { auth } = this.props;

        if(auth) return <Redirect to='/home' />

        return(
            <div>
                <Container>
                    <p className="auth-para">Welcome back! Please login to your account</p>
                        {/* <form className = "auth-form"> */}
                        <Row>
                            <Col xs={2}>
                                <label htmlFor = "username">Username</label> {' '}
                            </Col>
                            <Col xs={5}>
                                <input id = "username" type = "text" onChange = {this.handleInputChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <label htmlFor = "password">Password</label> {' '}
                            </Col>
                            <Col xs={5}>
                                <input id = "password" type = "password" onChange = {this.handleInputChange} />
                            </Col>
                        </Row>
                            <Row style={{textAlign: 'right'}}>
                                <Col xs={6}>
                                    <Button onClick={this.handleSignIn} variant="contained">Login</Button>
                                </Col>
                            </Row>
                        {/* </form> */}
                    </Container>
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