import React, { Component } from '../../../node_modules/react';
import train from '../../img/train.png'
import bus from '../../img/bus.png'
import walk from '../../img/walk.png'
import car from '../../img/car.png'
import taxi from '../../img/taxi.png'
export default function Images(index, vehicleType) {
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