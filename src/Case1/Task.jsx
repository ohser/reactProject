import React from "react";

const Task =({ changeTodoTrue, task, userid }) => {
 console.log(changeTodoTrue)
 console.log(task)
 console.log(userid)


  return task.userId === +userid && (
    <div  key={task.id} style={{ border: task.completed ? "1px solid green" : "1px solid black", width: "200px", margin: "10px" }}>
      Title: {task.title}... <br />
      Completed: {task.completed.toString()} <br />
    {task.completed ? null : <button onClick={() => changeTodoTrue(task.id)}>Mark Completed</button>}  
    </div>
    
  );
  }

export default Task;
