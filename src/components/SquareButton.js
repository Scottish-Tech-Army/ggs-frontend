import React, { useEffect, useState, useContext, useRef } from "react";

// styles:
import '../scss/style.scss'



export default function SquareButton({
    divCSSclass,
    imgClickHandler,
    imgSRC,
    altText
                                    }) {

return (

<div 
className= {divCSSclass}
>
<img 
className = "iconImgs" 
src = {imgSRC}
onClick = {imgClickHandler}
alt = {altText}
/>
</div>

       )
                                        }