import React, {Component} from 'react';
import Header from './Header';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import firstPage from '../css/firstPage.css'
import LogInForm from './logInForm.js';
import SignUpForm from './signUpForm.js';

import {Button} from 'primereact/button';
import {Spinner} from 'primereact/spinner';
import {ToggleButton} from 'primereact/togglebutton';



var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + "nameandpass".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
));
var a = matches ? decodeURIComponent(matches[1]) : undefined;


if ((a === "" || a === undefined) && window.location != "http://localhost:3000/enter") {
    window.location.replace("http://localhost:3000/enter");
}
else if ((a === "" || a === undefined) && window.location == "http://localhost:3000/enter") {
}
else if (window.location == "http://localhost:3000/") {
    var index = a.indexOf("▲▲");
    var username = a.substr(0, index);
    var password = a.substr(index + 2);


    const url = "http://localhost:8080/check_user";
    const data = JSON.stringify({"username": username, "password": password});
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            if (response !== 'true') {
                window.location.replace("http://localhost:3000/enter");
            } else {
                window.location.replace("http://localhost:3000/main");
            }
        }
    };
    xhr.send(data);
}
else if (window.location == "http://localhost:3000/main") {
    var index = a.indexOf("▲▲");
    var username = a.substr(0, index);
    var password = a.substr(index + 2);


    const url = "http://localhost:8080/check_user";
    const data = JSON.stringify({"username": username, "password": password});
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            if (response !== 'true') {
                window.location.replace("http://localhost:3000/enter");
            }
        }
        ;
        xhr.send(data);
    }
}


// document.cookie = "nameandpass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

var style = {
    height: '100%',
    margin: 0
}

class All extends Component {
    render() {
        return (
            <div style={style}>
                {/*<div id="container">*/}
                    <Router>
                        <div>
                            <div id="divStyle">
                                <Link id="liLinkStyle" to='/enter/login'>LOG IN</Link>
                                <Link id="suLinkStyle" to='/enter/signup'>SIGN UP</Link>
                            </div>
                            <Route path="/enter/login" component={logIn}/>
                            <Route path="/enter/signup" component={signUp}/>
                        </div>
                    </Router>

                {/*</div>*/}


                <h3 id="pc">PC</h3>
                <h3 id="tablet">TABLET</h3>
                <h3 id="mobile">MOBILE</h3>
            </div>
        );
    }
}

var margin = {
    paddingTop: 200,
}

class Main extends Component {
    handleLogOut(e) {
        e.preventDefault();
        document.cookie = "nameandpass=; path=/";
        window.location.replace("http://localhost:3000/main");

    }
    xClick(e){
        alert("huy");
        e.preventDefault();
    }

    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.xClick = this.xClick.bind(this)
        this.state = {x: "", y: "1",r : ""};
    }

    render() {
        return (
            <div>
                <form id="mainform">
                    <div id="buttonblockX">
                        <Button label="-2"/>
                        <Button label="-1.5"/>
                        <Button label="-1"/>
                        <Button label="-0.5"/>
                        <Button label="0"/>
                        <Button label="0.5"/>
                        <Button label="1"/>
                        <Button label="1.5"/>
                        <Button label="2"/>
                    </div>
                    <div id="spinnerBlock">
                        <Spinner value={this.state.y}  onChange={(e) => this.setState({y: e.value})} min={-5} max={3} step={0.1}/>
                    </div>
                    <div id="buttonblockR">
                        <ToggleButton/>
                    </div>
                </form>
                <form id="logout" onSubmit={this.handleLogOut}>
                    <input type="submit" value="Log Out"/>
                </form>


                <h3 id="pc">PC</h3>
                <h3 id="tablet">TABLET</h3>
                <h3 id="mobile">MOBILE</h3>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div style={style}>

                <Header />
                <div id="container">
                    <Router>
                        <div style={style}>
                            <Route path="/enter" component={All}/>
                            <Route path="/main" component={Main}/>
                        </div>
                    </Router>
                </div>
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
