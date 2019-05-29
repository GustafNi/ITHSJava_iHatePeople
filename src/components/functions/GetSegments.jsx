import React, { Component } from '../../../node_modules/react';
import Images from './Images.jsx'
import GetStops from './GetStops.jsx'
export default function getSegments(route, vehicleType,placeType) {    
  let segments = route.segments.map((segment, indexSegment) => 
      <section key={indexSegment}>
        <div className="resaultBox">
          {Images(segment.vehicle, vehicleType)}
          {GetStops(segment,placeType)}
        </div>
      </section>
  )
  return segments
}