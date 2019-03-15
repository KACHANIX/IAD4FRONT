import {Component} from "react";
import React from "react";
import '../css/header.css';
import '../css/firstPage.css';

class Header extends Component{
    render() {
        return(
            <div id="header">
                <div id="header-text">
                    <div>Сергей Кочарян, Александр Артамонов</div>
                    <div>P3218, Вариант 18094</div>
                </div>
                <div id="header-image">
                    <img id="VT-img" src={require('../VT.jpg')} alt="VT Logo"/>
                </div>
            </div>
        );
    }
}

export default Header;