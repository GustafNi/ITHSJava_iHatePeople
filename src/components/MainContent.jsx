
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

//const key = process.env.REACT_ROME_2_RIO_KEY
const key = "S2Q8spaR"
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
  images(index, vehicleType) {
    let ind = index
    let img = vehicleType.map((vehicle, i) => {
      if (ind === i) {
        if(vehicle.kind==="train"){
          return <img className="vehicle" src={train} alt="TrainIcon" />
        }
        if(vehicle.kind==="foot"){
          return <img className="vehicle" src={walk} alt="TrainIcon" />
        }
        if(vehicle.kind==="bus"){
          return <img className="vehicle" src={bus} alt="TrainIcon" />
        }
        if(vehicle.kind==="taxi"){
          return <img className="vehicle" src={taxi} alt="TrainIcon" />
        }
        if(vehicle.kind==="car"){
          return <img className="vehicle" src={car} alt="TrainIcon" />
        } 
      }
    })
    return img
  }
  placeName(index,placeType) {
    let ind = index
    let place = placeType.map((place, i) => {
      if (ind === i) {
        return place.shortName
      }
    }
    )
    return place
  }

  getStops(segment, placeType) {
    let stops = segment.stops

    let stops2 = stops && stops.map((stop, index) =>
      <section key={`${index}-react-key`}>
        <p>Stop {index + 1}: {this.placeName(stop.place,placeType)}</p>
      </section>
    )

    return stops2
  }

  getPrices(route) {
    let indicativePrice = route.indicativePrices
    let prices = indicativePrice && indicativePrice.map((price, index) =>
      <section key={`${index}-react-key`}>
        <h5>{price.name}</h5>
        <p>{price.priceLow} - {price.priceHigh} {price.currency}</p>
      </section>
    )
    return prices
  }

  getSegments(route, vehicleType,placeType) {
    let segments = route.segments
    let segments2 = segments.map((segment, index) => 
        <section key={`${index}-react-key`}>
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
      ? this.state.routes.map((route, i) => {
        const vehicleType = this.state.vehicleOutward
        const placeType = this.state.placesOutward
        if(route.name!=="Drive"){
          return (
            <section key={`${i}-react-key`}>
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
        }
        
      })
      : null
      
      return routes
  }
  routeReturn(){
    const routes = this.state.routes2.length
      ? this.state.routes2.map((route, i) => {
        const vehicleType = this.state.vehicleReturn
        const placeType = this.state.placesReturn
        return (
 <section key={`${i}-react-key`}>

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