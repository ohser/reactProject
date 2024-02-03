import React from "react";

const Post = (props) => {
  console.log(props)


  return props.user.userId === +props.userid && (
    <div style={{ border: "2px solid black", width: "200px", margin: "10px" }}>
      Title: {props.user.title}... <br />
      Body: {props.user.body}... <br />

    </div>
    
  );
  }

export default Post;
