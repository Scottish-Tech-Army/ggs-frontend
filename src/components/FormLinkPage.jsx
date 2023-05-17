import React, { useEffect, useState, useContext, useRef } from "react";

// Other components:
import GGSbuttonOne from "./GGSbuttonOne.js";




// context
import {MenuContext} from "./Home.js"

// scss stuff:
import '../scss/style.scss';





export default function FormLinkPage({
    isThisPageActive
                                     })
                                          {



// Consume the big object made available by <Home/> as context:
const bigIconsObject = useContext(MenuContext);

/*
// The click handler for the link:
function openFormInNewTab() {
    window.open("https://www.bbc.co.uk", "_blank");
    }
*/



let renderThis


if(isThisPageActive){

renderThis = (
<div className="FormLinkPageOuterContainer">


{/*
<GGSbuttonOne
     buttonDivCSSclass = {"surveyFormButton"}
     pTextCSSclass = {"surveyFormButtonP"}
     clickHandler = {openFormInNewTab}
     pText = "Please tap here to go to the form, which will open in a new browser tab."
/>
*/}

<p className="FormLinkPageP1">
Please complete the form in the red box below.
There are five pages to the form.
</p>


<iframe 
className="iFrameClass"
src = "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__evkpvNUM05JMVgxTklZMUFSR0gyTTlOWU4yVzdUUy4u&embed=true%22"
sandbox='allow-scripts allow-popups allow-same-origin '
/>







{/*The button to click to take the user back to the home page: */}
<GGSbuttonOne
     buttonDivCSSclass = {"surveyFormButton surveyFormButtonFormLinkPage"}
     pTextCSSclass = {"surveyFormButtonP"}
     clickHandler = {bigIconsObject.p6.homeIconClickHandler}
     pText = "Tap here to go to the home page (and from there to other pages of this app)"
/>

</div>
)

                   } else {
                    renderThis = null
                   }

return (
<>
{renderThis}
</>
       )


                                            }