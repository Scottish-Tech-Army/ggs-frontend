import React, { useEffect, useState, useContext} from "react";

// Modals:
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";



// Context:
// Get access to the object that contains the stuff to do with making 
// this app a multi-page app:
import {MenuContext} from "./Home.js"
// Get access to <AuthProvider/>'s unit and setUnit():
import { authContext } from "../contexts/AuthContext";



// Components:
import SquareButton from "./SquareButton";
import GGSbuttonOne from "./GGSbuttonOne";



// Images:
// Main logo:
import ggsTextImage from "../assets/images/logoPlusGirlguidingScotland.svg";
// Main image:
import digitalSafariImage from "../assets/images/digitalSafariStandIn.svg";

// Images for the icons:
import HowToIcon from "../assets/images/howToComplete2.svg";
import challengesIcon from "../assets/images/challengesNearMeIcon.svg";
import userGuideIcon from "../assets/images/UserGuideIcon.svg";
import completedIcon from "../assets/images/completedChallenges.svg";
import leaderboardIcon from "../assets/images/clipboardIcon3.svg";



// styles:
import "bootstrap/dist/css/bootstrap.min.css";
import '../scss/style.scss'







const UNIT_KEY = "ggsUnit"


export default function LandingPage({
    isThisPageActive 
    
                                    }) {



//////////////////////////////////////////////////////////////////////////////////////////                                      
// SET UP STATE PROPERTIES.
// A state property that will hold the string for 
// the text of the log-in/log-out button:
const [loginButtonText, setLoginButtonText] = useState("Log in");

// A state property to hold the CSS class of 
// the <p> that contains the text for the buttons that take the user to other pages. Value 
// will be either "buttonOperable" or "buttonInoperable"
const [buttonTextCSSclass, setButtonTextCSSclass] = useState("buttonInoperable");

// A state property to hold the CSS class of the divs for the buttons that take the user
// to other pages. Value will be either "largeButton1New" (for 
// when they are working) or "largeButtonInoperable" (for when they 
// are not)
const [buttonDivCSSclass, setButtonDivCSSclass] = useState("largeButtonInoperable");

// A state property to hold the CSS class of the divs that contain the icons that go next to 
// the buttons that take the user to the other pages. Value will be either 
// "landingPageIconAndButtonContainer" (for // when they are working) or 
// "landingPageIconAndButtonContainerFaded" (for when they // are not)
const [iconAndButtDivCSSclass, setIconAndButtDivCSSclass] = useState("landingPageIconAndButtonContainerFaded");

// A state property that shows whether a user is logged in or not. 
// Possible values are true or false.
const [loggedIn, setLoggedIn] = useState();

// A state property that shows whether a user has logged out after 
// logging in. This has value false on launch of the app and before 
// user has logged in. It becomes true every time the use logs out.
// Possible values are true or false.
const [loggedInThenLoggedOut, setLoggedInThenLoggedOut] = useState(false);


// A state property whose value can be one of two functions, each a possible 
// event handler for the click of the login/logout button:
const [logButtonClickHandler, setLogButtonClickHandler] = useState();


const [showLogin, setShowLogin] = useState(false);
//////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////
////// FUNCTIONS:
// Two functions that are event handlers for the onClick of the 
// login/logout button:
// First a function to let the user log out. This fn should:
// a) toast localStorage
// b) set unit of <AuthProvider/> to false
// c) Change text of log-in/log-out button to "Log in"
// d) Make icons fade
// e) Make the buttons inoperable and faded 
// f) set the onClick of the login/logout button to function login()
// g) set loggedIn to false
// h) set loggedInThenLoggedOut to true, which will 
// Show a modal that reads, "You are now logged out" for a short interval.
const logout = () => {
  // a):
    localStorage.removeItem(UNIT_KEY);
  // b):
    setUnit(false)
  // c):
    setLoginButtonText("Log in")
  // d) and e):
    changeButtonsAndIcons(false) 
  // f):
  setLogButtonClickHandler(()=>login)
  // g):
    setLoggedIn(false)  
  // h):
  setLoggedInThenLoggedOut(true)
  // x?)
    setShowLogin(false)  
                       } // end fn logout 
  
  
  // Second a function to let the user log in. This fn should:
  // a) Show the login modal window
  // b) Determine if login was successful.
  // if yes:
  // i)   change text of log-in/log-out button to "Log out"
  // ii)  Make icons opaque
  // iii) Make the buttons clickable, operable and opaque
  // iv)  set the onClick of the login/logout button to function logout()
  // v)   set loggedIn to true
  // vi)  set unit (the state property of <AuthProvider/>) to the downloaded data
  const login = () => {
  // a):
  setShowLogin(true);
  // b):
  // On successful login <LoginModal/> will:
  // i)   call function onLoginSuccess() of this component (<LandingPage/>). 
  // onLoginSuccess() does b) i)-v) above.
  // ii)  call its own handleLogin() function, which does vi) above.
  // On error onLoginSuccess() sets loggedIn to false and b) i)-vi) above
  // are NOT done
                      } // end fn login 
  



// A callback function that <LoginModal/> calls when the user tries to login. 
// If the arg is true This function 
// a)  changes text of log-in/log-out button to "Log out"
// b)  Makes the icons opaque
// c)  Makes the buttons clickable, operable and opaque
// d)  sets the onClick of the login/logout button to function logout()
// e)  sets loggedIn to true
// If the arg is false this function
// f) sets loggedIn to false 
const onLoginSuccess= (trueFalse) =>{
// If logging in was successful:
  if (trueFalse) {
    // a): 
  setLoginButtonText("Log out")
  
  // b) and c):
  changeButtonsAndIcons(true)
  
  // d):
  setLogButtonClickHandler(()=>logout)
  // e):
  setLoggedIn(true)
 
                 } // end if
// If logging in produced an error (mon27Mar23: I'm not
// yet sure if the following if statement is necessary):
if (!trueFalse) {
    setLoggedIn(false)
                } // end if                 
                           } // end onLoginSuccess



  // A function to change the buttons that take user to the other pages and their icons so that 
  // either
  // a) the buttons are faded, unclickable and inoperable
  // and the icons are faded
  // or 
  // b) the buttons are opaque, clickable and operable
  // and the icons are opaque:
  const changeButtonsAndIcons = (clickable) => {
  if (clickable) {
  // Make operable, clickable and opaque:
  setButtonTextCSSclass("buttonOperable")
  setButtonDivCSSclass("largeButton1New")
  setIconAndButtDivCSSclass("landingPageIconAndButtonContainer")    
                 } else {
  // Make inoperable, unclickable and faded:
  setButtonTextCSSclass("buttonInoperable")
  setButtonDivCSSclass("largeButtonInoperable")
  setIconAndButtDivCSSclass("landingPageIconAndButtonContainerFaded")
                        }
                                               } // end fn changeButtonsAndIcons 



// A function to get data from child <LoginModal/> to this component, its parent.
// This fn has to
// a) read the value of data. if true call a function that 
// i) 
const callbackToParent = (data) => {
  // a):
  // console.log(`You clikced the login button`)
  setShowLogin(true);
  // b):
  
  
                          } // end fn  
  
//////////////////////////////////////////////////////////////////////////////////////////
  



//////////////////////////////////////////////////////////////////////////////////////////
// CONSUME CONTEXT
// Consume context that contains xxxxxx:                                    
const bigIconsObject = useContext(MenuContext);

console.log(`bigIconsObject.p0.takeTesterToFormLinkPage is a ${typeof bigIconsObject.p0.takeTesterToFormLinkPage}`)

// Consume context accessed from <AuthProvider/>:
const { unit, setUnit } = useContext(authContext);
//////////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////////////////////////////////////////////////////////////
// USE EFFECT HOOKS
// The following useEffect() runs when unit changes.
//     
useEffect(() => {

// console.log(`Inside useEffect() in <LAndingPage/> and unit has value ${unit}`)    
  if (unit) { // If the user has already logged in:
// NOTE: this will change as user must never remain logged in,
// ie app must use session storage rather than local storage.
// unit will never be true on first mounting of <LandingPage/>
// a) Change text of login button to read "Log out"
// b) set the button's onClick to a function that logs the user out
// c) Make buttons that take user to the other pages opaque, 
// clickable and operable. Make the icons next to the button opaque: 
// a):
setLoginButtonText("Log out")
// b):

// c):
changeButtonsAndIcons(true)
//    setShowLogin(false);
//    getLocations(unit.email).then(setLocations);
  } else { // If the user has not logged in:
    // console.log(`Inside useEffect() in <LAndingPage/> and unit has value ${unit} and button text about to be set to Log in`)    
// a) Change text of login button to read "Log in" 
// b) set the onClick of the login/logout button to a function that shows the login modal   
// c) // Make buttons that take user to the other pages faded, unclickable and inoperable.
// Make the icons next to the button faded:
// a):
setLoginButtonText("Log in")
// b):
setLogButtonClickHandler(()=>login)
// c):
changeButtonsAndIcons(false) 
//    setShowLogin(true);
         }
   }, []); // end useEffect()

//////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////
  // Modal controls
  const handleLoginClose = () => {
  //  setLoadingText("Logging in"); // Message for signed in users only
  //  setLoadingTimer(500);
    setShowLogin(false);
  //  setShowLoading(true);
                                 };

//////////////////////////////////////////////////////////////////////////////////////////
///// VARIABLES

// A variable that code changes from the 
// JSX for the LogoutModal to null after 
// a short time. 
let showModal 


// Variable renderThis to hold either 
// i)   the JSX that describes this page 
// ii)  null
// Code here sets renderThis to either 
// i) or ii) above (in the following two 
// if statements) depending on the value 
// of passed-in prop isThisPageActive.
// All of components that describe the 
// other pages work on the same principle.
let renderThis


/////////////////////// TEST CODE HERE
function testHandler(){
  console.log(`The testHandler fired!`)
                        }

/////////////////////// END TEST CODE HERE



////////////////////////////////////////////////////////////////////////
//// CODE FOR CONDITIONAL RENDERING

// If the parent <Home/> has set 
// prop isThisPageActive to true,
// render the page:
if (isThisPageActive) {


renderThis = (
<div>

{showModal}

{ /* If the user has logged in and then 
logs out again show the modal that 
tells the user she has logged out but 
show it for several seconds and then 
make it disappear: */ }
{loggedInThenLoggedOut ? ( <>
  {showModal} = <LogoutModal className="showLogoutModal"/>
  {setTimeout(() => {
    showModal = null
    // Trigger a rerender:
    setLoggedInThenLoggedOut(false)
          }, 3000)}
</>
              ) : showModal = null

}


<div className="landingPageOuterContainer"> 
    {/* This is an all-containing div, a flexbox container. It 
    contains two divs:
    i)   a div with className="landingPageFirstContainer"
        This contains a div (className="landingPageGGSContainer")
    ii)    a div with className="landingPageSecondAndThirdContainer"
        This contains two items:
        a) a div with  className="landingPageSecondContainer"
        b) a div with  className="landingPageThirdContainer"
        */}
    
  


  {/* i):
  div (className="landingPageFirstContainer") contains
        one element:
         a div (className="landingPageGGSContainer") containing  
        the main image (text "Girlguiding Scotland" and the roundel)
    */}    
  <div className="landingPageFirstContainer">

        {/* ia): */}
    <div className="landingPageGGSContainer">
      <img className="landingPageTextImage" src ={ggsTextImage}/>
    </div>      

  
    </div>{/* end div of className landingPageFirstContainer */}



{/* ii) a div of className="landingPageSecondAndThirdContainer" 
This contains two items:
        a) a div with  className="landingPageSecondContainer"
        b) a div with  className="landingPageThirdContainer"
*/}
<div className="landingPageSecondAndThirdContainer">

    
    {/* iia): 
    a div of className="landingPageSecondContainer" that contains 
      two elements:
      a) a div of className = "landingPageWelcomeTextContainer" that contains 
      two elements:
      1) a <p> for text "Welcome" and 
      2) a <GGSbuttonOne> for the login/logout button

      b) a div (className="landingPageDigitalSafariContainer") that contains
   the image for "Digital Safari"
  */}
    <div className="landingPageSecondContainer">
    
    {/* iia-a): */}
    <div className="landingPageWelcomeTextContainer">
    <p className="welcomeText"> Welcome </p>

     <GGSbuttonOne
     buttonDivCSSclass = {"largeButton1New"}
     pTextCSSclass = {"buttonOperable"}
     clickHandler = {logButtonClickHandler}
     pText = {loginButtonText}
     />      
    </div>

 {/* iia-b): */}
 <div className="landingPageDigitalSafariContainer">
    <img src={digitalSafariImage} alt="Digital safari image" className = "digitalSafariImg"/>
    </div>

{/* Comment out the following button for production. It is only for field testers: */}
    <GGSbuttonOne
     buttonDivCSSclass = {"surveyFormButton surveyFormButtonLandingPage"}
     pTextCSSclass = {"surveyFormButtonP"}
     clickHandler = {bigIconsObject.p0.takeTesterToFormLinkPage}
     pText = "When you're ready to fill in the questionnaire TAP HERE"
     />


    </div>  {/* end div for landingPageSecondContainer*/}

     
    


    {/* iib):
    A div (className="landingPageThirdContainer") that contains five divs, each 
    containing two things: a square button that contains an icon for one of the other five pages 
    and a long clickable button to take the user to one of the other five pages. 
    The five divs are: 
    i)   the div that contains the challenges near me button (<SquareButton/>) and button with text on it (<GGSbuttonOne/>)
    ii)  the div that contains the my completed challenges button (<SquareButton/>) and button with text on it (<GGSbuttonOne/>)
    iii) the div that contains the challenges leader board button (<SquareButton/>) and button with text on it (<GGSbuttonOne/>)
    iv)  the div that contains the how to complete challenges button (<SquareButton/>) and button with text on it (<GGSbuttonOne/>)
    v)   the div that contains the user guide button (<SquareButton/>) and button with text on it (<GGSbuttonOne/>) 
    */}
    <div className="landingPageThirdContainer"> 

    {/*  i)   */}
    <div className={iconAndButtDivCSSclass}>    
    <SquareButton
    imgSRC = {challengesIcon}
    altText = {"Button for challenges-near-me page"}
    divCSSclass = {"landingPageIconContainer"}
    imgClickHandler = {null}
    />

    <GGSbuttonOne
      buttonDivCSSclass = {buttonDivCSSclass}
      pTextCSSclass = {buttonTextCSSclass}
      clickHandler  = {bigIconsObject.p0.challengesNearMeButtonClickHandler}  
      pText = "Challenges near me"
    />
    </div>



    {/*  ii)   */}
    <div className={iconAndButtDivCSSclass}>    
    <SquareButton
    divCSSclass = {"landingPageIconContainer"}
    imgSRC = {completedIcon}
    altText = {"Button for completed-challenges page"}
    imgClickHandler = {null}
    />

    <GGSbuttonOne
      buttonDivCSSclass = {buttonDivCSSclass}
      pTextCSSclass = {buttonTextCSSclass}
      clickHandler  = {bigIconsObject.p0.completedChallengesButtonClickHandler}  
      pText = "Completed challenges"
    />
    </div>



    {/*  iii)   */}
    <div className={iconAndButtDivCSSclass}>    
    <SquareButton
    divCSSclass = {"landingPageIconContainer"}
    imgSRC = {leaderboardIcon}
    altText = {"Button for leaderboard page"}
    imgClickHandler = {null}
    />

    <GGSbuttonOne
      buttonDivCSSclass = {buttonDivCSSclass}
      pTextCSSclass = {buttonTextCSSclass}
      clickHandler  = {bigIconsObject.p0.leaderBoardButtonClickHandler}  
      pText = "Challenges leader board"
    />
    </div>


    {/*  iv)   */}
    <div className={iconAndButtDivCSSclass}>    
    <SquareButton
    divCSSclass = {"landingPageIconContainer"}
    imgSRC = {HowToIcon}
    altText = {"Button for how-to page"}
    imgClickHandler = {null}
    />

    <GGSbuttonOne
      buttonDivCSSclass = {buttonDivCSSclass}
      pTextCSSclass = {buttonTextCSSclass}
      clickHandler  = {bigIconsObject.p0.howToButtonClickHandler}  
      pText = "How to complete challenges"
    />
    </div>


    {/*  v)  */}
    <div className={iconAndButtDivCSSclass}>    
    <SquareButton
    divCSSclass = {"landingPageIconContainer"}
    imgSRC = {userGuideIcon}
    altText = {"Button for user-guide page"}
    imgClickHandler = {null}
    />

    <GGSbuttonOne
      buttonDivCSSclass = {buttonDivCSSclass}
      pTextCSSclass = {buttonTextCSSclass}
      clickHandler  = {bigIconsObject.p0.userGuideButtonClickHandler}  
      pText = "User guide"
    />
    </div>


   </div>     {/* end div of className landingPageThirdContainer */}

   </div>     {/* end div of className landingPageSecondAndThirdContainer */}

   {showLogin && <LoginModal successOrFailResponse = {onLoginSuccess} handleLoginClose={handleLoginClose} />}


</div> {/* end landingPageOuterContainer follows on next line*/}

</div>
)
} // end if isThisPageActive



// But if parent <Home/> has set  
// prop isThisPageActive to 
// false, don't render anything:
if (!isThisPageActive) {
    renderThis = null
                       } // end if


return (
    <div>
    {renderThis}
    </div>
               )

                 
                              }
    
