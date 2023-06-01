import React, { useRef, useState, useContext, useEffect } from "react";

// context:
import { authContext } from "../contexts/AuthContext";
import { login, newRegister } from "../services/auth";

// components:
import Button from "react-bootstrap/Button";
import GGSbuttonOne from "./GGSbuttonOne";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// images:
import blueDownArrow from '../assets/images/blueDownArrow.svg'



const LOGIN = "login";
const REGISTER = "register";


const LoginModal = ({ handleLoginClose, successOrFailResponse, whichModalScreen }) => {
  const { setUnit } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [county, setCounty] = useState("");
  const [error, setError] = useState("");
  // const [state, setState] = useState(LOGIN);
  const [state, setState] = useState(whichModalScreen);

  useEffect(() => {
    setError("");
  }, [state]);


//--------------------------------------


//--------------------------------------

// Now a group of functions, etc to do with the dropdown menu:

// Two state properties to hold 
// i)  what the user types in
// ii) the filtered list of counties:
const [stateObj, setStateObj] = useState({
  typedText: '',
  filteredCounties: []
                                       })



// An array containing all of the counties of Scotland:
let allCountiesList = [
  {region: "Aberdeen and Shetland", key: "1"},
  {region: "Angus", key: "2"},
  {region: "Ayrshire North", key: "3"},
  {region: "Ayrshire South", key: "4"},
  {region: "Banff and Buchan", key: "5"},
  {region: "Dumfries and Galloway", key: "6"},
  {region: "Dunbartonshire", key: "7"},
  {region: "East Lothian", key: "8"},
  {region: "East Renfrewshire", key: "9"},
  {region: "Edinburgh", key: "10"},
  {region: "Fife", key: "11"},
  {region: "Forth Valley", key: "12"},
  {region: "Glasgow", key: "13"},
  {region: "Gordon", key: "14"},
  {region: "Highlands and Islands", key: "15"},
  {region: "Inverness-shire", key: "16"},
  {region: "Kincardine and Deeside", key: "17"},
  {region: "Midlothian", key: "18"},
  {region: "Moray", key: "19"},
  {region: "North Lanarkshire", key: "20"},
  {region: "Renfrewshire", key: "21"},
  {region: "Scottish Borders", key: "22"},
  {region: "South Lanarkshire", key: "23"},
  {region: "Tay and Ochils", key: "24"},
  {region: "West Lanarkshire", key: "25"},
  {region: "West Lothian", key: "26"}
                ]




// A ref to hold a boolean that code in the 
// return statement reads 
// to determine whether to show the dropdown 
// menu or not:
let showRegionsList = useRef(false)



// Now make array countiesToDisplay. Each of its
// members must be JSX for one menu item for the 
// dropdown menu. Each menu item is a div that 
// contains a <p> that is the name of one of the
// counties in state property array 
// filteredCounties, which is a filtered list 
// of counties:
const countiesToDisplay = 
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


// The onClick handler of the divs that
// contain the county names in the 
// dropdown list.
// This fn must:
// 1) Put the county name into the input
// 2) Make the dropdown disappear
function selectCountyFromDropDown(countyName){
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
// to make the dropdown list disappear
// 3) Set state property county to the 
//    county selected from the dropdown menu:
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

  // 3) 
      setCounty(countyName)
                                      }
  


// The onChange handler for the input.
// This function constantly creates and updates 
// an array of all of the counties that contain the 
// letters that the user is typing in and puts that
// array into a state property.
// This function must:
//  1)   get what the user has typed in the input
//  2)   compare the typed-in text with the text that is  
//       each member of array allCountiesList. If the
//       typed-in text is in any member of allCountiesList 
//       save that member object to array newArray.
//  3)   set showRegionsList to true.
//  5)   Change state property typedText to what was typed in
//  6)   Set state property county to the typed in text
//       (this allows the form validation code in function 
//       handleRegistration to take action if the user forgot
//       to select a region from the dropdown list)
function displayFilteredRegionsList(e){
  let newArray = []
  // 1):
  let typedInText = e.target.value
  console.log(`Text typed in is ${typedInText}`)
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
  filteredCounties: newArray 
      })

