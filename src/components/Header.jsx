import React from "react"
import "./header.css"
import fb from "../img/fb.png"
import insta from "../img/insta.png"
import twitter from "../img/twitter.png"
import logo from "../img/logo.png"

console.log(insta)
console.log(logo)

function Header() {
    return (
        <header className="container-fluid bg-#006699">
            <div className='logoContainer'>
                <img className="logo" src={logo} alt="2 Sweden logo"></img>
                
            </div>
            
            <div>
                 {/* att namnge en class till 'navbar' gör att den ligger lodrätt på sidan */}
            <nav className="thenavbar">
                
                <li>
                     <a className="home" href="https://www.sfbok.se">Home</a>
                </li>
                <li>
                     <a className="about" href="https://www.sfbok.se">About</a>
                </li>
                <li>
                    <a className="services" href="https://www.sfbok.se">Services</a>
                </li>
                <li>
                    <a className="contact" href="https://www.sfbok.se">Contact</a>
                 </li>
            
        </nav>
           
            <nav className="socialButtonsList">
                
                <ul style={{listStyleType:'none'}}>
                    <li>
                        <a href="https://www.sfbok.se">
                            <img className='socialButtons' src={fb} alt="Facebook logo"></img>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.sfbok.se">
                            <img className='socialButtons' src={insta} alt="Instagram logo"></img>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.sfbok.se">
                            <img className='socialButtons' src={twitter} alt="Twitter logo"></img>
                        </a>
                    </li>
                </ul>
            </nav>
            </div>
        </header>
    );

}
export default Header