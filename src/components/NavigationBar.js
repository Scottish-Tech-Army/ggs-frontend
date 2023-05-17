import React, { useEffect, useState, useContext, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import '../scss/style.scss'

// Images:
import homePic from "../assets/images/homeIcon2.svg";

// Other stuff
// import MenuContext from "./Home.js"
import PlusMenu from "./PlusMenu";
import SquareButton from "./SquareButton";


// Each page component (except the one for the 
// welcome/home/landing page, which does not 
// have a navigation bar) calls this component
// and sets the value of prop iconsObject to 
// one of the objects in the object held in 
// <Home/>'s state variable iconsObject.
export default function NavigationBar({iconsObject}){



return (
<div className="navbarContainer">  

{/* The button to click to show the landing/welcome/home page.*/}

<SquareButton
imgSRC = {homePic}
altText = {"Home button"}
divCSSclass = {"showIconContainer"}
imgClickHandler = {iconsObject.homeIconClickHandler}
/>

{/* test stuff follows 
<SquareButton
            imgSRC = {iconsObject.icon1src}
            divCSSclass = {"showIconContainer" }
            imgClickHandler = {iconsObject.icon1ClickHandler}
            altText = {"Clicking this button takes the user to one of the pages of the app"}
/>
*/}


{/* Now pass into <PlusMenu/> the object that 
contains the values for the src and onClick 
attributes of <PlusMenu/>'s <img>s */}
<PlusMenu iconsObject = {iconsObject}/>


</div> 

)
}