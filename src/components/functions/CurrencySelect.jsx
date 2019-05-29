import React, { Component } from '../../../node_modules/react'; 
export default function CurrencySelect(callback) {
  return (
    <div>
      <p>Currency</p>
      <select onChange={e => callback(e.target.value)}>
        <option value='USD'>USD</option>
        <option value="EUR">EUR</option>
        <option value="SEK">SEK</option>
      </select>
    </div>
  )
}