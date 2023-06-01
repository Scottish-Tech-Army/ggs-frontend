import React, { useState, useContext } from "react";

// Other components:
import NavigationBar from "./NavigationBar.js";


// context
import {MenuContext} from "./Home.js"
import { authContext } from "../contexts/AuthContext";

// Stuff to do with the leaderboard (NOTE: change the names of 
// every module or function that contains "Leaderboard" so that 
// the names reflect the fact that this page is to do with 
// showing completed challenges)
import { getCompletedChallenges } from "../services/completedChallenges.js";




export default function CompletedChallengesPage({
    isThisPageActive
                                                })
                                            {

// Two vars used by function makeTableRows:
let rowsList, sortedTableDataArray


// Mukund: Get the unit object from <AuthContext>:
const { unit } = useContext(authContext);
// console.log(`<Inside CompletedChallengesPage/> and unit is: ${JSON.stringify(unit)}`)

    // Consume the big object
    const bigIconsObject = useContext(MenuContext);

// create a state property to hold the 
// array of collected locations:
const [complChallenges, setComplChallenges] = useState();

// A function to get the leaderboard array
const retrieveCompletedChallenges = () =>{

  // console.log(`Inside retrieveCompletedChallenges. The data returned from the backend is ${getCompletedChallenges(unit.email)}`)

  // getCompletedChallenges(unit.email).then(setComplChallenges)
  // setComplChallenges(getCompletedChallenges(unit.email)) 
  // getCompletedChallenges(unit.email).then(result => {setComplChallenges(result) }) 
  getCompletedChallenges(unit.email).then(result => {makeTableRows(result) }) 
  // result above is an array containing objects, like this: [{area:"Watford, Hertfordshire", percentageCollected: 50}]



                                    }


/*
The table is going to look like this:

Area       Percent collected
Watford       50%
London        25%
Wigan         12%
*/

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

function makeTableRows(dataArray){
if (dataArray.length > 0) {
  sortedTableDataArray = dataArray.sort((x, y) => (x.percentageCollected < y.percentageCollected) ? 1 : (x.percentageCollected > y.percentageCollected) ? -1 : 0);
    addKeysForMapFunction(sortedTableDataArray)
        rowsList = (sortedTableDataArray.map((member)=>(
        <tr key = {member.key}>
        <td><div className="tdDiv" ><p>{member.area}</p></div></td>
        <td><div className="tdDiv" ><p>{member.percentageCollected}</p></div></td>
        </tr>
                                ))
        )
                           } // end if
    setComplChallenges(rowsList)
                        }








let renderThis

if (isThisPageActive) {

renderThis = (
  <div> 
<div className="completedPageOuterContainer" >



    {/*A button that the user clicks to show the completed challenges*/}
<div className="largeButton1New positionButton" onClick={()=>{retrieveCompletedChallenges()}}>
  <p className="buttonOperable">Show completed challenges</p>
</div>    


<div className="completedPageMainContainer" >

<h1>My completed challenges</h1>
{/* Here this component uses the same CSS styles as <LeaderboardPage/> uses*/}
<div className="leaderboardTableOutermostContainer">

<table className="leaderboardPageTable">
<thead>
<tr>
    <th className="thRank"  rowSpan="1"><div className="rankHead"><p className="rankHeadText" >Area</p></div></th>
    <th className="thUnit"  rowSpan="1"><div className="unitHead"><p className="unitHeadText" >% collected</p></div></th>
</tr>
</thead>
<tbody>   
  {complChallenges}
  </tbody>    
</table>

</div>


{/*
  ((complChallenges && complChallenges.length === 0) || !complChallenges) && (
    <div>
      Collect some locations for them to appear on the leaderboard.
    </div>
  )
*/}

       
    

</div> {/* end completedPageMainContainer*/}

</div> {/* end completedPageOuterContainer */}

{/* The navigation bar (which includes the plus-icon menu)*/}
<NavigationBar iconsObject = {bigIconsObject.p4}/>

</div> 
             ) 
                      } // end if (isThisPageActive)

                      
if (!isThisPageActive) {
    renderThis = null
                       } // end if

    

    return (
<div>
{renderThis}
</div>
           )










                                            }