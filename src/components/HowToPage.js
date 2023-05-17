import React, { useEffect, useState, useContext, useRef } from "react";

// Other components:
import NavigationBar from "./NavigationBar.js";

// context
import {MenuContext} from "./Home.js"


export default function HowToPage({
    isThisPageActive, 
                                  }) {
// Consume the context:                                    
const bigIconsObject = useContext(MenuContext);

// The 
let renderThis

if (isThisPageActive) {
    renderThis = (
        <div>
        <div className="howToPageOuterContainer">
            
            <div className="howToPageHeaderContainer">
            <p className="howToPageHeader">How to complete challenges</p>
            </div>


            <div className="howToPageContainerOne"> {/*This is a grid container*/}

            <div>
            <p className="howToPageSectionHeader">How to plan a challenge</p>
            <p className="howToPageBodyText">Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here </p>
            </div>

            <div>
            <p className="howToPageSectionHeader">How to use your location</p>
            <p className="howToPageBodyText">Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here </p>
            </div>    

            <div>
            <p className="howToPageSectionHeader">How to complete a challenge</p>
            <p className="howToPageBodyText">Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here Text here </p>
            </div>

            </div>  {/*end div of className="howToPageContainerOne"*/} 

            </div>{/* end div of className="HowToPageOuterContainer" */} 

            {/* The navigation bar (which includes the plus-icon menu)*/}
            <NavigationBar iconsObject = {bigIconsObject.p1}/>
        
            </div>
    )
                      } // end if (isThisPageActive)


// If the parent component (ie <Home/>) 
// has set prop isThisPageActive to  
// false, don't render anything:
if (!isThisPageActive) {
    renderThis = null
                       } // end if



return (renderThis)



                                    }