import React from "react";
import faker from "faker";

export const CommentDetail = () => {
return (
<div className="comment">
  <a href="/" className="avatar">
    <img alt="avater" src={faker.image.avatar()} />
  </a>
  <div className="content">
    <a href="/" className="author">
      Adam
    </a>
    <div className="metadata">
      <span className="date">Today at 9:00pm</span>
    </div>
    <div className="text">
      Nice blog post!
    </div>
  </div>
</div>
)
}