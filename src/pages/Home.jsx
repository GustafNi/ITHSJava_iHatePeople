import React, { Component } from "react";

import Header from "../components/Header.jsx"
import MainContent from "../components/MainContent.jsx"
import Footer from "../components/Footer.jsx"

//import "./Home.css"


class Home extends Component {
    render() {
        return (
            <section class="container">
              
                <Header />
                
                <MainContent />
                
                <Footer />
               
            </section>
        );
    }
}

export default Home