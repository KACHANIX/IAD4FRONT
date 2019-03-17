import React, {Component} from 'react';
import Header from './Header';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import firstPage from '../css/firstPage.css'
//
document.cookie = "nameandpass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

var style = {
    height: '100%',
    margin: 0
}

class App extends Component {
    render() {
        return (
            <div style={style}>
                <Header/>
                <div id="container">
                    <Router>
                        <div>
                            <nav>
                                <div id="divStyle">
                                    <Link id="liLinkStyle" to='/login'>LOG IN</Link>
                                    <Link id="suLinkStyle" to='/signup'>SIGN UP</Link>
                                </div>
                            </nav>
                            <Route path="/login" component={logIn}/>
                            <Route path="/signup" component={signUp}/>
                        </div>
                    </Router>

                    <h3 id="pc">PC</h3>
                    <h3 id="tablet">TABLET</h3>
                    <h3 id="mobile">MOBILE</h3>
                </div>
            </div>
        );
    }
}


class LogInForm extends Component {
    handleSubmit(e) {
        e.preventDefault();


        var username = this.state.name;
        var password = this.state.password;

        if (username == "" || username == null ||
            password == "" || password == null){
            return;
        }
        const url = "http://localhost:8080/check_user";
        const data = JSON.stringify({"username": username, "password": password});
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response =  xhr.responseText;
                if (response === 'true') {
                    // alert("name=" + username + "&&" + password + "; path=/");
                    document.cookie = "nameandpass=" + username + "▲▲" + password + "; path=/";
                    // window.location.replace("http://localhost:3000/asd.html");
                }
                else {
                    document.getElementById('errorWrong').style="display: inline";
                }
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
                    <input type="submit" value="Log In"/><br/>
                    <label id="errorWrong">Wrong login or password!</label>
                    <label id="errorExists">User with this username already exists!</label>
                </form>
            </div>
        );
    }
}

class SignUpForm extends Component {
    handleSubmit(e) {
        e.preventDefault();

        var username = this.state.name;
        var password = this.state.password;

        if (username == "" || username == null ||
            password == "" || password == null){
            return;
        }

        const url = "http://localhost:8080/add_user";
        const data = JSON.stringify({"username": username, "password": password});
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response =  xhr.responseText;
                if (response === 'true') {
                    document.cookie = "nameandpass=" + username + "▲▲" + password + "; path=/";
                    // window.location.replace("http://localhost:3000/asd.html");
                }
                else {
                    document.getElementById('errorExists').style="display: inline";
                }
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
                    <input type="submit" value="Register"/><br/>
                    <label id="errorWrong">Wrong login or password!</label>
                    <label id="errorExists">User with this username already exists!</label>
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
