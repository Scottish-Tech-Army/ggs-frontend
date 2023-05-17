import React, { useEffect, useState, useContext, useRef } from "react";

// Images:
import plusPic from "../assets/images/moreIcon.svg";

// Other stuff
// import MenuContext from "./Home.js"

// Components:
import SquareButton from "./SquareButton";



/*
Four of the ive components that represent pages of the 
app call component <NavigationBar/>, 
which calls the component we are in (<PlusMenu/>). 

There are two main parts to this component:

1)  a plus('+') icon, which has an onClick 
    whose handler is toggleMenu(), which 
    simply inverts the value of state 
    property shouldMenuShow (a boolean). Depending
    on this value the pop-up menu appears or 
    disappears.

2)  four buttons (actually divs) that each contains
    an icon. The user clicks the icon to go to the
    page it represents (but never the landing 
    page).
    

<NavigationBar/> passes these props in to this component:
i)  a value for the src for each button's
    icons (eg icon3src)
ii) a value for a click handler for each button
    (eg icon2ClickHandler)

If state property shouldMenuShow is true:
i)   code applies a specific css style to the div that 
     contains the four icons. This style makes the div
     grow to such a size that the user sees the four icons
     and the plus icon
ii)  code applies a specific css style to each div that 
     contains an icon. This style changes the height of 
     that div (from 0px) so that the icon appears 

If state property shouldMenuShow is false:
i)   code applies a specific css style to the div that 
     contains the four icons. This style sets the div's
     height so that only the plus icon is visible
ii)  code applies a specific css style to each div that 
     contains an icon. This style changes the height of 
     the div to 0px so that the icon disappears

*/


export default function PlusMenu({iconsObject} ){
//    const iconsObject = useContext(MenuContext);

/*
// Styles to apply conditionally to the div that contains 
// the four buttons (actually divs) that contain the 
// icons:     
    const showMenu = {
        
        height: '290px',
        alignSelf: "flex-end",
        transition: "0.2s ease-in-out"
                      };

    const hideMenu = {
        
        height: "100%",
        transition: "0.05s linear"
                       };

// This style makes the <SquareButton/>
// grow in height so that it shows its
// enclosed img:
const showIconContainer = {
  borderWidth: "1px",
  borderColor: '#0161b4e',
  borderStyle: 'solid',
  backgroundColor: '#00a7e5',
  
                          }

// This style makes the <SquareButton/>
// shrink in height to 0px so that it 
// disappears:
const hideIconContainer = {
  borderWidth: "0px",
  borderColor: 'none',
  borderStyle: 'none',
  backgroundColor: '#none',
  height: "0px",
  width: '0px',  
  
                          }
*/




// Create state property shouldMenuShow that will have 
// these values:
// 0 when the app loads.
// 1 when the user clicks the plus menu to collapse it
// 2 when the user clicks the plus menu to enlarge it
const [shouldMenuShow, setShouldMenuShow] = useState(0)


// The onClick handler for the plus icon.
// This makes the plus icon enlarge or 
// collapse:
const toggleShouldMenuShow = () => {
    // If the app has first loaded
    // and the user clicks the plus 
    // icon make the menu show:
    if (shouldMenuShow === 0) {
        setShouldMenuShow(2)
                              }

    // If the menu is in its collapsed 
    // state and the user clicks the plus 
    // icon make the menu show:
    if (shouldMenuShow === 1) {
        setShouldMenuShow(2)
                              }

    // If the menu is in its enlarged 
    // state and the user clicks the plus 
    // icon make the menu vanish:
    if (shouldMenuShow === 2) {
        setShouldMenuShow(1)
                              }
                                   } // end toggleMenu


    return (
                       
        <div 
        className = {shouldMenuShow === 0 ? 
            "plusMenuOuterContainer plusMenuOnAppLoad" :
            shouldMenuShow === 1 ?  
            "plusMenuOuterContainer hidePlusMenu" : 
            "plusMenuOuterContainer showPlusMenu"  
                    }
        >
         {/* When the user clicks the plus icon the 
        height of the div above (which contains the 
        plus icon and the other four icons) either 
        i) grows so that all five icons show or 
        ii) shrinks so that only the plus icon shows.   
        */}   

        {/* When the user clicks the plus icon the 
        height of the containing div of each of the
        four icons expands or contracts to zero:   
        */}
        {/* button 1, comprising a div and in it an icon (an img)*/}
        <SquareButton
            imgSRC = {iconsObject.icon1src}
            divCSSclass = {(shouldMenuShow === 0 || shouldMenuShow === 1) ? "hideIconContainer" : "showIconContainer"}
            imgClickHandler = {iconsObject.icon1ClickHandler}
            altText = {"Clicking this button takes the user to one of the pages of the app"}
        />
        
        {/* button 2 -- just like button 1*/}
        <SquareButton
            imgSRC = {iconsObject.icon2src}
            divCSSclass = {(shouldMenuShow === 0 || shouldMenuShow === 1) ? "hideIconContainer" : "showIconContainer"}
            imgClickHandler = {iconsObject.icon2ClickHandler}
            altText = {"Clicking this button takes the user to one of the pages of the app"}
        />

        {/* button 3 -- just like button 1*/}
        <SquareButton
            imgSRC = {iconsObject.icon3src}
            divCSSclass = {(shouldMenuShow === 0 || shouldMenuShow === 1) ? "hideIconContainer" : "showIconContainer"}
            imgClickHandler = {iconsObject.icon3ClickHandler}
            altText = {"Clicking this button takes the user to one of the pages of the app"}
        />
        
        {/* button 4 -- just like button 1*/}
        <SquareButton
            imgSRC = {iconsObject.icon4src}
            divCSSclass = {(shouldMenuShow === 0 || shouldMenuShow === 1) ? "hideIconContainer" : "showIconContainer"}
            imgClickHandler = {iconsObject.icon4ClickHandler}
            altText = {"Clicking this button takes the user to one of the pages of the app"}
        />
        
        {/*the plus button, comprising a div and an icon (an img).
        This button is always visible */}
         <SquareButton
            imgSRC = {plusPic}
            divCSSclass = {"plusIconContainer"}
            imgClickHandler = {toggleShouldMenuShow}
            altText = {"This is the plus button that makes the plus mennu show"}
        />

    
        </div>
        )

                                  }