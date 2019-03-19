import React, {Component} from 'react';
import Header from './Header';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import styles from '../css/firstPage.css'
import LogInForm from './logInForm.js';
import SignUpForm from './signUpForm.js';
import '../js/chart';
import DataTable from 'react-data-table-component';


//redirecting
var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + "nameandpass".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
));
var a = matches ? decodeURIComponent(matches[1]) : undefined;
if ((a === "" || a === undefined) && window.location != "http://localhost:3000/enter") {
    window.location.replace("http://localhost:3000/enter");
} else if ((a === "" || a === undefined) && window.location == "http://localhost:3000/enter") {
} else if (window.location == "http://localhost:3000/") {
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
} else if (window.location == "http://localhost:3000/main") {
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
    }
    xhr.send(data);
} else if (window.location == "http://localhost:3000/enter" || window.location == "http://localhost:3000/enter/login"
    || window.location == "http://localhost:3000/enter/signup") {
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
            if (response === 'true') {
                window.location.replace("http://localhost:3000/main");
            }
        }
        ;
    }

    xhr.send(data);
}


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

class All extends Component {
    render() {
        return (
            <div style={style}>
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
        width: '43%'
    },
];
const mySweetTheme = {
    rows: {
        height: '30px',
    }
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.xClick = this.xClick.bind(this);
        this.ySpin = this.ySpin.bind(this)
        this.state = {x: "", y: "0", r: "0.0"};
        this.rClick = this.rClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.canvClick = this.canvClick.bind(this);
        this.getData = this.getData.bind(this);

        var resp = "";
        const url = "http://localhost:8080/user_hits/" + username;
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
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x1, y1, 1.5, 0, Math.PI * 2);
        ctx.fill();
        this.state.y = Math.round((150 - y1) / 20 * 100) / 100;
        this.state.x = Math.round((x1 - 150) / 20 * 100) / 100;
        document.getElementById("yInput").value = this.state.y;
        this.handleSubmit(document.createEvent('Event'));
        this.state.x = "";
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.x == "") {
            viewX();
        }
        if (this.state.r == "0.0") {
            viewR();
        }

        const url = "http://localhost:8080/add_hit/" + username;
        const data = JSON.stringify({"x": this.state.x, "y": this.state.y, "r": this.state.r});
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.send(data);

        updateChart(this.state.r)

    }

    getData() {
        return dataForTable;
    }

    render() {
        return (
            <div>
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
                        <p id="xError">You haven't set the X!</p>
                    </div>
                    <p>Y</p>
                    <div id="spinnerBlock">
                        <input id="yInput" type="number" defaultValue={this.state.y}
                               step={0.1} min={-5} max={3} onChange={this.ySpin}/>
                    </div>
                    <p>R</p>
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
                    <div id="table">
                        <DataTable customTheme={mySweetTheme} columns={columns} data={hitList}/>
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
    render() {
        return (
            <div style={style}>

                <Header/>
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
    const url = "http://localhost:8080/user_hits/" + username;
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
        tmp.isInArea = ad.answer;
        tmp.hitTime = ad.hit_time.substring(0, ad.hit_time.indexOf('.'));
        hitList.push(tmp);
        xValues.push(tmp.x);
        yValues.push(tmp.y);
        isInArea.push(ad.answer);
    });
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
    ctx.arc(canv.width / 2, canv.height / 2 - 1, R / 2 * 20, 0, Math.PI / 2, false);

    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#3399FF";
    ctx.fillStyle = "#000";
    ctx.strokeRect(0, 0, 300, 300);
    ctx.fillStyle = "#3399FF";
    // ctx.fillRect(150 + 1, 150 - (R / 2) * 20 - 1, R * 20, (R / 2) * 20); ///////// +1
    ctx.fillRect(150 + 1 - R / 2 * 20, 150 - (R) * 20 - 1, R / 2 * 20, (R) * 20); ///////// +1
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 150 + 2.5 + R * 20);
    ctx.lineTo(151 - (R / 2) * 20, 150);
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
        ctx.arc(xValues[i] * 20 + 150 + 0.5, 150 - yValues[i] * 20 - 0.5, 2, 0, Math.PI * 2);
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
    for (var i = 10; i <= 290; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i + 0.5, 150 - 3);
        ctx.lineTo(i + 0.5, 150 + 2);
        ctx.stroke();
    }
    for (var i = 10; i <= 290; i += 20) {
        ctx.beginPath();
        ctx.moveTo(148, i - 0.5);
        ctx.lineTo(153, i - 0.5);
        ctx.stroke();
    }
}

function drawXValues(ctx) {
    ctx.font = "9px Arial";
    var x = -14;
    for (var i = -7; i < 0; ++i) {
        ctx.fillText(i, x += 20, 150 - 3);
    }
    x += 22;
    for (var i = 1; i <= 7; ++i) {
        ctx.fillText(i, x += 20, 150 - 3);
    }
}

function drawYValues(ctx) {
    ctx.font = "9px Arial";
    var y = -8;
    for (var i = 7; i >= -7; --i) {
        if (i != 0) {
            ctx.fillText(i, 154, y += 20);
        } else y += 20;
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
