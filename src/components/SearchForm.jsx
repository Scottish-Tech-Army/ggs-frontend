import React, { useEffect, useState, useContext, useRef } from "react";

// scss stuff:
import '../scss/style.scss';

// images:
import magGlass from "../assets/images/magnifyingGlass.svg";

/* This component renders:     
    i)   a div containing a <p> for text "Choose a County"
    ii)  a div containing the search form
*/         

export default function SearchForm({
passCountyToLeaderboardPage    
                                   })
                                            {


// a utility function to deep copy an array:
function deepCopyArray(arrayArg){
    let arrayCopy = JSON.parse(JSON.stringify(arrayArg));
    return arrayCopy
                               }



let allCountiesList = [
    {region: "Aberdeenshire", key: "1"},
    {region: "Angus", key: "2"},
    {region: "Argyll", key: "3"},
    {region: "Ayrshire", key: "4"},
    {region: "Banffshire", key: "5"},
    {region: "Berwickshire", key: "6"}
                      ]



// A state property to hold the array that will contain
// either a filtered or unfiltered list of counties.
// This is what code passes in as props to <RegionsList>:
const [countiesForRegionsList, setCountiesForRegionsList] = useState()


// A ref to hold the filtered region data:
const filteredCounties = useRef()



// A ref to hold showRegionsList
// (boolean that code in the return statement reads 
// to determine whether to show component 
// <RegionsList/> or not). When the user clicks 
// in the search field, <RegionsList/> shows 
// as the click handler sets showRegionsList
// to true:
let showRegionsList = useRef(false)


/*
When the search field attracts focus the component
<RegionsList/> shows. At this stage it shows all 
the counties.


When the user starts typing in the search input field,
the list of counties appears and gets filtered as 
the user types. 

Filtering process:

1) User clicks in search input.
React supports three events for forms in addition to standard React DOM events:
onChange: Fires on each keystroke, not only on the loss of focus.
onInput: Fires for each change in <textarea> and <input> element values. React team doesn’t recommend using this.
onSubmit: Fires when the form is submitted, usually by pressing enter.

a) code changes ref showRegionsList.current, a boolean that determines 
whether the dropdown shows or not.
b) There must be a state property that code changes that holds the 
array of counties that will appear in the dropdown. To begin with
this array is empty. as the user types, the array changes to include 
only those counties whose initial letters match the typing.

Also: use a <form> and the onSubmit event!

2) user types in input field. in response to onKeyDown a handler shows the dropdown
   (which had been invisible or not rendered), which contains only those counties 
   whose initial letters match the typing

   the onKeyDown handler 
   i) looks at the typed-in text and compares it with 
   letters at the beginning of each member of array countiesList
   (an ordinary variable that holds all of the county names).
   ii) saves in ref array filteredCounties.current only those objects from the regions data 
   array that have the same text at the beginning as the user has
   typed. Actually what gets saved is jsx involving divs and stuff
   iii) the handler saves this list in state property xxxx, which makes the dropdown render. 
   
3) if the user clicks on one of the elements in the saved list
that name pops into the search field, hence each element in 
ref array filteredCounties.current must have a click handler.
That click should also trigger the onBlur handler of the input, which must 
make the dropdown disappear by doing this:
ref showRegionsList.current = false
and setting the 
4) user then taps the magnifying glass icon, which triggers the form's onSubmit event, 
whose handler fetches data for that region and this populates the table.
loss of focus on the input makes the dropdown disappear
*/



// The onClick handler of the divs that
// contain the county names in the 
// dropdown list.
// This fn must:
// 1) Put the county name into the input
// 2) Make the dropdown disappear
function selectCountyFromDropDown(countyName){
//    console.log(`In div onClick handler. You selected county ${countyName}`)
    // 1&2):
    makeListDisappear(countyName)
                                   }



// The onBlur handler for the search field.
// This makes the list of filtered/unfiltered
// region data disappear.
// This function must:
// 1) set stateObj.typedtext to the selected
//    county (to make the county name appear
//    in the input)
// 2) set showRegionsList.current to false
// to make the dropdown list disappear:
function makeListDisappear(countyName){
// 1):
setStateObj(
    {
        typedText: countyName,
        filteredCounties: []   
    }
)
// 2):
showRegionsList.current = false
                                      }




// The onFocus handler for the search field (the input of 
// className = "countyInput". This handler must:
// 1)   Put all the counties into 
//      stateObj.filteredCounties
// 2)   Show <RegionsList/>
function showAllRegionsList(e){
    // console.log(`The inout just gained focus!`)
    // 1) copy array countiesList into regionData.current
    showRegionsList.current =true    
    setStateObj(
        {
            typedText: '',
            filteredCounties: deepCopyArray(allCountiesList)   
        }   
               )
                              } // end displayRegionsList
    

// Two state properties to hold 
// i)  what the user types in
// ii) the filtered list of counties:
// const [typedText, setTypedText] = useState()
const [stateObj, setStateObj] = useState({
    typedText: '',
    filteredCounties: []
                                         })

// The onChange handler for the input of 
// className = "countyInput". This must:
//  1)   get what the user has typed in the input
//  2)   compare the typed-in text with the text of 
//       each member of array allCountiesList. If the
//       typed-in text is in any member of countiesList at 
//       position 0 save that member object to array
//       newArray.
//  3)   set showRegionsList to true.
//  4)   pass newArray to RegionsList as props.
//  5)   Change state property typedText to what was typed in
function displayFilteredRegionsList(e){
    
    let newArray = []
    // 1):
    let typedInText = e.target.value
    // 2): 
    // array allCountiesList has members like this: {region: "Aberdeenshire", key: "1"},
for (let i = 0; i < allCountiesList.length; i++) {
    let county = allCountiesList[i].region.toUpperCase();
    if (county.includes(typedInText.toUpperCase())) {
        newArray.push(allCountiesList[i])
                                      } // end if
                                                 } // end for
// 3):                                                
showRegionsList.current =true
// 5):
setStateObj({
    typedText: typedInText,
    filteredCounties: deepCopyArray(newArray) // just 'newArray' would probably have sufficed here!
        })
// 4):
//setCountiesForRegionsList(deepCopyArray(newArray))
                             } // end displayFilteredRegionsList
                      


// A function that gets passed to <RegionsList/>
// as props. When the user clicks a county in   
// <RegionsList/> code in that component calls 
// this funtion with an argument that is a string  
// for the county name.
// This function must:
// 1) pass the string for the county name 
// to component <LeaderboardTable/>
function passCountyToParent(countyName){
passCountyToLeaderboardPage(countyName)
                                        } // end fetchCountyData 
/*
countyArray will hold an object containing
the county name, and the units and their scores,
like this:
{county: "Aberdeenshire", units: [{unitName: "alpha", score: 6}, {unitName: "beta", score: 4}, {unitName: "gamma", score: 5} ] },

//1):
let countyArray = []
fetchedTableData.map((member)=>{
    (member.county === countyName) ? countyArray.push(member) : void(0)
                               })

//2):
*/

// A function that puts the clicked on 
// county name into the input.
// This fn must:
// 1) rx the name of the county
// 2) change state property stateObj so that the 
//    name of the county goes into the input
// 3) make the dropdown list disappear
function putCountyNameInInput(countyName) {
console.log(`Inside putCountyNameInInput. You chose county ${countyName}`)

// 1)&2)&3):
setStateObj(
    {
        typedText: countyName,
        filteredCounties: []   
    }
            )
                                          }



// Now create var countiesToDisplay and set it to 
// an array whose members each comprise JSX for a
// menu item for the dropdown menu. Each menu item 
// is a div with text in it that shows one option
// from the menu:
const countiesToDisplay = (
    stateObj.filteredCounties.map((member)=>(
        
            <li key = {member.key} >
    <div className="regionsListItem" onClick = {()=> selectCountyFromDropDown(member.region) }>
    <p className="regionsListText">
    {member.region}     
    </p>
    </div>
    </li>

    )
    )
    )


// The handler for the form submit event.
// This function must:
// 1) prevent the default behaviour of the form of
//    reloading the page
// 2) send the string for the county the user selected
//    to <LeaderboardPage/>, where a function 
//    will make a fetch() call to get the 
//    data for the county from the backend and send that 
//    data to <LeaderboardTable/>
function handleSubmit(e){
    // 1):
    e.preventDefault() 
    // 2) 
    passCountyToLeaderboardPage(stateObj.typedText)
    // console.log(`You clicked the mag glass and the county chosen is: ${stateObj.typedText}`)
                       }


return (
/*
This component contains three divs:
1) A div containing the <p> for text "Choose a County"
2) The form, including the search input
3) The div containing component <RegionsList> 
*/


<div className="searchFormOutermostContainer"> 
{/* 
The div above contains one div of 
className="searchFormContainerOne",
which contains two divs:
i)   div className="searchFormTextContainer"
        This contains a <p> of className="leaderBoardPageTableHeader"
ii)  div className="searchFormSearchContainer"
        This contains a <form> of className="formElement"
*/}  


{/* 
This div contains two divs:
1) div className="searchFormTextContainer"
2) div className="searchFormSearchContainer"
*/}
<div className="searchFormContainerOne">
  


   {/* 1): The div containing the <p> for text "Choose a County" */} 
    <div className="searchFormTextContainer">
        <p className="leaderBoardPageTableHeader">Choose a County</p>
    </div>


   {/* 2): The form, including the search input and mag glass image */} 
    <div className="searchFormSearchContainer">
    
    <form className="formElement" onSubmit={(e)=> handleSubmit(e)}>
    
    <input 
    className="countyInput" 
    name = "searchForCountyData"
    type="search" 
    value={stateObj.typedText} // use of value makes this what React calls a controlled input
    onChange={displayFilteredRegionsList}
    // onKeyDown={displayFilteredRegionsList}
    placeholder="Type here/select below"
    onFocus = {showAllRegionsList} // user clicks in input and all counties show in the dropdown list
    // onBlur={makeListDisappear} // interferes with clicking of county divs, so don't use
    />

    
    <div className="submitButtonEnclosingDiv">
    <img className="magGlassImg" src={magGlass}>
    </img>
    <input className="submitButton" type="submit">
    </input>
    </div>
    
    </form>


{/* Conditionally show/hide the dropdown list */}
<div className= {showRegionsList.current ? " showDDlist" : " hideDDlist"}>  
  
<ul className="countiesList">
{countiesToDisplay}
</ul>

</div>


    </div> {/* End div of className="searchFormSearchContainer" */} 
   

</div> {/* End div of className="searchFormContainerOne" */}     
    

</div>
        )
                                            }                                                
