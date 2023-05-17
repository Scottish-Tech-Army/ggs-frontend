import React, { useEffect, useState, useContext, useRef } from "react";

// images:
import goldStar from "../assets/images/goldStar.svg";
import silverStar from "../assets/images/silverStar.svg";
import bronzeStar from "../assets/images/bronzeStar.svg";


// context


// scss stuff:
import '../scss/style.scss';





export default function LeaderboardTable({
    dataForTable
                                        })
                                            {

//-------UTILITY FUNCTIONs-------
// A utility function to make a deep 
// copy of a passedin array:
function deepCopyArray(arrayArg){
    let arrayCopy = JSON.parse(JSON.stringify(arrayArg));
    return arrayCopy
                               }


// A utility function that adds a 
// key property and value to each object
// that is a member of an array objects:
function addKeysForMapFunction(arrayArg){
for (let i = 0; i < arrayArg.length; i++) {
    arrayArg[i].key = i;
                                          }
                                        }

//-------END UTILITY FUNCTIONs-------

// A function to look at the sorted array of objects 
// that represents a county's units and that gives units 
// that have scores equal to those of other units 
// the same rank as those units. This function returns 
// a similar array each (object) member of which has a new
// rank property. The value of that property
// depends on the value of the score property.
// Some object members will have the same 
// value for rank as they have the same value
// for score:
// Rank    unit       Challenges collected
// 1=      delta              7
// 1=      gamma              7
// etc
// This function takes as arg the sorted array
// of objects that represent a county's units.
/*
The sorted array lists units in order of rank
and looks like this:
        [
        {unitName: "theta", score: 7}, 
        {unitName: "neta", score: 7}, 
        {unitName: "beta", score: 6}, 
        {unitName: "alpha", score: 6}, 
        {unitName: "gamma", score: 4},
        {unitName: "zeta", score: 3},
        etc 
        ] 

and the following function must turn it into this:
        [
        {unitName: "neta", score: 7, rank: "1="},
        {unitName: "theta", score: 7, rank: "1="},
        {unitName: "alpha", score: 6, rank: "2="}, 
        {unitName: "beta", score: 6, rank: "2="},
        {unitName: "zeta", score: 3, rank: "3"},
                    etc 
        ] 
*/
function setEqualRanks(arrayArg){
    // Give first member object of arrayArg
    // a rank property of value "1":
    arrayArg[0].rank = 1
    let tempArray = deepCopyArray(arrayArg)
    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i+1]) {
            if (tempArray[i].score===tempArray[i+1].score) {
             tempArray[i+1].rank = tempArray[i].rank
                                                           } else {
                 tempArray[i+1].rank = tempArray[i].rank + 1
                                                                  }
                            }
                                               }
  return tempArray
                                  }
 
//--------------------------------------------------------     

let rowsList, sortedTableDataArray, countyName


/* The table looks like this:

Rank         Unit          Completed
                           Challenges
-------------------------------------
1 (gold      unit name A       9
start 
here)
2 (silver    unit name B       7
star)
3 (bronze    unit name C       5
star) 
4            unit  name D      4
4            unit  name E      4  

The if statement below creates array 
rowsList. Code in the return statement
will the contents of rowsList in the
the table, hence each rowsList member
contains jsx for a row of the table.
*/

// Populate array rowsList: 
// 1) Make a sorted array of the data in passed-in array 
// dataForTable. Sort according to \rowsListMember\.score.
// 2) add a rank property to each \rowsListMember\ so that 
// units with equal scores get the same rank
// 3) add gold, silver and bronze stars (<img/>s) to the units 
// that have rank 1, 2 and 3, respectively:
if (dataForTable) {
    let tempArray
    countyName = dataForTable.county
    // 1):
    sortedTableDataArray = dataForTable.units.sort((x, y) => (x.score < y.score) ? 1 : (x.score > y.score) ? -1 : 0);
    // 2)&3): 
    tempArray = setEqualRanks(sortedTableDataArray)
    addKeysForMapFunction(tempArray)
        rowsList = (tempArray.map((member)=>(
        <tr key = {member.key}>
            {member.rank === 1 ?
            <td>{<div className="tdDiv" ><p>1</p><img className="starImg"  src = {goldStar} ></img></div> }</td> : member.rank === 2 ? 
            <td>{<div className="tdDiv" ><p>2</p><img className="starImg"  src = {silverStar} ></img></div> }</td> : member.rank === 3 ?
            <td>{<div className="tdDiv" ><p>3</p><img className="starImg"  src = {bronzeStar} ></img></div> }</td> : 
            <td>{<div className="tdDiv" ><p>{member.rank}</p></div> }</td>
            }                                                                      
        <td><div className="tdDiv" ><p>{member.unitName}</p></div></td>
        <td><div className="tdDiv" ><p>{member.score}</p></div></td>
        </tr>
                                ))
        )
                 } // end if



return(
<div className="leaderboardTableOutermostContainer">

    <p className="leaderboardPageCountyName">
{countyName}
    </p>

<table className="leaderboardPageTable">
<thead>
<tr>
    <th className="thRank"  rowSpan="2"><div className="rankHead"><p className="rankHeadText" >Rank</p></div></th>
    <th className="thUnit"  rowSpan="2"><div className="unitHead"><p className="unitHeadText" >Unit</p></div></th>
    <th className="thCompleted"  rowSpan="2"><div className="completedHead"><p className="completedHeadText" >Completed <br/>Challenges</p></div></th>
</tr>
  
  </thead>
<tbody>   
  {rowsList}
  </tbody>    
</table>

</div>
)
                                            }