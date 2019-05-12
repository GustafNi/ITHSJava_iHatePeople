import React, { Component } from 'react';
import "./mainContent.css"

/* lägg form i hela */

const key = 'Klistra in nyckeln här'

class MainContent extends Component {
    constructor() {
        super()
        this.state = {
            fromValue: '',
            toValue: '',
            routes: [],
            errorMsg: null,
            apiResult: null
        }
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    }



    handleSearchSubmit = event => {
        event.preventDefault()

        fetch(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${this.state.fromValue}&dName=${this.state.toValue}`)
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
    }
    render() {
        const routes = this.state.routes.length
            ? this.state.routes.map((route, i) => {
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




                <div className="what">

                    <h1>what</h1>

                    <form onSubmit={this.handleSearchSubmit}>
                        <p>What?</p>
                        <input type='text' name='departureCity' placeholder='from?' onChange={e => this.setState({ fromValue: e.target.value })}></input>


                        <p>Where?</p>
                        <select onChange={e => this.setState({ toValue: e.target.value })}>
                            <option placeholder='destination?'></option>
                            <option value="ostersund">Åre</option>
                            <option value="falun">Falun</option>
                            <option value="stockholm">Stockholm</option>
                        </select>


                        <button style={{ margin: '0 0 0 20px' }}>Search</button>
                    </form>
                </div>




                <div className="how"><h1>How</h1>
                        <div>{routes}</div>
                    </div>
                

            </main>
        );

    }

}

export default MainContent