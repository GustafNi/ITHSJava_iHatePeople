
import React from 'react';
import {Component} from 'react';
import players from './players';

class MyTable extends Component{

  constructor(props){
    super(props);
    this.state = {expandedRows: []};
  }

  handleExpand = (player) =>{
    let newExpandedRows = [...this.state.expandedRows];
    let allExpanded = this.state.allExpanded;
    let idxFound = newExpandedRows.findIndex((id)=>{
        return id === player.id;
    });

    if(idxFound > -1){
        console.log("Collapsing " + player.firstName + " " + idxFound);
        newExpandedRows.splice(idxFound, 1);
    }
    else{
      console.log("Expanding " + player.firstName);
      newExpandedRows.push(player.id);
    }

    console.log("Expanded rows");
    console.log(newExpandedRows);

    this.setState({expandedRows: [...newExpandedRows]});
  }

  isExpanded = (player)=>{
    const idx = this.state.expandedRows.find(
      (id)=>{
        return id === player.id;
      }
    );

    return idx > -1;
  }

  expandAll=(players)=>{
    console.log("ExapndedRows: " + this.state.expandedRows.length);
    console.log("Players:      " + players.length);
    if(this.state.expandedRows.length === players.length){

      let newExpandedRows = [];
      this.setState({expandedRows: [...newExpandedRows]});
      console.log("Collapsing all...");
    }
    else{
      let newExpandedRows = players.map(
        player => player.id
      );
      this.setState({expandedRows: [...newExpandedRows]});   
      console.log("Expanding all...");
      console.log("Expanded rows " + newExpandedRows.length)
    }
  }

  getRows = (player)=>{
    
    let rows = [];
    
    const firstRow = (
      <tr onClick={()=>this.handleExpand(player)}>
        <td >
        <button>
        {this.isExpanded(player) ? "-" : "+"}
        </button>
        </td>
        <td>{player.firstName}</td>
        <td>{player.lastName}</td>
        <td>{player.team}</td>
      </tr>
    )

    rows.push(firstRow);

    if(this.isExpanded(player)){
      const detailRow = (
          <tr className="player-details">
            <td colspan="4" className="player-details">
              <br/>
              <div className="attribute">
                <div className="attribute-name">Height: </div>
                <div className="attribute-value">{player.stats.height}</div>
              </div>
              <br/>
              <div className="attribute">
                <div className="attribute-name">Weight: </div>
                <div className="attribute-value">{player.stats.weight}</div>
              </div>
              <br/>
              <div className="attribute">
                <div class="attribute-name">College: </div>
                <div className="attribute-value">{player.college}</div>
              </div>
              <br/>
            </td>
          </tr>
        );
      rows.push(detailRow);
    }

    return rows;
  }

  getPlayerTable = (players)=>{

    const playerRows = players.map((player)=>{
      return this.getRows(player);
    });

    return (
      <table className="my-table">
        <tr>
          <th onClick={()=>this.expandAll(players)}>
            <button >
             {players.length === this.state.expandedRows.length ? "-" : "+"} 
            </button>
        </th>
          <th>Firstname</th>
          <th>Lastname</th> 
          <th>Team</th>
        </tr>
        {playerRows}
      </table>
    );
  }

  render(){
   return ( 
     <div>
       {this.getPlayerTable(players)}
     </div>
     ); 
  }
}

export default MyTable;