import React, { Component } from 'react';
import "./mainContent.css"
import Maps from './Maps.jsx'
import train from '../img/train.png'
import bus from '../img/bus.png'
import walk from '../img/walk.png'
import car from '../img/car.png'
import taxi from '../img/taxi.png'
import Maps from './Maps.jsx'
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
      vehicleReturn: [],
      expandedRows: []
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)

  }

  handleSearchSubmit = event => {
    event.preventDefault()

    fetch(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${this.state.fromValue}&dName=${this.state.toValue}&currencyCode=${this.state.currency}`)
      .then(response => response.json())
      .then(data => {
        console.log("DataFetch1",data)
        let routes = data.routes
        let placesOutward = data.places
        let vehicleOutward = data.vehicles
        this.setState({
          routes,
          placesOutward,
          vehicleOutward
        })          
               
      
      })
      .catch(err =>
        this.setState({
          errorMsg: err
        })
      )
    fetch(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${this.state.toValue}&dName=${this.state.fromValue}&currencyCode=${this.state.currency}`)
      .then(response => response.json())
      .then(data => {
        console.log("DataFecth2", data)
        let routes2 = data.routes
        let placesReturn = data.places
        let vehicleReturn = data.vehicles
        this.setState({
          routes2,
          placesReturn,
          vehicleReturn

        })       
        
       
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
        <h1></h1>

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
    let prices = route.indicativePrices && route.indicativePrices.map((price, indexPrices) =>{
      if(price.priceLow===undefined){
        return(
          <section key={indexPrices}>
          <h5>{price.name}</h5>
          <p>{price.price} {price.currency}</p>
          
        </section>
        )
      }
      else{
        return(
          <section key={indexPrices}>
          <h5>{price.name}</h5>
          <p>{price.priceLow} - {price.priceHigh} {price.currency}</p>
        </section>
        )
      }
      
    }
    )
    return prices
  }

  getSegments(route, vehicleType,placeType) {    
    let segments = route.segments.map((segment, indexSegment) => 
        <section key={indexSegment}>
          <div className="resaultBox">
            {this.images(segment.vehicle, vehicleType)}
            {this.getStops(segment,placeType)}
          </div>
        </section>
    )
    return segments
  }

  routeOutwards(){
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
                <Maps children ={route.segments}/>
              </div>
            </section>
          )
      })
      : null
      
      return routes
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
                <Maps children = {route.segments} places={placeType}/>         
                 {/* <Maps children={this.getSegments(route, vehicleType, placeType)}/>  */}
                {/* <Maps lat={this.placeLat(route.depPlace,placeType)} lng={this.placeLng(route.depPlace,placeType)}/> */}
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
              <Maps children = {route.segments} places={placeType}/>  
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