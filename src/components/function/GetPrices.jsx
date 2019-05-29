import React, { Component } from '../../../node_modules/react';
export default function GetPrices(route) {
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