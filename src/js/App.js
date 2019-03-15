import React, {Component} from 'react';
import Header from './Header';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import firstPage from '../css/firstPage.css'

var divStyle = {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 170,
    height: 30,
    fontSize: 20,
    fontWeight: 'bold'
}
var liLinkStyle = {
    textDecoration: 'none',
    border: '2px solid #1E90FF',
    width: 64,
    height: 30
}
var suLinkStyle = {
    marginLeft: 15,
    textDecoration: 'none',
    border: '2px solid #1E90FF',
    width: 72,
    height: 30
}


class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Router>
                    <div>
                        <nav>
                            <div style={divStyle}>
                                <Link style={liLinkStyle} to='/login'>LOG IN</Link>
                                <Link style={suLinkStyle} suLinkStyle to='/signup'>SIGN UP</Link>
                            </div>
                        </nav>
                        <Route path="/login" component={logIn}/>
                        <Route path="/signup" component={signUp}/>
                    </div>
                </Router>
            </div>
        );
    }
}


class LogInForm extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:8080/check_user";
        const data = JSON.stringify({ "username" : this.state.name, "password" : this.state.password });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                alert(json);
            }
        };
        xhr.send(data);

    }

    constructor(props) {
        super(props);
        this.state = {name: "", password: ""};
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onNameChange(event) {
        var val = event.target.value;
        this.setState({name: val});
    }

    onPassChange(event) {
        var val = event.target.value;
        this.setState({password: val});
    }

    render() {
        return (
            <div>
                <form class="form" onSubmit={this.handleSubmit}>
                    <label>USERNAME</label><br/>
                    <input type="text" value={this.state.name} onChange={this.onNameChange}/> <br/> <br/>
                    <label>PASSWORD</label><br/>
                    <input type="password" value={this.state.password} onChange={this.onPassChange}/> <br/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        );
    }
}

class SignUpForm extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:8080/add_user";
        const data = JSON.stringify({ "username" : this.state.name, "password" : this.state.password });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                alert(json);
            }
        };
        xhr.send(data);

    }

    constructor(props) {
        super(props);
        this.state = {name: "", password: ""};
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onNameChange(event) {
        var val = event.target.value;
        this.setState({name: val});
    }

    onPassChange(event) {
        var val = event.target.value;
        this.setState({password: val});
    }

    render() {
        return (
            <div>
                <form class="form" onSubmit={this.handleSubmit}>
                    <label id="reglabel">CHOOSE USERNAME</label><br/>
                    <input type="text" value={this.state.name} onChange={this.onNameChange}/> <br/> <br/>
                    <label id="reglabel">CHOOSE PASSWORD</label><br/>
                    <input type="password" value={this.state.password} onChange={this.onPassChange}/> <br/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

function signUp() {
    return (
        <SignUpForm/>
    )
}

function logIn() {
    return (
        <LogInForm/>
    )
}


export default App;
