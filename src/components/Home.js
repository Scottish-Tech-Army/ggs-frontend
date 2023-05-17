import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// import LeaderboardModal from "./LeaderboardModal";

// The components representing the six pages of the app:
import LandingPage from "./LandingPage";
import HowToPage from "./HowToPage";
import ChallengesNearMePage from "./ChallengesNearMePage";
import UserGuidePage from "./UserGuidePage";
import CompletedChallengesPage from "./CompletedChallengesPage";
import LeaderboardPage from "./LeaderboardPage";

// Follownig line must be commented out for production 
// as it is for field testing only:
import FormLinkPage from "./FormLinkPage";


// Images for the navigation bar and the plus menu:
import HowToIcon from "../assets/images/howToComplete2.svg";
import challengesIcon from "../assets/images/challengesNearMeIcon.svg";
import userGuideIcon from "../assets/images/UserGuideIcon.svg";
import completedIcon from "../assets/images/completedChallenges.svg";
import leaderboardIcon from "../assets/images/clipboardIcon3.svg";

// React-bootstrap stuff
import Button from "react-bootstrap/Button";

// scss stuff:
import '../scss/style.scss';



// Create context to share data with all descendants
// of this component:
export const MenuContext = createContext() 





export default function Home(){



  const [pageIndex, setPageIndex] = useState(0);
  

// The big object that is made available
// to all page components via context.
// It contains:
// 1) For every page except the landing page
// and FormLinkPage: 
// i)   the click handlers for the navigation bar 
//      and plus-menu square buttons for each page
// ii)  srcs for the the square buttons of the 
//      navigation bar and plus menu for every page 
//      except the landing page.     
// 2) For the landing page:
// i)   the click handlers for the buttons.
// ii)  the click handler for the field testing button
//      (this will be commented out for production)
// Note that code only ever reads this object (ie 
// never writes to it), so it's fine to put it in 
// state or not to. 
// 3) For the FormLink page:
// i)   a click handler for the home icon
// ii)  the src for the home icon
  const myObject = {
    // p0 is an object that <LandingPage/> will use: 
p0: {
      homeIconClickHandler:  ()=> {setPageIndex(0)},
      howToButtonClickHandler: ()=> {setPageIndex(1)},
      challengesNearMeButtonClickHandler: ()=> {setPageIndex(2)},
      userGuideButtonClickHandler: ()=> {setPageIndex(3)},
      completedChallengesButtonClickHandler: ()=> {setPageIndex(4)},
      leaderBoardButtonClickHandler: ()=> {setPageIndex(5)},
      testProperty: ()=> {console.log(`You have fire the function attached to property testProperty`)},
      // comment out the following line in production;
      // it is only for field testing:
      takeTesterToFormLinkPage: ()=> {
              setPageIndex(6)
              // console.log(`Inside the bigObject (myObject). Handler takeTesterToFormLinkPage has fired`)
                                     }
    },
    // p1 is an object that <HowToPage/> will use:
p1: {
    homeIconClickHandler:  ()=> {setPageIndex(0)},
    icon1src: challengesIcon,
    icon1ClickHandler:  ()=> {setPageIndex(2)},
    icon2src: userGuideIcon,
    icon2ClickHandler:  ()=> {setPageIndex(3)},
    icon3src: completedIcon,
    icon3ClickHandler:  ()=> {setPageIndex(4)},
    icon4src: leaderboardIcon,
    icon4ClickHandler:  ()=> {setPageIndex(5)}
    },
    // p2 is an object that <ChallengesNearMePage/> will use:
p2: {
    homeIconClickHandler:  ()=> {setPageIndex(0)},
    icon1src: HowToIcon,
    icon1ClickHandler:  ()=> {setPageIndex(1)},
    icon2src: userGuideIcon,
    icon2ClickHandler:  ()=> {setPageIndex(3)},
    icon3src: completedIcon,
    icon3ClickHandler:  ()=> {setPageIndex(4)},
    icon4src: leaderboardIcon,
    icon4ClickHandler:  ()=> {setPageIndex(5)}
    
    },
    // p3 is an object that <UserGuidePage/> will use:
p3: {
    homeIconClickHandler:  ()=> {setPageIndex(0)},
    icon1src: HowToIcon,
    icon1ClickHandler:  ()=> {setPageIndex(1)},
    icon2src: challengesIcon,
    icon2ClickHandler:  ()=> {setPageIndex(2)},
    icon3src: completedIcon,
    icon3ClickHandler:  ()=> {setPageIndex(4)},
    icon4src: leaderboardIcon,
    icon4ClickHandler:  ()=> {setPageIndex(5)}
    
    },
    // p4 is an object that <CompletedChallengesPage/> will use:
p4: {
    homeIconClickHandler:  ()=> {setPageIndex(0)},
    icon1src: HowToIcon,
    icon1ClickHandler: ()=> {setPageIndex(1)},
    icon2src: challengesIcon,
    icon2ClickHandler: ()=> {setPageIndex(2)},
    icon3src: userGuideIcon,
    icon3ClickHandler: ()=> {setPageIndex(3)},
    icon4src: leaderboardIcon,
    icon4ClickHandler: ()=> {setPageIndex(5)}
    },
    // p5 is an object that <LeaderboardPage/> will use:    
p5: {
    homeIconClickHandler:  ()=> {setPageIndex(0)},
    icon1src: HowToIcon,
    icon1ClickHandler: ()=> {setPageIndex(1)},
    icon2src: challengesIcon,
    icon2ClickHandler: ()=> {setPageIndex(2)},
    icon3src: userGuideIcon,
    icon3ClickHandler: ()=> {setPageIndex(3)},
    icon4src: completedIcon,
    icon4ClickHandler: ()=> {setPageIndex(4)}
    },

    // Comment out the following for production code;
    // it is only for field testers:
    // p6 is an object that <FormLinkPage/> will use:    
    p6: {
      homeIconClickHandler:  ()=> {setPageIndex(0)},
      icon1src: HowToIcon,
        }

                    } // end myObject

// Put myObject into state:
const [iconsObject, setIconsObject] = useState(myObject);

   
    return (
    <div>
<MenuContext.Provider value={iconsObject}>

  <LandingPage   
  isThisPageActive = {pageIndex === 0} 
  />

  <HowToPage 
  isThisPageActive = {pageIndex === 1}  
  />

  <ChallengesNearMePage 
  isThisPageActive = {pageIndex === 2}  
  />
  
  <UserGuidePage 
  isThisPageActive = {pageIndex === 3}  
  />

<CompletedChallengesPage
  isThisPageActive = {pageIndex === 4}  
  />

<LeaderboardPage
  isThisPageActive = {pageIndex === 5}  
  />


<FormLinkPage
  isThisPageActive = {pageIndex === 6}  
/>


</MenuContext.Provider>
   </div>
   
           ); // end return
 
                      } // end <Home/> declaration





