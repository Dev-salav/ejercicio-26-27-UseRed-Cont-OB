import React, { useReducer, useContext, useState } from "react";

const myContext = React.createContext(null);

const Task = () => {
  const state = useContext(myContext);

  return state.tasks.map((task) => {
    console.log(state.tasks);
    <p>
      task: {task.taskName} Description: {task.taskDescription} Class:
      {task.taskClass}
    </p>;
  });
};

const FIELD = "FIELD";
const ADDTASK = "ADDTASK";
const DELETETASK = "DELETETASK";
const FILTERALLTASK = "FILTERALLTASK";
const FILTERURGENTASK = "FILTERURGENTASK";
const FILTERNORMALTASK = "FILTERNORMALTASK";

const TaskList = () => {
  const [update, setUpdate] = useState(false);
  const initialState = {
    tasks: [],
    taskName: "",
    taskDescription: "",
    taskClass: "",
  };

  const taskReducer = (state, action) => {
    switch (action.type) {
      case FIELD:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ADDTASK:
        console.log(action);
        return {
          ...state,
          tasks: [
            ...state.tasks,
            {
              taskName: action.payload.taskName,
              taskDescription: action.payload.taskDescription,
              taskClass: action.payload.taskClass,
            },
          ],
        };
      case DELETETASK:
        return {};
      case FILTERALLTASK:
        return {};
      case FILTERURGENTASK:
        return {};
      case FILTERNORMALTASK:
        return {};

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const { taskName, taskDescription, taskClass } = state;

  return (
    <myContext.Provider value={state}>
      <div>
        TaskList
        <div>
          <div>
            <Task />
          </div>
          <div>Insert a New Task</div>
          <form>
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) =>
                dispatch({
                  type: FIELD,
                  fieldName: "taskName",
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) =>
                dispatch({
                  type: FIELD,
                  fieldName: "taskDescription",
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Class"
              value={taskClass}
              onChange={(e) =>
                dispatch({
                  type: FIELD,
                  fieldName: "taskClass",
                  payload: e.currentTarget.value,
                })
              }
            />
            <button
              type="button"
              onClick={() => {
                dispatch({
                  type: ADDTASK,
                  payload: {
                    taskName: state.taskName,
                    taskDescription: state.taskDescription,
                    taskClass: state.taskClass,
                  },
                });
                setUpdate(!update);
              }}
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </myContext.Provider>
  );
};

export default TaskList;
