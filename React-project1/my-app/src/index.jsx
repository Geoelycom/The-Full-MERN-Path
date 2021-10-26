 import React from "react";
 import ReactDOM from "react-dom";

 const App = () => {
   return ( 
       <div>
       <label className = "label" htmlFor = "name" > Enter Name </label>
       <input id="name" type="text" />
       <button style={{backgroundColor: 'blue', color: 'white'}}>Submit</button>
     </div>
 )
 }

 //take the react componebt and display it on the screen

 ReactDOM.render(<App />, document.querySelector('#root'));