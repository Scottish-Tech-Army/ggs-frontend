import React, { useEffect, useState, useContext, useRef } from "react";

// Other components:
import NavigationBar from "./NavigationBar.js";

// context
import {MenuContext} from "./Home.js"



export default function UserGuidePage(
        {
        isThisPageActive
        }
                                    )
                                    {

// Consume the big object
const bigIconsObject = useContext(MenuContext);


let renderThis


if (isThisPageActive) {

renderThis = (

<div> 
<div className="userGuidePageOuterContainer"> {/* The outermost container */}

<div className="userGuidePageHeaderContainer">
<p className="userGuidePageHeader">How to use the app</p>
</div>

<div className="userGuidePageContainerOne"> {/* This is a grid */}
<div>
<p className="userGuidePageSectionHeader">Plan a Route </p>
<p className="userGuidePageBodyText">
To help you plan a route, open ‘Challenges near me’ to open a map and click ‘Go’. 
The app will zoom in on your current location.
<br></br>
<br></br>
Move around the map to find challenges near you. These are indicated by a blue marker on the map. 
</p>
</div>

<div>
<p className="userGuidePageBodyText">
Pinch your fingers in and out to zoom in and out of the map to find more challenges and plan your route. 
<br></br>
<br></br>
Click on a blue marker to read more information about the site.
</p>    
</div>

<div>
    <p className="userGuidePageSectionHeader">Complete a Challenge</p>
<p className="userGuidePageBodyText">
Head to the first challenge on your planned route. 
<br></br>
<br></br>
When you are within 20 meters of the challenge, it will be collected automatically, and you will be able to reveal the challenge. 
<br></br>
<br></br>
If you are not close enough, you will be asked to move closer to the challenge location. 
</p>
<p className="userGuidePageSectionHeader">Check Your Progress</p>
<p className="userGuidePageBodyText">
If a marker is pale blue it means you have completed the challenge. If it's dark blue it means you have yet to do so.
<br></br>
<br></br>
A unit's completed challenges will appear on the Completed Challenges page.
</p>


</div>
</div>{/* end userGuidePageContainerOne */}

 </div> {/* end userGuidePageOuterContainer */}

{/* The navigation bar (which includes the plus-icon menu)*/}
<NavigationBar iconsObject = {bigIconsObject.p3}/>

</div>
    ) 
              } // end if isThisPageActive

                      
// If the parent component (ie <Home/>) 
// has set prop isThisPageActive to  
// false, don't render anything:
if (!isThisPageActive) {
    renderThis = null
                       } // end if

    

    return (
<div>
{renderThis}
</div>
           )


} // end HowToPage