// 6):
setCounty(typedInText)  

                           } // end displayFilteredRegionsList


// The onFocus handler for the search field (the input of 
// className = "countyInput". This handler must:
// 1)   Put all the counties into 
//      stateObj.filteredCounties
function showAllRegionsList(e){
  // 1): 
  showRegionsList.current =true    
  setStateObj(
      {
          typedText: '',
          filteredCounties: allCountiesList   
      }   
             )
                            } // end showAllRegionsList

//--------------------------------------

/*
// NOTE: I couldn't get the validation error messages to show if 
// I used the following object as a state property. Maybe come 
// come back to this and work out why it failed to work!
let initStateErrorObject = {
showEmailErrorMess: false,
emailErrorMessage: " ",
showUnitNameErrorMess: false,
unitNameErrorMessage: " ",
showCountyErrorMess: false,
countyErrorMessage: " "
                      }

// Now a state property that is just like the ref above.
// function validate() sets this state property to the 
// ref above
const [errorObj, setErrorObj] = useState(initStateErrorObject)
*/



// Wed31May23 NOTE: I couldn't get the Register form validation error messages to
// show using an object in state to hold the show/hide error 
// flags and the error messages so I hard coded the error messages 
// and used these simple vars for the flags:
const [showRegisterEmailErrMess, setShowRegisterEmailErrMess] = useState(false)
const [showRegisterUnitNameErrMess, setShowRegisterUnitNameErrMess] = useState(false)
const [showRegisterCountyErrMess, setShowRegisterCountyErrMess] = useState(false)

// The same deal but for the Login form:
const [showLoginEmailErrMess, setShowLoginEmailErrMess] = useState(false)

//--------------------------------------

// Form input validation functions. One for the login form and
// one for the Registration form:

// A function to validate the single email input in
// the login form. This fn returns true when the 
// user has typed a valid email address and false when not:

function validateLoginInput(){
  let loginEmailIsValid = false  
  // Validate the email 
let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
if (email.match(validEmailRegex)) {
  console.log(`Log-in email is valid`)
  loginEmailIsValid = true;
  setShowLoginEmailErrMess(false)
                                  } else {
  console.log(`Log-in email is NOT valid`)
  setShowLoginEmailErrMess(true)
                                         }
return loginEmailIsValid
                             }


// A function to validate the user inputs for registration:
function validateRegistrationInputs (){
  
let emailIsValid = false  
let unitNameIsValid = false  
let countyIsValid = false 

// Validate the email 
let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
if (email.match(validEmailRegex)) {
  // console.log(`email is valid`)
  emailIsValid = true;
  setShowRegisterEmailErrMess(false)
                                  } else {
  // console.log(`email is NOT valid`)
  setShowRegisterEmailErrMess(true)
                                         }


// Validate the unit name:
if (name.trim().length === 0 || name === "") {
  setShowRegisterUnitNameErrMess(true)
                                             } else {
  unitNameIsValid = true
  setShowRegisterUnitNameErrMess(false)
                                                    }


// Validate the county name
for (const memberObj of allCountiesList){
  if (memberObj.region === county) {
    countyIsValid = true
    break
                                   }
                                        } // end for
if (!countyIsValid) {
  setShowRegisterCountyErrMess(true)
                    } else {
    setShowRegisterCountyErrMess(false)
                           }


if (emailIsValid && unitNameIsValid && countyIsValid) {
    return true // all fields passed validation
                                                      } else {
    return false // validation failed somewhere
                                                             }
                                } // end validateRegistrationInputs



//--------------------------------------
// The functions that handle login and registration:

  const handleLogin = (event) => {
    event.preventDefault(); // This line stops the modal window from
                            // vanishing even when the email address is invalid.
    // Only send the form data (an email address) to the back end 
    // if it passes validation:
    if (validateLoginInput()) {
      // Log in:
    login(email)   // email here is a JS object like this: {email: "xxx.yyy@zzz.com”}
      .then((unit) => {
        // login() returns a promise that resolves to unit,
        // which is a js object that looks like this:
        // {email: "mukund.pandit@virginmedia.com",
        // name: "TeamMukund"}

        setUnit(unit);
        handleLoginClose();
        // Call parent <LandingPage/>'s function that makes the app's
        // buttons operable and opaque (before login they are faded and 
        // inoperable).:
        successOrFailResponse(true)
      })
      .catch((error) => {
        // The function that tells parent <LandingPage/>
        // what to do on failure to log in:
        successOrFailResponse(false)
        // console.error(error);
        if (error.status === 404) {
          setError(
            "Email address not found. If this is your first visit, please register first."
          );
        } else {
          setError("Problem logging in. Please try again.");
        }
      });
    event.preventDefault();
                          } // end if
                            }; // end handleLogin()



