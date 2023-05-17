import React, { useEffect, useState, useContext, useRef } from "react";

// Other components:
import NavigationBar from "./NavigationBar.js";
import LeaderboardTable from "./LeaderboardTable.jsx";
import SearchForm from "./SearchForm.jsx";

// context
import {MenuContext} from "./Home.js"

// scss stuff:
import '../scss/style.scss';





export default function LeaderboardPage({
    isThisPageActive
                                        })
                                            {

// a utility function to deep copy an array:
function deepCopyArray(arrayArg){
    let arrayCopy = JSON.parse(JSON.stringify(arrayArg));
    return arrayCopy
                                }


// A ref to hold a boolean that determines 
// whether or not code should render the table:
const showTable = useRef(false)



// Mock data from the server. Each region shows 
// only the three made-up units alpha, beta and gamma:
let fetchedTableData = [
{county: "Aberdeenshire", units: [{unitName: "Aberdeenshire unit eta seven seven eight eight eight", score: 4}, {unitName: "Aberdeenshire unit zeta seven seven eight eight eight", score: 4}, {unitName: "Aberdeenshire unit epsilon seven seven eight eight eight", score: 1}, {unitName: "Aberdeenshire unit delta seven seven eight eight eight", score: 1}, {unitName: "Aberdeenshire unit alpha seven seven eight eight eight", score: 6}, {unitName: "Aberdeenshire unit beta seven seven eight eight eight", score: 4}, {unitName: "Aberdeenshire unit gamma seven seven eight eight eight", score: 5} ] },
{county: "Angus",         units: [{unitName: "eta", score: 1}, {unitName: "zeta", score: 8}, {unitName: "epsilon", score: 4}, {unitName: "delta", score: 9},{unitName: "alpha", score: 3}, {unitName: "beta", score: 7}, {unitName: "gamma", score: 2} ] },
{county: "Argyll",        units: [{unitName: "eta", score: 6}, {unitName: "zeta", score: 4}, {unitName: "epsilon", score: 7}, {unitName: "delta", score: 3},{unitName: "alpha", score: 1}, {unitName: "beta", score: 2}, {unitName: "gamma", score: 7} ] },
{county: "Ayrshire",      units: [{unitName: "eta", score: 2}, {unitName: "zeta", score: 8}, {unitName: "epsilon", score: 2}, {unitName: "delta", score: 6},{unitName: "alpha", score: 6}, {unitName: "beta", score: 6}, {unitName: "gamma", score: 9} ] },
{county: "Banffshire",    units: [{unitName: "eta", score: 7}, {unitName: "zeta", score: 5}, {unitName: "epsilon", score: 3}, {unitName: "delta", score: 2},{unitName: "alpha", score: 9}, {unitName: "beta", score: 2}, {unitName: "gamma", score: 7} ] },
{county: "Berwickshire",  units: [{unitName: "eta", score: 4}, {unitName: "zeta", score: 1}, {unitName: "epsilon", score: 8}, {unitName: "delta", score: 5},{unitName: "alpha", score: 3}, {unitName: "beta", score: 7}, {unitName: "gamma", score: 5} ] }
                       ]

// This component passes a reference to the 
// following function to <SearchForm/> as a 
// prop. The form submit handler in <SearchForm/>
// calls this function, passing in a string 
// for the county the user typed or clicked on/
// tapped in the dropdown list in <SearchForm/>.
// This function must:
// 1) fetch from the backend the object that 
// represents the county, its units and their 
// scores (here fetchedTableData is a mock up 
// of the data the backend will hold).
// 2) Set state property countyRankingsForTable
// to this object.
// 3) set ref showTable to true


//populate the table with the data
function populateTheTable(countyName){
// 1):    
// console.log(`In fn populateTheTable() in <LeaderboardPage/>. The county rxed is: ${countyName}`)
let countyRankings = getCountyRankings(countyName)
// console.table(countyRankings)
// 

// 2):
setCountyRankingsForTable(countyRankings)
// countyRankingsForTable is now an object that looks like this:
// {county: "Ayrshire", units: [{unitName: "alpha", score: 6}, {unitName: "beta", score: 6}, {unitName: "gamma", score: 9} ] }

// 3):
showTable.current = true
                                     }



// A function that populateTheTable calls to get 
// table data from the server:
function getCountyRankings(countyName){
    let countyRankings
    for (let i = 0; i < fetchedTableData.length; i++) {
        if (countyName === fetchedTableData[i].county) {
            countyRankings = fetchedTableData[i]
                                                       }
                                                      }
    return countyRankings
                                      }



// The state property to hold the data that will 
// go in the table once code has fetched the data:
const [countyRankingsForTable, setCountyRankingsForTable] = useState()



    // Consume the big object
    const bigIconsObject = useContext(MenuContext);


let renderThis
if (isThisPageActive) {

    renderThis = (
    <div>
    <div className="leaderboardPageOuterContainer" >
    {/* This div contains three divs:
    1) div className="leaderboardPageContainerOne"
    This contains the div that contains the <p>
    for text "Digital Safari Leader Board"

    2) div className="leaderboardPageContainerTwo"
    This contains component <SearchForm/> 
    
    3) div className="leaderboardPageContainerThree"
    This contains a div that contains the table.
    */}
    


    {/*  1):   */}
    <div className="leaderboardPageContainerOne">
        <div className="leaderBoardPageHeaderContainer">
    <p className="leaderBoardPageHeader">Leaderboard</p>
    </div>
    </div>
    


    {/*  2):   */}
    <div className="leaderboardPageContainerTwo">
        <SearchForm passCountyToLeaderboardPage = {populateTheTable}/>
    </div>


    <>
    {showTable.current ? 
    <div className="leaderboardPageContainerThree">
    <LeaderboardTable dataForTable = {countyRankingsForTable} />    
    </div>   
    : null}
    </>

{/* xxx*/}     
    


    
    </div> {/* end leaderboardPageOuterContainer*/}
    
    {/* The navigation bar (which includes the plus-icon menu)*/}
    <NavigationBar iconsObject = {bigIconsObject.p5}/>
    
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