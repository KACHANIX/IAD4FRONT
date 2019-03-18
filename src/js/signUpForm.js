import {Component} from "react";
import React from "react";

export default class SignUpForm extends Component {
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
                    window.location.replace("http://localhost:3000/main");
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