import React from "react";
//import faker from "faker";

export const CommentDetail = props => {
return (
<div className="comment">
  <a href="/" className="avatar">
    <img alt="avater" src={props.avatar} />
  </a>
  <div className="content">
    <a href="/" className="author">
      {props.author}
    </a>
    <div className="metadata">
      <span className="date">{props.timeAgo}</span>
    </div>
    <div className="text">
      {props.blogPost}
    </div>
  </div>
</div>
)
}