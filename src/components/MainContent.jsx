import React, { Component } from 'react';
import "./mainContent.css"

/* lägg form i hela */

const key = 'S2Q8spaR'

class MainContent extends Component {
    constructor() {
        super()
        this.state = {
            fromValue: '',
            toValue: '',
            routes: [],
            routes2: [],
            currency: '',
            errorMsg: null,
            apiResult: null,
            visibility: false
        }
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    }



    handleSearchSubmit = event => {
        event.preventDefault()

        fetch(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${this.state.fromValue}&dName=${this.state.toValue}&currencyCode=${this.state.currency}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let routes = data.routes
                this.setState({
                    routes
                })


                console.log(routes)
            })
            .catch(err =>
                this.setState({
                    errorMsg: err
                })
            )
        fetch(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${this.state.toValue}&dName=${this.state.fromValue}&currencyCode=${this.state.currency}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let routes2 = data.routes
                this.setState({
                    routes2
                })


                console.log(routes2)
            })
            .catch(err =>
                this.setState({
                    errorMsg: err
                })
            )
            document.getElementById("how").innerHTML="Outward trip"
    }
    handleChange = () => this.setState({ visibility: !this.state.visibility })
    convertMinsToHrsMins(mins) {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h} h ${m} m`;
    }
    currencySelect() {
        return (
            <div>
                <p>Currency</p>
                <select onChange={e => this.setState({ currency: e.target.value })}>
                    <option value='USD'>USD</option>
                    <option value="EUR">EUR</option>
                    <option value="SEK">SEK</option>
                </select>
            </div>
        )
    }

    what() {
        return (
            <div className="what">
                {this.currencySelect()}
                <h1>what</h1>

                <form onSubmit={this.handleSearchSubmit}>
                    <label>
                        <input type="checkbox"
                            checked={this.state.visibility}
                            onChange={this.handleChange}
                        />
                        Add return trip
       </label>
                    <p>What?</p>
                    <input type='text' name='departureCity' placeholder='from?' onChange={e => this.setState({ fromValue: e.target.value })}></input>


                    <p>Where?</p>
                    <select onChange={e => this.setState({ toValue: e.target.value })}>
                        <option placeholder='destination?'></option>
                        <option value="Åre">Åre</option>
                        <option value="Falun">Falun</option>
                        <option value="Stockholm">Stockholm</option>
                    </select>


                    <button style={{ margin: '0 0 0 20px' }}>Search</button>
                </form>
            </div>
        )
    }

    render() {
        const routes = this.state.routes.length
            ? this.state.routes.map((route, i) => {
                let indicativePrice = route.indicativePrices
                return (

                    <section key={`${i}-react-key`}>

                        <div className="resaultBox">
                            <h3>{route.name}</h3>
                            <p>Distance in km: {route.distance}</p>
                            <p>Traveltime in minutes: {route.totalDuration}</p>
                            <p>Duration {route.totalTransitDuration}</p>
                            {indicativePrice.map((price, index) =>
                                                <section key={`${index}-react-key`}>

                                                    <h5>{price.name}</h5>
                                                    <p>Average price: {price.price} {price.currency}</p>

                                                </section>
                                            )}
                            
                                            
                            {console.log(route.name)}
                        </div>

                    </section>

                )
            })
            : null
        const routes2 = this.state.routes2.length
            ? this.state.routes2.map((route, i) => {
                return (

                    <section key={`${i}-react-key`}>

                        <div className="resaultBox">
                            <h3>{route.name}</h3>
                            <p>Distance in km: {route.distance}</p>
                            <p>Traveltime in minutes: {route.totalDuration}</p>
                            <p>Duration {route.totalTransitDuration}</p>
                            <p>something from array {route.indicativePrice}</p>
                            {console.log(route.name)}
                        </div>

                    </section>

                )
            })
            : null
        return (

            <main className="mainContentInnerGrid">

            {this.what()}

                <div className="how">
                <div><h1 id ="how"></h1>{routes}</div>
                    {this.state.visibility&&<div><h1>Return trip</h1>{routes2}</div>}
                </div>


            </main>
        );

    }

}

export default MainContent