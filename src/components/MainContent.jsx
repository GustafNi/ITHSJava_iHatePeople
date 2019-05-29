import React, { Component } from 'react';
import "./mainContent.css"
import Maps from './Maps.jsx'
import GetPrices from './function/GetPrices.jsx.js'
import GetSegments from './function/GetSegments.jsx.js'
import CurrencySelect from './function/CurrencySelect.jsx.js'
import ConvertTime from './function/ConvertTime'
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
    this.currencySelectChange = this.currencySelectChange.bind(this)
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
  
  currencySelectChange(value){
    this.setState({ currency: value })
  }

  what() {

    return (
      <div className="what">
        {CurrencySelect(this.currencySelectChange)}
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
                <p>Traveltime in minutes: {ConvertTime(route.totalDuration)}</p>
                <p>Duration {ConvertTime(route.totalTransitDuration)}</p>
                <h3>Stops:</h3>
                {GetSegments(route,vehicleType,placeType)}
                <h3>Prices:</h3>
                {GetPrices(route)} 
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
             
              <p>Traveltime in minutes: {ConvertTime(route.totalDuration)}</p>
              <p>Duration {ConvertTime(route.totalTransitDuration)}</p>
              <h3>Stops:</h3>
              {GetSegments(route,vehicleType,placeType)}
              <h3>Prices:</h3>
              {GetPrices(route)}
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