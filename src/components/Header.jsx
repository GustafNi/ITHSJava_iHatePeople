import React, { Component } from "react"
import { Link } from "react-router-dom";
import "./header.css"




class Header extends Component {

    render() {

        return (

            <header className="headerContentInnerGrid">

                <nav className="nav-container">
                    <ul className="navbar">
                        <li>
                            <a className="home" href="#">Home</a>
                        </li>
                        <li>
                            <a className="about" href="#">About</a>
                        </li>
                        <li>
                            <a className="services" href="#">Services</a>
                        </li>
                        <li>
                            <a className="contact" href="#">Contact</a>
                        </li>
                    </ul>
                </nav>


                <nav className="socialButtons">

                    <li>
                        <a className="fb" href="#">fb</a>
                    </li><li>
                        <a className="insta" href="#">insta</a>
                    </li><li>
                        <a className="twitt" href="#">twitt</a>
                    </li>

                </nav>

            </header>





        );

    }

}

export default Header