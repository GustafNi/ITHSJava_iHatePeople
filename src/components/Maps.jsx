import React from 'react';
import { Fragment } from 'react';
import { Component } from 'react';
import decodedPolyline from 'decode-google-map-polyline'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY



class Maps extends React.Component {
  render() {
    const segment = this.props.children
    const position1 = decodedPolyline(segment[0].path)[0]
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    
      <GoogleMap
        defaultZoom={8}
        defaultCenter={position1}
      >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}

        {segment.map((segment, index) => {
          let path = decodedPolyline(segment.path)
          return (
            <React.Fragment key={index}>
              <Polyline path={path}></Polyline>
              <Marker position={path[0]}></Marker>
              <Marker position={path.pop()}></Marker>
            </React.Fragment>
          )
        }
        )
        }
      </GoogleMap>
    ))

    return (
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
