import React, {Component} from 'react'
import { connect } from 'react-redux'
import {signIn} from '../../actions/authActions'
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {Row, Col, Button, Container, Input,
    Card, CardImg, CardText, CardBody,
    CardTitle, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class Home extends Component
{
    state = {
        users: [],
        search: '',
        modal: false,
        name: {
            sal: '',
            fname: '',
            lname: '',
        },
        gender: '',
    }

    componentDidMount() {
        let users = JSON.parse(localStorage.getItem('userData'));
        if (users) {
            this.setState({
            users
            });
        } else {
            localStorage.clear();
            this.getUsers();
        }
    }

    getUsers = () => {
        return this.fetchPost().then(([response,json]) => {
            console.log(response);
            console.log(json, 'data');
            if(response.status === 200)
            {             
                localStorage.setItem('userData',JSON.stringify(json.results));
            }
        })
    }

    fetchPost = () => {
        const URL = 'https://cors-anywhere.herokuapp.com/https://randomuser.me/api/0.8/?results=20';
        return fetch(URL, {method:'GET',headers:new Headers ({
           'Accept': 'application/json',
           'Content-Type': 'application/json',
        })}).then(response => Promise.all([response, response.json()]));
    }

    capitalizer = (data) => {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    toggle = () => {
        const {modal} = this.state;
        this.setState({modal: !modal});
    }

    render() {
        const { auth } = this.props;
        const {users, search, modal} = this.state;
        console.log(search, 'users');
        const re = RegExp(`.*${search.toLowerCase().split('').join('.*')}.*`)
        if(!auth) return <Redirect to='/' />

        return(
            <>
                <h1 style={{textAlign: 'center'}}>User Data</h1>
                <Container>
                    <Row style={{paddingTop: '5%'}}>
                        <Col xs={6}>
                            <Input id="search" placeholder="Search by username" onChange = {this.handleInputChange}/>
                        </Col>
                        <Col xs={6}>
                            <Button outline color="primary" onClick={this.toggle}>Add User</Button>
                        </Col>
                    </Row>
                    <Row>
                        {users && search !== ''? users.filter(user => user.user.username.toLowerCase().match(re)).map((user, idx) => {
                            console.log(user, 'user');
                            return (
                            <Col xs={6} style={{paddingTop: '3%'}}>
                                <Card>
                                    <CardImg top width="100%" src={user.user.picture.large} alt={`User ${idx}`} />
                                        <CardBody>
                                            <CardTitle>
                                                {this.capitalizer(user.user.name.title)} {this.capitalizer(user.user.name.first)} {this.capitalizer(user.user.name.last)}
                                                {' '} {`[${user.user.username}]`}
                                            </CardTitle>
                                            <CardText>
                                                Gender: {this.capitalizer(user.user.gender)} <br/>
                                                DOB: {moment(user.user.dob).format('DD/MM/YYYY')} <br/>
                                                Email: {user.user.email} <br/>
                                            </CardText>
                                        </CardBody>
                                </Card>
                            </Col>
                            )
                        }):
                        users.map((user, idx) => {
                            return (
                            <Col xs={6} style={{paddingTop: '3%'}}>
                                <Card>
                                    <CardImg top width="100%" src={user.user.picture.large} alt={`User ${idx}`} />
                                        <CardBody>
                                            <CardTitle>
                                                {this.capitalizer(user.user.name.title)} {this.capitalizer(user.user.name.first)} {this.capitalizer(user.user.name.last)}
                                                {' '} {`[${user.user.username}]`}
                                            </CardTitle>
                                            <CardText>
                                                Gender: {this.capitalizer(user.user.gender)} <br/>
                                                DOB: {moment(user.user.dob).format('DD/MM/YYYY')} <br/>
                                                Email: {user.user.email} <br/>
                                            </CardText>
                                        </CardBody>
                                </Card>
                            </Col>
                            )
                        })
                        }
                    </Row>
                    <div>
                        <Modal isOpen={modal}>
                            <ModalHeader toggle={this.toggle}>Add User</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col xs={1}>Name</Col> {''}
                                        <Col xs={3}><Input id="sal" placeholder="MR/MRS" onChange = {this.handleInputChange}/></Col>
                                        <Col xs={4}><Input id="fname" placeholder="First Name" onChange = {this.handleInputChange}/></Col>
                                        <Col xs={4}><Input id="lname" placeholder="Last Name" onChange = {this.handleInputChange}/></Col>
                                    </Row>
                                    <Row>
                                        <Col>Gender <Input id="gender" placeholder="Gender" onChange = {this.handleInputChange}/></Col>
                                    </Row>  
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary">Add User</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                        </Modal>
                    </div>
                </Container>
            </>
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

export default connect (mapStateToProps, mapDispatchToProps)(Home)