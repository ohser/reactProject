import React, { useEffect, useState } from 'react'
import Task from './Task';
import utils from './utilss';
export default function Tasks(props) {
    console.log(props)

   

    const changeTodoTrue = (todoId) => {
        const todoCopy = [...props.tasks]
        const index = todoCopy.findIndex(todo => todo.id === todoId)
        todoCopy[index].completed = true

        if (todoCopy.every(todo => todo.completed)) {
            props.setCompletedTasks(true)
        } 


        props.setTasks(todoCopy);
    }





    return (
        // <div>
        //     {props.tasks?.map((item) => {
        //         return (
        //             <Task changeTodoTrue={changeTodoTrue} key={item.id} task={item} userid={item.userId} />
        //         );
        //     })}
        // </div>

<div>
{props.tasks?.map((item) => {
  return (
    <Task
      key={item.id}  // Make sure to include a unique key prop
      changeTodoTrue={changeTodoTrue}
      task={item}
      userid={item.userId}
    />
  );
})}
</div>
    )
}
