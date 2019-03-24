import React, {Component} from 'react';
import Header from './Header';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import styles from '../css/firstPage.css'
import LogInForm from './logInForm.js';
import SignUpForm from './signUpForm.js';
import '../js/chart';
import DataTable from 'react-data-table-component';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';


const initialState = {
    username: "",
    password: ""
}

function infoReducer(state = initialState, action) {
    switch (action.type) {
        case 'setInfo':
            return Object.assign({}, state,{
                username: action.username,
                password: action.password
            })
    }
}

let authInfo = createStore(infoReducer);

// authInfo.subscribe(() => alert(authInfo.getState().username + " " + authInfo.getState().password));

// authInfo.dispatch({type: 'setInfo', username: 'asd', password: 'dsa'});
//



var index;

function clearxBorder() {
    var elements = document.getElementsByClassName("xbtn");
    for (index = 0; index < elements.length; index++) {
        elements[index].style.border = "2px solid red";
    }
}

function clearrBorder() {
    var elements = document.getElementsByClassName("rbtn");
    for (index = 0; index < elements.length; index++) {
        elements[index].style.border = "2px solid red";
    }
}

function hideX() {
    document.getElementById("xError").style.visibility = "hidden";
}

function hideR() {
    document.getElementById("rError").style.visibility = "hidden";
}

function viewX() {
    document.getElementById("xError").style.visibility = "visible";
}

function viewR() {
    document.getElementById("rError").style.visibility = "visible";
}

var style = {
    height: '100%',
    margin: 0
}

var margin = {
    paddingTop: 200,
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var dataForTable;
var hitList = [];
const columns = [
    {
        name: 'X',
        selector: 'x',
        sortable: true,
        width: '16%'
    },
    {
        name: 'Y',
        selector: 'y',
        sortable: true,
        width: '16%'
    },
    {
        name: 'R',
        selector: 'r',
        sortable: true,

        width: '9%'
    },
    {
        name: 'Is In Area',
        selector: 'isInArea',
        sortable: false,
        width: '19%'
    },
    {
        name: 'Hit Time',
        selector: 'hitTime',
        sortable: false,
        width: '40%'
    },
];
const mySweetTheme = {
    rows: {
        height: '30px',
    }
};

class Enter extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={style}>
                <Router>
                    <div>
                        <div id="divStyle">
                            <Link id="liLinkStyle" to='/login'>LOG IN</Link>
                            <Link id="suLinkStyle" to='/signup'>SIGN UP</Link>
                        </div>
                        <Route path="/login" component={logIn}/>
                        <Route path="/signup" component={signUp}/>
                    </div>
                </Router>
                <h3 id="pc">PC</h3>
                <h3 id="tablet">TABLET</h3>
                <h3 id="mobile">MOBILE</h3>
            </div>
        );
    }
}

class Main extends Component {
    constructor() {

        super();
        this.handleLogOut = this.handleLogOut.bind(this);
        this.xClick = this.xClick.bind(this);
        this.ySpin = this.ySpin.bind(this);
        this.state = {x: "", y: "0", r: "0.0"};
        this.rClick = this.rClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.canvClick = this.canvClick.bind(this);

        var resp = "";
        var url = "http://localhost:8080/user_hits/" + authInfo.getState().username;
        resp = JSON.parse(httpGet(url));
        var xValues = [],
            yValues = [],
            isInArea = [];

        resp.forEach(function (ad) {
            var tmp = new Object();
            tmp.x = ad.x;
            tmp.y = ad.y;
            tmp.r = ad.r;
            tmp.isInArea = ad.answer.toString();
            tmp.hitTime = ad.hit_time.substring(0, ad.hit_time.indexOf('.'));
            hitList.push(tmp);
            xValues.push(tmp.x);
            yValues.push(tmp.y);
            isInArea.push(ad.answer)
        });
    }

    componentDidMount() {
        clearxBorder();
        hideX();
        hideR();
        hideY();
        clearrBorder();
        var
            canv = document.getElementById("canv"),
            ctx = canv.getContext('2d');
        updateChart();


    }

    xClick(e) {
        e.preventDefault();
        clearxBorder();
        hideX();
        e.target.style.border = "2px solid #1E90FF";
        this.state.x = e.target.value;
    }

    ySpin(e) {
        e.preventDefault();
        hideY();
        var a = new Number(e.target.value);
        this.state.y = a;

    }

    rClick(e) {
        e.preventDefault();
        this.state.r = e.target.value;
        clearrBorder();
        hideR();
        e.target.style.border = "2px solid #1E90FF";
        updateChart(this.state.r);

    }

    handleLogOut(e) {
        e.preventDefault();
        document.cookie = "nameandpass=; path=/";
        window.location.replace("http://localhost:3000/main");
    }

