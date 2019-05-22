import React, { Component } from "react";

import Header from "../components/Header.jsx"
import MainContent from "../components/MainContent.jsx"
import Footer from "../components/Footer.jsx"

import "./Home.css"


class Home extends Component {
    render() {
        return (
            <div className="grid-container">

                <header className="headerContentOuterGrid">
                        <Header />
                </header>

                <main className="mainContentOuterGrid">
                    <MainContent />
                </main>

                <footer className="footerContent">
                    <Footer />
                </footer>





            </div>
        );
    }
}

export default Home