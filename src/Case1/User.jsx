import React from "react";

const Task = (props) => {
  


  return props.task.userId === +props.userid && (
    <div style={{ border: props.task.completed ? "1px solid green" : "1px solid black", width: "200px", margin: "10px" }}>
      Title: {props.task.title}... <br />
      Completed: {props.task.completed.toString()} <br />
    {props.task.completed ? null : <button onClick={() => props.changeTodoTrue(props.task.id)}>Mark Completed</button>}  
    </div>
    
  );
  }

export default Task;
