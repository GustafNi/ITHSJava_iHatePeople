import React, { Component } from 'react';
import "./mainContent.css"
import Maps from './Maps.jsx'
import train from '../img/train.png'
import bus from '../img/bus.png'
import walk from '../img/walk.png'
import car from '../img/car.png'
import taxi from '../img/taxi.png'
import plane from '../img/airplane.png'
import runda from '../img/runda.png'
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
      expand: false
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.expandButton = this.expandButton.bind(this)
  }
  expandButton() {
    if (!this.state.expand) {
      this.setState({
        expand: !this.state.expand
      })
      document.getElementById("expandButton").innerHTML = "-"
    }
    else {
      this.setState({
        expand: !this.state.expand
      })
      document.getElementById("expandButton").innerHTML = "+"
    }
  }
  handleSearchSubmit = event => {
    event.preventDefault()

    fetch(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${this.state.fromValue}&dName=${this.state.toValue}&currencyCode=${this.state.currency}`)
      .then(response => response.json())
      .then(data => {
        console.log("DataFetch1", data)
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

  /***************************************************
    
       Knappen för välja valuta  
    
    *************************************************/


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
    /***************************************************
       
         Sökfunktion för resa
       
       *************************************************/
    return (
      <div className="what">
        <div class="container-fluid">
          {this.currencySelect()}
          <h1></h1>

          <form onSubmit={this.handleSearchSubmit}>
            <label>
              {/* Checkbox för om man vill göra en return trip från därifrån man reste */}
              <input type="checkbox"
                checked={this.state.visibility}
                onChange={this.handleChange}
              />
              Add return trip
       </label>
            {/* Input text för vart man vill resa ifrån */}
            <p>What?</p>
            <input type='text' name='departureCity' placeholder='from?' onChange={e => this.setState({ fromValue: e.target.value })}></input>

            {/* Lista från vart man kan resa till */}
            <p>Where?</p>
            <select onChange={e => this.setState({ toValue: e.target.value })}>
              <option placeholder='destination?'></option>
              <option value="Åre">Åre</option>
              <option value="Falun">Falun</option>
              <option value="Stockholm">Stockholm</option>
            </select>


            <button style={{ margin: '0 0 0 0px' }}>Search</button>
          </form>
        </div>
      </div>
    )
  }
  /***************************************************
   
    Fordssymboler som visad vid vad för form av 
    resefordon som används vid resa
   
***************************************************/
  images(index, vehicleType) {
    let ind = index
    let img = vehicleType.map((vehicle, indexVehicle) => {
      if (ind === indexVehicle) {
        if (vehicle.kind === "train") {
          return <img key={indexVehicle} className="vehicle" src={train} alt="TrainIcon" />
          
        }
        if (vehicle.kind === "foot") {
          return <img key={indexVehicle} className="vehicle" src={walk} alt="TrainIcon" />
        }
        if (vehicle.kind === "bus") {
          return <img key={indexVehicle} className="vehicle" src={bus} alt="TrainIcon" />
        }
        if (vehicle.kind === "taxi") {
          return <img key={indexVehicle} className="vehicle" src={taxi} alt="TrainIcon" />
        }
        if (vehicle.kind === "car") {
          return <img key={indexVehicle} className="vehicle" src={car} alt="TrainIcon" />
        }
        if (vehicle.kind === "plane") {
          return <img key={indexVehicle} className="vehicle" src={plane} alt="PlaneIcon" />
        }
      }
    })
    return img
  }





  /***************************************************
       
          Skriver ut vilka stop som görs på resan
    
    ***************************************************/
  getStops(segment, placeType) {
    let stops = segment.stops
    
    let stops2 = stops && stops.map((stop, indexStops) => 
          <section key={indexStops}>
          <p class="line">
            <img className="vehicle2" src={runda} alt="RundaIcon" />
            {placeType[stop.place].shortName}
            </p>
        </section>

    )

    return stops2
  }
  /***************************************************
     
      Skriver ut lägsta och högsta pris i vald valuta
       
  ***************************************************/
  getPrices(route) {
    if (route.indicativePrices && route.indicativePrices[0].priceLow === undefined) {
      return (
        <section>
          <p>{route.indicativePrices[0].price} {route.indicativePrices[0].currency}</p>
        </section>
      )
    }
    else {
      return (
        <section>
          <p>{route.indicativePrices && route.indicativePrices[0].priceLow} - {route.indicativePrices && route.indicativePrices[route.indicativePrices.length - 1].priceHigh} {route.indicativePrices && route.indicativePrices[0].currency}</p>
        </section>
      )
    }
  }
  /***************************************************
     
       Skriver resutlat med alla stop med fordonsbild
       
  ***************************************************/
  getSegments(route, vehicleType, placeType) {
    let segments = route.segments&&route.segments.map((segment, indexSegment) =>
      
          <section key={indexSegment}>
        <div className="resaultBox">
          <h5>{this.images(segment.vehicle, vehicleType)} {placeType[segment.depPlace].shortName} - {placeType[segment.arrPlace].shortName}</h5>
          <div class="stops">
            {this.getStops(segment, placeType)}
          </div>
        </div>
      </section>
    )
    return segments
  }
  /***************************************************
     
       Skriver ut resultat lista för utresa med information 
       
  ***************************************************/

  routeOutward() {
    const routes = this.state.routes.length
      ? this.state.routes.map((route, indexRouteO) => {
        const vehicleType = this.state.vehicleOutward
        const placeType = this.state.placesOutward

        return (
          <div class="HowTo">
            <section key={indexRouteO}>
              <div class="accordion" id="accordionExample">

                <div class="card">
                  <div class="card-header" id="headingThree">
                    <h2 class="mb-0">
                    </h2>
                    <table class="table">
                      <thead>
                        <tr >
                          <th class="column1" scope="col">Stops</th>
                          <th class="column" scope="col">Transport</th>
                          <th class="column" scope="col">Distance in km</th>
                          <th class="column" scope="col">Duration </th>
                          <th>Prices</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th class="column1" scope="row">
                            <button id="expandButton" onClick={this.expandButton} class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={`#collapse${indexRouteO}`} aria-expanded="false" aria-controls="collapseThree">
                              +
                    </button>
                          </th>
                          <th class="column">{route.name}</th>
                          <th class="column">{route.distance}</th>
                          <th class="column">{this.convertMinsToHrsMins(route.totalDuration)}</th>
                          <th class="column">{this.getPrices(route)}</th>
                        </tr>
                      </tbody>
                    </table>



                  </div>

                  <div id={`collapse${indexRouteO}`} class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div class="card-body">

                      <Maps children={route.segments} places={placeType} />
                      {this.getSegments(route, vehicleType, placeType)}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      })
      : null

    return routes
  }
  /* const routes = this.state.routes.length
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
            
            </div>
          </section>
 
        )
      
      
    })
    : null
    
    return routes
} */
  routeReturn() {
    const routes = this.state.routes2.length
      ? this.state.routes2.map((route, indexRouteR) => {
        const vehicleType = this.state.vehicleReturn
        const placeType = this.state.placesReturn

        return (

          /***************************************************
            
              Skriver ut Återresan med infromation
              
         ***************************************************/
        <div class="HowTo">
        <section key={indexRouteR}>
          <div class="accordion" id="accordionExample">

            <div class="card">
              <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                </h2>
                <table class="table">
                  <thead>
                    <tr >
                      <th class="column1" scope="col">Stops</th>
                      <th class="column" scope="col">Transport</th>
                      <th class="column" scope="col">Distance in km</th>
                      <th class="column" scope="col">Duration </th>
                      <th>Prices</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th class="column1" scope="row">
                        <button id="expandButton" onClick={this.expandButton} class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={`#collapse${indexRouteR}`} aria-expanded="false" aria-controls="collapseThree">
                          +
                </button>
                      </th>
                      <th class="column">{route.name}</th>
                      <th class="column">{route.distance}</th>
                      <th class="column">{this.convertMinsToHrsMins(route.totalDuration)}</th>
                      <th class="column">{this.getPrices(route)}</th>
                    </tr>
                  </tbody>
                </table>



              </div>

              <div id={`collapse${indexRouteR}`} class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div class="card-body">

                  <Maps children={route.segments} places={placeType} />
                  {this.getSegments(route, vehicleType, placeType)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        
        )


                  </div>

                  <div id={`collapses${indexRouteR}`} class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div class="card-body">

                      <Maps children={route.segments} places={placeType} />
                      {this.getSegments(route, vehicleType, placeType)}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      })
      : null

    return routes
  }

  render() {
    const routesOutward = this.routeOutward()
    const routesReturn = this.routeReturn()
    return (
      /***************************************************
         
           Knapp om man vill resa tillbaka eller inte.
           
      ***************************************************/
      <main className="mainContentInnerGrid">
        {this.what()}
        <div className="how">

          {/* ID för att kunna hämta listan för resan */}
          <div>
            <h4 id="how"></h4>
            {routesOutward}</div>
          {this.state.visibility && <div><h4 id="how">Return trip</h4>{routesReturn}</div>}
        </div>
      </main>





    );

  }

}

export default MainContent