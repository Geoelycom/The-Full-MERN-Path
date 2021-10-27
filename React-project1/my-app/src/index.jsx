 import React from "react";
 import ReactDOM from "react-dom";
 import faker from "faker";
 import { CommentDetail } from "./CommentDetail";

 const App = () => {
 return (
    <div className="ui container comments">
     <CommentDetail />
     <CommentDetail />
     <CommentDetail />
   </div>

 );
 }

 //take the react component and display it on the screen

 ReactDOM.render(
 <App />, document.querySelector('#root'));