 import React from "react";
 import ReactDOM from "react-dom";
 import faker from "faker";
 import { CommentDetail } from "./CommentDetail";

 const App = () => {
 return (
    <div className="ui container comments">
     <CommentDetail author="sam"  timeAgo="yesterday at 2:30AM" blogPost="this looks great" avatar={faker.image.avatar()} />
     <CommentDetail author="john" timeAgo="today at 5:45pm"  blogPost="great post" avatar={faker.image.avatar()}/>
     <CommentDetail  author="sara" timeAgo="today at 12:10pm" blogPost="interesting post" avatar={faker.image.avatar()}/>
   </div>

 );
 }

 //take the react component and display it on the screen

 ReactDOM.render(
 <App />, document.querySelector('#root'));