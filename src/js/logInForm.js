import {Component} from "react";
import React from "react";

export default class LogInForm extends Component {
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
                    window.location.replace("http://localhost:3000/main");
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
