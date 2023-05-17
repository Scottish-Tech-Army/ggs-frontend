/* 
This component is the blue button
(used for the login/logout button,
the five long text buttons on the landing page,
the login modal button and the Go button 
on the Challenges-near-me page)
*/

import React from "react";

// styles:
import '../scss/style.scss'


export default function GGSbuttonOne({
    buttonDivCSSclass, // the css class for the main div of this buutton
    pTextCSSclass, // the css class for the <p> of the button's text (eg text "Log out")
    clickHandler, // the handler to respond to the click of the div of this button
    pText // the string that is the text for the button  (eg "Log out")
                                    }) {

return (

<div 
className= {buttonDivCSSclass}
onClick = {clickHandler}
>

<p
className = {pTextCSSclass}
>
{pText}
</p>

</div>

       )
                                        }