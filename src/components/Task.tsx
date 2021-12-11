import React from "react";

interface Props {
   task: string;
   completeTask(taskName: string): void;
   renameTask(oldTaskName: string): void;
}

const Task = ({ task, completeTask, renameTask }: Props) => {
   return (
      <div className="task">
         <div className="content">
            {task}
         </div>
         <div className="control">
            <div><button onClick={() => renameTask(task)}>Edit</button></div>
            <div><button onClick={() => completeTask(task)}>Delete</button></div>
         </div>
      </div>
   )
};

export default Task;