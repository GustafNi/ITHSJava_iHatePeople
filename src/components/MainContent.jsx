import React, { Component } from 'react';
import "./mainContent.css"
import train from '../img/train.png'
import bus from '../img/bus.png'
import walk from '../img/walk.png'
import car from '../img/car.png'
import taxi from '../img/taxi.png'
require('dotenv').config();
console.log(process.env);
/* lägg form i hela */

const key = process.env.REACT_APP_ROME_2_RIO_KEY
class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromValue: '',
      toValue: '',
      routes: [],
      routes2: [],
      currency: '',
      errorMsg: null,
      apiResult: null,
      visibility: false,
      placesOutward: [],
      placesReturn: [],
      vehicleOutward: [],
      vehicleReturn: []
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)

  }

  // Function running when Search button gets klicked//
// First the fetch request url gets the data from the api then converts it from jSon.
// From there it adds the routes and places arrays into the state.
// After that it reverts the values in the url to get the return trip info

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
        let placesOutward = data.places
        this.setState({
          placesOutward
        })
        let vehicleOutward = data.vehicles
        this.setState({
          vehicleOutward
        })


        console.log(routes)
        console.log(placesOutward)
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
        let placesReturn = data.places
        this.setState({
          placesReturn
        })
        let vehicleReturn = data.vehicles
        this.setState({
          vehicleReturn
        })



        console.log(routes2)
      })
      .catch(err =>
        this.setState({
          errorMsg: err
        })
      )
    document.getElementById("how").innerHTML = "Outward trip"
  }

  //Function to show travel time in hours and minutes

  handleChange = () => this.setState({ visibility: !this.state.visibility })
  convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h} h ${m} m`;
  }
  
  //Function to change the currency in the fetch request url
  
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
  images(index, vehicleType) {
    let ind = index
    let img = vehicleType.map((vehicle, indexVehicle) => {
      if (ind === indexVehicle) {
        if(vehicle.kind==="train"){
          return <img key={indexVehicle} className="vehicle" src={train} alt="TrainIcon" />
        }
        if(vehicle.kind==="foot"){
          return <img key={indexVehicle} className="vehicle" src={walk} alt="TrainIcon" />
        }
        if(vehicle.kind==="bus"){
          return <img key={indexVehicle} className="vehicle" src={bus} alt="TrainIcon" />
        }
        if(vehicle.kind==="taxi"){
          return <img key={indexVehicle} className="vehicle" src={taxi} alt="TrainIcon" />
        }
        if(vehicle.kind==="car"){
          return <img key={indexVehicle} className="vehicle" src={car} alt="TrainIcon" />
        } 
      }
    })
    return img
  }
  
  
  placeName(index,placeType) {
    let ind = index
    let place = placeType.map((place, indexPlace) => {
      if (ind === indexPlace) {
        return place.shortName
      }
    }
    )
    return place
  }

  getStops(segment, placeType) {
    let stops = segment.stops

    let stops2 = stops && stops.map((stop, indexStops) =>
      <section key={indexStops}>
        <p>Stop {indexStops + 1}: {this.placeName(stop.place,placeType)}</p>
      </section>
    )

    return stops2
  }

  getPrices(route) {
    let indicativePrices = route.indicativePrices
    let prices = indicativePrices && indicativePrices.map((price, indexPrices) =>
      <section key={indexPrices}>
        <h5>{price.name}</h5>
        <p>{price.priceLow} - {price.priceHigh} {price.currency}</p>
      </section>
    )
    return prices
  }

  getSegments(route, vehicleType,placeType) {
    let segments = route.segments
    let segments2 = segments.map((segment, indexSegment) => 
        <section key={indexSegment}>
          <div className="resaultBox">
            {this.images(segment.vehicle, vehicleType)}
            {this.getStops(segment,placeType)}
          </div>
        </section>
    )
    return segments2
  }

  routeOutward(){
    const routes = this.state.routes.length
      ? this.state.routes.map((route, indexRouteO) => {
        const vehicleType = this.state.vehicleOutward
        const placeType = this.state.placesOutward
        
          return (
            <section key={indexRouteO}>
              <div className="resaultBox">
                <h3>{route.name}</h3>
                <p>Distance in km: {route.distance}</p>
                <p>Traveltime in minutes: {this.convertMinsToHrsMins(route.totalDuration)}</p>
                <p>Duration {this.convertMinsToHrsMins(route.totalTransitDuration)}</p>
                <h3>Stops:</h3>
                {this.getSegments(route,vehicleType,placeType)}
                <h3>Prices:</h3>
                {this.getPrices(route)}
              </div>
            </section>
  
          )
        
        
      })
      : null
      
      return routes
  }
  routeReturn(){
    const routes = this.state.routes2.length
      ? this.state.routes2.map((route, indexRouteR) => {
        const vehicleType = this.state.vehicleReturn
        const placeType = this.state.placesReturn
        
        return (
 <section key={indexRouteR}>

            <div className="resaultBox">
              <h3>{route.name}</h3>
              <p>Distance in km: {route.distance}</p>
              <p>Traveltime in minutes: {this.convertMinsToHrsMins(route.totalDuration)}</p>
              <p>Duration {this.convertMinsToHrsMins(route.totalTransitDuration)}</p>
              <h3>Stops:</h3>
              {this.getSegments(route,vehicleType,placeType)}
              <h3>Prices:</h3>
              {this.getPrices(route)}
            </div>
          </section>
        )
        
      })
      : null
      return routes
  }

  render() {
    const routesOutward = this.routeOutward()
    const routesReturn = this.routeReturn()
    return (

      <main className="mainContentInnerGrid">
        {this.what()}
        <div className="how">
          <div><h1 id="how"></h1>{routesOutward}</div>
          {this.state.visibility && <div><h1>Return trip</h1>{routesReturn}</div>}
        </div>
      </main>
    );

  }
}

export default MainContent