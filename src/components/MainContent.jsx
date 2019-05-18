import React, { Component } from 'react';
import "./mainContent.css"
import train from '../img/train.png'
import { SSL_OP_ALL } from 'constants';
import currencySelect from './currencySelect.jsx'
/* lägg form i hela */

const key = 'S2Q8spaR'

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
      placesReturn: []
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
  images(index) {
    let ind = index
    let img = null
    if (ind === 0) {
      return <img className="vehicle" src={train} alt="TrainIcon" />
    }

  }
  placeName(index) {
    let ind = index
    let place = this.state.placesOutward.map((place, i) =>{
      if(ind === i){
        return place.shortName
      }
    }
    )
     return place  
  }

  getStops(segment,index){
    let stops = segment.stops
    let stops2 = stops && stops.map((stop, index)=>
    <section key={`${index}-react-key`}>
      {this.images(index)}
    <p>Stop {index+1}: {this.placeName(stop.place)}</p>
</section>
    )
    
    return stops2
  }

  getPrices(route){
    let indicativePrice = route.indicativePrices
    let prices = indicativePrice && indicativePrice.map((price, index) =>
      <section key={`${index}-react-key`}>
        <h5>{price.name}</h5>
        <p>{price.priceLow} - {price.priceHigh} {price.currency}</p>
      </section>
    )
    return prices
  }

  render() {
    const routes = this.state.routes.length
      ? this.state.routes.map((route, i) => {
        

        let segments = route.segments
        let segments2 = segments && segments.map((segment, index) =>
          this.getStops(segment,index)
          
        )




        return (

          <section key={`${i}-react-key`}>

            <div className="resaultBox">
            <h3>{route.name}</h3>
              <p>Distance in km: {route.distance}</p>
              <p>Traveltime in minutes: {this.convertMinsToHrsMins(route.totalDuration)}</p>
              <p>Duration {this.convertMinsToHrsMins(route.totalTransitDuration)}</p>
              <h3>Stops:</h3>
              {segments2}
              <h3>Prices:</h3>
              {this.getPrices(route)}
              
            </div>

          </section>

        )
      })
      : null
    const routes2 = this.state.routes2.length
      ? this.state.routes2.map((route, i) => {

        let segments = route.segments
        let segments2 = segments && segments.map((segment, index) =>
          this.images(segment.vehicle)
        )
        return (

          <section key={`${i}-react-key`}>

            <div className="resaultBox">
            {segments2}
              <h3>{route.name}</h3>
              <p>Distance in km: {route.distance}</p>
              <p>Traveltime in minutes: {this.convertMinsToHrsMins(route.totalDuration)}</p>
              <p>Duration {this.convertMinsToHrsMins(route.totalTransitDuration)}</p>
              {this.getPrices(route)}
              
            </div>

          </section>

        )
      })
      : null
    return (

      <main className="mainContentInnerGrid">
      
        {this.what()}

        <div className="how">
          <div><h1 id="how"></h1>{routes}</div>
          {this.state.visibility && <div><h1>Return trip</h1>{routes2}</div>}
        </div>


      </main>
    );

  }

}

export default MainContent