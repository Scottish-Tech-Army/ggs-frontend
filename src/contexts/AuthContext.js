import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext({});

const UNIT_KEY = "ggsUnit"

const AuthProvider = ({ children }) => {
  // Simulate user not having logged in:
  const [unit, setUnit] = useState(false);
  // Simulate user having logged in:
  // const [unit, setUnit] = useState(true);
  // Original:
  // const [unit, setUnit] = useState();

// useEffect() below runs on first mounting of the component.
// The useEffect() below retrieves what's in 
// localStorage and (if that value is truthy) sets 
// the value of state property unit to that value 
// (ie on first mount of this component, data is 
// retrieved from localStorage and stored into this 
// component's state). 
// This component is only rendered once, at startup.

  useEffect(() => {
    const storedUnit = window.localStorage.getItem(UNIT_KEY)
    // console.log("Retrieved stored unit", storedUnit);
    storedUnit && setUnit(JSON.parse(storedUnit));
                  }, []);


 // Mukund: When there's a change in the value of state 
 // property unit, determine whether it needs to be stored 
 // in localStorage.
 // The first useEffect() (above) makes state property unit 
 // change on first mount of this component if unit exists 
 // in local storage. Hence the useEffect() below will run 
 // after the one above. 
 // The useEffect() below 
 // Puts state property unit into local storage if
 // a) state property unit is truthy (because unit has 
 // been taken out of local storage and stored there),
 // and any of these three scenarios:
 // i)   
 // storedUnit is falsey and
 // unit and storedUnit are the same
 // ii) 
 // storedUnit is truthy and
 // unit is different to storedUnit
 // iii)
 // storedUnit is falsey and
 // unit and storedUnit are different 
 
// This translates to:
// (When unit changes) put unit into local storage if
// unit is truthy and one of thse two scenarios exists:
// i)  storedUnit is falsey (regardless of the value of unit)
// ii) storedUnit is truthy but different to unit

 useEffect(() => {
    const storedUnit = window.localStorage.getItem(UNIT_KEY)

    if (unit && (!storedUnit || unit !== JSON.parse(storedUnit))) {
      window.localStorage.setItem(UNIT_KEY, JSON.stringify(unit));
    }
                 }, [unit]);



/*Testing follows*/





  return (
    <authContext.Provider value={{ unit, setUnit }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;