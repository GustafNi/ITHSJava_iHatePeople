import React, { Component } from 'react'; 

class currencySelect extends Component {
  render(){
return(
      <div>
        <p>Currency</p>
        <select onChange={e => this.props.setChangedCB(e.target.value)}>
          <option value='USD'>USD</option>
          <option value="EUR">EUR</option>
          <option value="SEK">SEK</option>
        </select>
      </div>
)}
}
export default currencySelect