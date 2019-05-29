import GetPlaceName from './GetPlaceName.jsx'
import React, { Component } from 'react';
export default function GetStops(segment, placeType) {
    let stops = segment.stops

    let stops2 = stops && stops.map((stop, indexStops) =>
      <section key={indexStops}>
        <p>Stop {indexStops + 1}: {GetPlaceName(stop.place,placeType)}</p>
      </section>
    )

    return stops2
  }