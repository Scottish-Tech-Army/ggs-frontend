import React, { useEffect, useState, useContext } from "react";

// Other components:
import NavigationBar from "./NavigationBar.js";


// context
import {MenuContext} from "./Home.js"
import { authContext } from "../contexts/AuthContext";

// Stuff to do with the leaderboard (NOTE: change the names of 
// every module or function that contains "Leaderboard" so that 
// the names reflect the fact that this page is to do with 
// showing completed challenges)
import { getLeaderboard } from "../services/leaderboard";




export default function CompletedChallengesPage({
    isThisPageActive
                                                })
                                            {


// Mukund: Get the unit object from <AuthContext>:
const { unit } = useContext(authContext);
// console.log(`<Inside CompletedChallengesPage/> and unit is: ${JSON.stringify(unit)}`)

    // Consume the big object
    const bigIconsObject = useContext(MenuContext);

// create a state property to hold the 
// array of collected locations:
const [leaderboard, setLeaderboard] = useState();

// A function to get the leaderboard array
const getCompletedChallenges = () =>{
    getLeaderboard(unit.email).then(setLeaderboard)
                                    }



let renderThis

if (isThisPageActive) {

renderThis = (
<div className="completedPageOuterContainer" >



    {/*A button that the user clicks to show the completed challenges*/}
<div className="largeButton1New positionButton" onClick={()=>{getCompletedChallenges()}}>
  <p className="buttonOperable">Show completed challenges</p>
</div>    


<div className="completedPageMainContainer" >

<h1>My completed challenges</h1>
{
(leaderboard && leaderboard.length > 0) && 
(
    <ol className="list-group list-group-numbered">
      {leaderboard
        .sort((a, b) =>
          a.percentageCollected < b.percentageCollected ? 1 : -1
        )
        .slice(0, 10)
        .map((data, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
          >
            {data.area}
            <span className="badge bg-primary rounded-pill">
              {data.percentageCollected}%
            </span>
          </li>
        ))}
    </ol>
  ) 
  ((leaderboard && leaderboard.length === 0) || !leaderboard) && (
    <div>
      Collect some locations for them to appear on the leaderboard.
    </div>
  )}


       
    

</div> {/* end completedPageMainContainer*/}

{/* The navigation bar (which includes the plus-icon menu)*/}
<NavigationBar iconsObject = {bigIconsObject.p4}/>

{/* end completedPageOuterContainer follows*/}
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