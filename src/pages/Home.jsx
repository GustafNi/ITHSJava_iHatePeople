import React, { Component } from "react";

import Header from "../components/Header.jsx"
import MainContent from "../components/MainContent.jsx"
import Footer from "../components/Footer.jsx"

import "./Home.css"


class Home extends Component {
    render() {
        return (
            <div className="grid-container">
                <Header />
                
                <MainContent />
                
                <Footer />
            </div>
        );
    }
}

export default Home