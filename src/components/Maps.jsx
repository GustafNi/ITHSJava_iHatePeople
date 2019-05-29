import React from 'react';
import {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

const decodedPolyline =  require('decode-google-map-polyline') 
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY


/* let departue1 = new cordinator(route.departuePlace.lat, route.departuePlace.Ing)
let departue2 = new cordinatoar(route.departuePlace.lat, route.departuePlace.Ing)
allDepartures = [];
allDepartures.push(departue1)
allDepartures.push(departue2)  */





class Maps extends Component {
    
    render () {      
       




/* const routesData = this.props.routes
console.log(routesData)
var segmentData = routesData.map(route => {
    var segments = route.segments; 
    console.log(segments)
    return segments  

}) */

// segmentData.map(segments => {
    //     segments.map(segment => {
        
        //         if(segment.segmentKind === "surface")
        //         decodedPolyline(segment.path).map(coord => {
            //             coords.push(coord)
            //         })
            //     })
            // }) 

const segments = this.props.children
const places = this.props.places
console.log(places)
// console.log(decodedPolyline(segments[0].path))

 let coords =[] 
 segments.map(segment => {
  if(segment.segmentKind === "surface") {
    decodedPolyline(segment.path).map(coord => 
            coords.push(coord)
        )
         
      }else {
        
        console.log("places", this.props.places[segment.depPlace], "segments:", segment.depPlace)
        let coord = {
          lat: this.props.places[segment.depPlace].lat,
          lng: this.props.places[segment.depPlace].lng,
        }

        coords.push(coord)
        coord = {
          lat: this.props.places[segment.arrPlace].lat,
          lng: this.props.places[segment.arrPlace].lng,
        }
        coords.push(coord)
      }
 })


const MyMapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultZoom={8}
    defaultCenter={coords[0]}
  >
    {/*  {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
     <Polyline path={coords}/> 
 

    <Marker position={coords[0]}/>
    <Marker position={coords.pop()}/>

  </GoogleMap>
))
        return(
<MyMapComponent
  isMarkerShown
  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>)

    }
}

export default Maps;