    canvClick(e) {
        hideY();
        hideX();
        hideR();
        clearxBorder();
        var
            canv = document.getElementById("canv"),
            ctx = canv.getContext('2d');
        var x1, y1;

        if (parseFloat(this.state.r) == "0.0") {
            viewR();
            return;
        }
        var pos = getMousePos(canv, e);
        x1 = pos.x;
        y1 = pos.y;

        if (Math.round((x1 - 150) / 50 * 100) / 100 > 2 ||Math.round((x1 - 150) / 50 * 100) / 100 < -2){
            viewX();
            return;
        }


        if (Math.round((150 - y1) / 50 * 100) / 100 > 3 || Math.round((150 - y1) / 20 * 100) / 100 < -5 ){
            viewY();
            return;
        }


        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x1, y1, 1.5, 0, Math.PI * 2);
        ctx.fill();
        this.state.y = Math.round((150 - y1) / 50 * 100) / 100;
        this.state.x = Math.round((x1 - 150) / 50 * 100) / 100;

        document.getElementById("yInput").value = this.state.y;
        this.handleSubmit(document.createEvent('Event'));
        this.state.x = "";
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.x == "") {
            viewX();
            return;
        }
        if (this.state.r == "0.0") {
            viewR();
            return;
        }

        const url = "http://localhost:8080/add_hit/" + authInfo.getState().username;
        const data = JSON.stringify({"x": this.state.x, "y": this.state.y, "r": this.state.r});
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.send(data);

        updateChart(this.state.r)

    }

    render() {
        return (
            <div id="mf">
                <form id="mainform" onSubmit={this.handleSubmit}>
                    <p>X</p>
                    <div id="buttonblockX">
                        <input class="xbtn" type="button" label="-2" value="-2" onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="-1.5" value="-1.5" onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="-1" value={-1} onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="-0.5" value={-0.5} onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="0" value={0} onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="0.5" value={0.5} onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="1" value={1} onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="1.5" value={1.5} onClick={this.xClick}/>
                        <input class="xbtn" type="button" label="2" value={2} onClick={this.xClick}/>
                        <p id="xError">Wrong input X!</p>
                    </div>
                    <p>Y</p>
                    <div id="spinnerBlock">
                        <input id="yInput" type="number" defaultValue={this.state.y}
                               step={0.1} min={-5} max={3} onChange={this.ySpin}/>
                        <p style={{visibility: 'invisible'}} id="yError">Wrong input Y!</p>
                    </div>
                    <p id="rlabel">R</p>
                    <div id="buttonblockR">
                        <input class="rbtn" type="button" label="0.5" value={0.5} onClick={this.rClick}/>
                        <input class="rbtn" type="button" label="1" value={1} onClick={this.rClick}/>
                        <input class="rbtn" type="button" label="1.5" value={1.5} onClick={this.rClick}/>
                        <input class="rbtn" type="button" label="2" value={2} onClick={this.rClick}/>
                        <p id="rError">You haven't set the R!</p>
                    </div>
                    <input id="check" type="submit" value="Check"/>
                </form>
                <div id="canvAndTable">
                    <canvas id="canv" width="300" height="300" onClick={this.canvClick}></canvas>
                    <div id="tableContainer">
                        <div id="table">
                            <DataTable customTheme={mySweetTheme} columns={columns} data={hitList}/>
                        </div>
                    </div>
                </div>
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
    constructor(){
        super();

        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + "nameandpass".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        var a = matches ? matches[1] : undefined;

        if (a === undefined){
            window.location.replace("http://localhost:3000/enter");
        }
        if (a !== undefined) {
            var index = a.indexOf("▲▲");
            var username = a.substr(0, index);
            var password = a.substr(index + 2);


            let url = "http://localhost:8080/check_user";
            const data = JSON.stringify({"username": username, "password": password});
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, false);
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = xhr.responseText;
                    if ((response === 'false' || response === false) && window.location != "http://localhost:3000/enter") {
                        window.location.replace("http://localhost:3000/enter");
                    }
                    else if ((response === 'true' || response === true) && window.location != "http://localhost:3000/main") {
                        window.location.replace("http://localhost:3000/main");
                    }
                }
            };
            xhr.send(data);
            authInfo.dispatch({type: 'setInfo', username: username, password: password});
        }

    }
    render() {
        return (
            <div style={style}>
                <Header/>
                <div id="container">
                    <Router>
                        <div style={style}>
                            {/*<Route path="/" component={Enter}/>*/}
                            <Route path="/enter" component={Enter}/>
                            <Route path="/main" component={Main}/>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function hideY() {
    document.getElementById("yError").style.visibility = "hidden";
}
function viewY() {
    document.getElementById("yError").style.visibility = "visible";
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
function getMousePos(canv, e) {
    var rect = canv.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
function updateChart(R) {
    var
        canv = document.getElementById("canv"),
        ctx = canv.getContext('2d');
    var resp = "";
    const url = "http://localhost:8080/user_hits/" + authInfo.getState().username;
    resp = JSON.parse(httpGet(url));
    var hitList = [];
    var xValues = [],
        yValues = [],
        isInArea = [];
    resp.forEach(function (ad) {
        var tmp = new Object();
        tmp.x = ad.x;
        tmp.y = ad.y;
        tmp.r = ad.r;
        tmp.isInArea = ad.answer.toString();
        tmp.hitTime = ad.hit_time.substring(0, ad.hit_time.indexOf('.'));
        hitList.push(tmp);
        xValues.push(tmp.x);
        yValues.push(tmp.y);
        isInArea.push(ad.answer);
    });
    ReactDOM.render(<DataTable customTheme={mySweetTheme} columns={columns} data={hitList}/>,
        document.getElementById("table")
    );
    //table
    drawArea(R, ctx, canv);
    drawAxis(ctx);
    drawArrows(ctx);
    drawTips(ctx);
    drawXValues(ctx);
    drawYValues(ctx);
    drawPreviousHits(xValues, yValues, isInArea, ctx);
}
function drawArea(R, ctx, canv) {
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "#3399FF";
    ctx.save();
    ctx.beginPath()
    ctx.moveTo(canv.width / 2, canv.height / 2);                                 ////////////// -1
    // ctx.arc(canv.width / 2, canv.height / 2 - 1, R * 20, Math.PI, Math.PI * 3 / 2, false);
    ctx.arc(canv.width / 2, canv.height / 2 - 1, R / 2 * 50, 0, Math.PI / 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#3399FF";
    ctx.fillStyle = "#000";
    ctx.strokeRect(0, 0, 300, 300);
    ctx.fillStyle = "#3399FF";
    // ctx.fillRect(150 + 1, 150 - (R / 2) * 20 - 1, R * 20, (R / 2) * 20); ///////// +1
    ctx.fillRect(150 + 1 - R / 2 * 50, 150 - (R) * 50 - 1, R / 2 * 50, (R) * 50); ///////// +1
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 150 + 2.5 + R * 50);
    ctx.lineTo(151 - (R / 2) * 50, 150);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#000";
}
function drawPreviousHits(xValues, yValues, isInArea, ctx) {
    for (var i = 0; i < xValues.length; ++i) {
        var str = isInArea[i];
        if (str == true) {
            ctx.fillStyle = "#11FF00";
        } else {
            ctx.fillStyle = "red";
        }
        ctx.beginPath();
        ctx.arc(xValues[i] * 50 + 150 + 0.5, 150 - yValues[i] * 50 - 0.5, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.fillStyle = "#000";
}
function drawAxis(ctx) {
    ctx.beginPath();
    ctx.moveTo(150 + 0.5, 0);
    ctx.lineTo(150 + 0.5, 300);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 150 - 0.5);
    ctx.lineTo(300, 150 - 0.5);
    ctx.stroke();
}
function drawArrows(ctx) {
    ctx.beginPath();
    ctx.moveTo(150 + 0.5, 0);
    ctx.lineTo(147 + 0.5, 7);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(150 + 0.5, 0);
    ctx.lineTo(153 + 0.5, 7);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(300, 150 - 0.5);
    ctx.lineTo(293, 150 - 3.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(300, 150 - 0.5);
    ctx.lineTo(293, 150 + 2.5);
    ctx.stroke();
}
function drawTips(ctx) {
    for (var i = 0; i <= 250; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i + 0.5, 150 - 3);
        ctx.lineTo(i + 0.5, 150 + 2);
        ctx.stroke();
    }
    for (var i = 0; i <= 250; i += 50) {
        ctx.beginPath();
        ctx.moveTo(148, i - 0.5);
        ctx.lineTo(153, i - 0.5);
        ctx.stroke();
    }
}
function drawXValues(ctx) {
    ctx.font = "9px Arial";
    var x = -4;
    for (var i = -2; i < 0; ++i) {
        ctx.fillText(i, x += 50, 150 - 5);
    }
    x += 52;
    for (var i = 1; i <= 2; ++i) {
        ctx.fillText(i, x += 50, 150 - 5);
    }
}
function drawYValues(ctx) {
    ctx.font = "9px Arial";
    var y = 2;
    for (var i = 2; i >= -2; --i) {
        if (i != 0) {
            ctx.fillText(i, 154, y += 50);
        } else y += 50;
    }
}
function clearChart(ctx, canv) {
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "#000";
    ctx.strokeRect(0, 0, 300, 300);
    drawAxis(ctx);
    drawArrows(ctx);
    drawTips(ctx);
    drawXValues(ctx);
    drawYValues(ctx);
}
export default App;