// The event handler for the Register form's 
// Register button
  const handleRegistration = (event) => {
    // Validate user input:
    if (validateRegistrationInputs()) {
// console.log(`All inputs passed validation!`)
/*  NEW CODE FOLLOWS      
    newRegister(email, name, county)
      .then((unit) => {
        setUnit(unit);
        handleLoginClose();
      })
      .catch((error) => {
        console.error(error);
        if (error.status === 409) {
          setError("Email address already registered. Please log in instead.");
        } else {
          setError("Problem registering. Please try again.");
        }
      });
                                } // end if
*/                                

    /* OLD CODE FOLLOWS
    register(email, name)
      .then((unit) => {
        setUnit(unit);
        handleLoginClose();
      })
      .catch((error) => {
        console.error(error);
        if (error.status === 409) {
          setError("Email address already registered. Please log in instead.");
        } else {
          setError("Problem registering. Please try again.");
        }

      });
    */
                                } // end if
    event.preventDefault();
  };

  return (
    <Modal
      show={true}
      onHide={handleLoginClose}
      backdrop="static"
      keyboard={false}
      className="custom-modal login-modal"
    >
      <Modal.Header className="border-0 mb-n3"></Modal.Header>
      <Modal.Body className="mt-n3">
        {state === LOGIN && (
          <>
            <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Ready to explore?</h1>
            {/*  tues30May23: The following few lines were 
              the original text, which seemed unnecessary to me, so I have removed them. Mukund
            <p className="text-left mb-3">
              Visit and collect all of the sights in your region or explore
              others
            </p>
            */}
            {error && <p className="error-text text-center mt-n3">{error}</p>} {/* The messsage that shows when there's a login error */}
            <Form noValidate className="m-2 mt-n2" onSubmit={handleLogin}>
              <Form.Group controlId="formBasicCode">
                {/* if user typed an invalid email, the following error message shows: */}
              {showLoginEmailErrMess &&  
              <p style={{color: "red", fontStyle: "italic"}} className="registerErrorMessage">Please type a valid email address</p>
              }
                <Form.Control
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="email address"
                  placeholder="Enter email address"
                  className="w-100 my-2 mx-auto"
                />
              </Form.Group>
              <div className="modalButtonContainer">
              <Button 
              variant = "customGGS"
              className="buttonOperable" 
              type="submit"
              >
              Start Exploring
              </Button>
              <GGSbuttonOne
              buttonDivCSSclass = {"largeButton1New"}
              pTextCSSclass = {"buttonOperable"}
              clickHandler = {handleLoginClose}
              pText = "Cancel"
              />
              </div>
              </Form>
            <p className="text-left mt-3">
              Is this your first visit? Please{" "}
              <span className="switch-mode" onClick={() => setState(REGISTER)}>
                register first
              </span>
              .
            </p>
          </>
        )}
        {state === REGISTER && (
          <>
            <h1 style={{ textAlign: "center" }}>How To Register</h1>
            <div className="registerModalGrid">
            <div className="numberCircle numbCircleDark"><p className="numberCircleText">1</p></div>
            <div>
            <p className="mb-3">
              First type an email address, preferably your unit's shared address.
              We'll hold the address according to our {" "}
              <a
                href="https://www.girlguidingscotland.org.uk/privacy/"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </a>
              .
              </p>
            </div>

            <div className="numberCircle numbCircleDark"><p className="numberCircleText">2</p></div> 
            <div>
            <p className="mb-3">
              Then type your team's name.
              </p>
            </div>

            <div className="numberCircle numbCircleDark"><p className="numberCircleText">3</p></div> 
            <div>
            <p className="mb-3">
              Then select your county.
              </p>
            </div>

            <div className="numberCircle numbCircleDark"><p className="numberCircleText">4</p></div> 
            <div>
            <p className="mb-3">
              Then click Register or Cancel.
              </p>
            </div>
           
            </div>
              
            <div className="downArrowContainer">
              <img className="blueDownArrowIMG" src={blueDownArrow}></img>
            </div>  
            
            {error && <p className="error-text text-center mt-n3">{error}</p>} {/* The error that shows when the email is 
                                                                                already registered or there was a problem
                                                                                at the backend */} 
            <Form noValidate className="m-2 mt-n2" onSubmit={handleRegistration}>
              <Form.Group controlId="formBasicCode">
              <div className="numberCircle numbCircleLight"><p className="numberCircleText">1</p></div>
              {/* if user typed invalid email, this error message shows */}
              {showRegisterEmailErrMess &&  
              <p style={{color: "red", fontStyle: "italic"}} className="registerErrorMessage">Please type a valid email address</p>
              }
                <Form.Control
                  
                  value={email}
                  type="email"
                  onChange={(e) => {console.log(`The email address is: ${e.target.value}`)
                    setEmail(e.target.value)}}
                  label="email address"
                  placeholder="Type email address"
                  className="w-100 my-2 mx-auto formInputs" /* NOTE: I added class formInputs -- mukund*/
                />
                <div className="numberCircle numbCircleLight"><p className="numberCircleText">2</p></div>
                {/* if user typed invalid unit name, this error message shows */}
                {showRegisterUnitNameErrMess && 
              <p style={{color: "red", fontStyle: "italic"}} className="registerErrorMessage">Please type a unit name below</p>
              }
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="team name"
                  placeholder="Type team name"
                  className="w-100 my-2 mx-auto formInputs"  /* NOTE: I added class formInputs -- mukund*/
                />
                <div className="numberCircle numbCircleLight"><p className="numberCircleText">3</p></div>
                {/* if user typed invalid county name, this error message shows */}
                {showRegisterCountyErrMess && 
              <p style={{color: "red", fontStyle: "italic"}} className="registerErrorMessage">Please start typing a county name then select an option from the dropdown menu that appears</p>
                }
                <Form.Control
                  value={stateObj.typedText} // use of value makes this what React calls a controlled input
                  // value={county} // previous code
                  onChange={displayFilteredRegionsList}
                  // onChange={(e) => setCounty(e.target.value)} // previous code
                  onFocus = {showAllRegionsList} // user clicks in input and all counties show in the dropdown list
                  label="county name"
                  placeholder="Type county name then select from dropdown menu"
                  className="w-100 my-2 mx-auto formInputs"  /* NOTE: I added class formInputs -- mukund*/
                />
              </Form.Group>
              {/* Conditionally show/hide the dropdown list */}
              <div className="positionDDlistInLoginModal"> {/* This div contains the DD menu. 
              Its height is 5px, has overflow-y set to visible and not visible.
              The idea is to have the dd menu appear without forcong the other 
              elements in the <Form/> out of the way*/}
              <div className= {showRegionsList.current ? " showDDlist " : " hideDDlist"}>  
              <ul className="countiesList">
              {countiesToDisplay}
              </ul>
              </div>
              </div>
  
              <div className="numberCircle numbCircleLight"><p className="numberCircleText">4</p></div>
              <div className="modalButtonContainer">
              <Button 
              variant = "customGGS"
              className="buttonOperable" 
              type="submit">
                Register
              </Button>
              <GGSbuttonOne
              buttonDivCSSclass = {"largeButton1New"}
              pTextCSSclass = {"buttonOperable"}
              clickHandler = {handleLoginClose}
              pText = "Cancel"
              />
              </div>
              <div className="positionFinalText">
            {/*} <p className="text-center mt-3" >*/}
            <p className="finalText">
              Already registered? Please{" "}
              <span className="switch-mode" onClick={() => setState(LOGIN)}>
                log in
              </span>
              .
            </p>
            </div>
            </Form>
            
          </>
        )}
        </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
