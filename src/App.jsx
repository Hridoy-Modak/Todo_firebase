import React, { useEffect, useState } from "react";
import firebaseConfig from "./firebase.config";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const App = () => {
  const database = getDatabase();
  const db = getDatabase();
  let [alltodos, setAlltodos] = useState([]);
  let [task, setTask] = useState("");
  let [task2, setTask2] = useState("");
  let [edit, setEdit] = useState(false);
  let [iddata, setIddata]=useState("");
  let [updateinput1, setUpdateinput1]=useState('');
  let [updateinput2, setUpdateinput2]=useState('');

  let handleTask = (e) => {
    setTask(e.target.value);
    // console.log(task);
  };
  let handleTask2 = (f) => {
    setTask2(f.target.value);
  };

  let handlerclick = () => {
    // const db = getDatabase();
    set(push(ref(db, "users/")), {
      name: task,
      add: task2,
    }).then(() => {
      setTask("");
      setTask2("");
      // alert("Task submited");
    });
  };

  let handledelete = (id) => {
    // const db = getDatabase();
    remove(ref(db, "users/" + id));
  };
  let handleredit = (id) => {
    setEdit(true);
    setIddata(id);
    console.log(id);
  };
  let handleeditclose = () => {
    setEdit(false);
  };
  let updatetask1 = (e) => {
    setUpdateinput1(e.target.value);
    // console.log(updateinput1);
  };
  let updatetask2 = (e) => {
    setUpdateinput2(e.target.value);
    
  };
  let handleupdate=()=>{
    // console.log(updateinput1, id );
    // console.log(updateinput2);
    console.log(iddata);
    // const db = getDatabase();
    update(ref(db, "users/" +iddata),{
      name:updateinput1,
      add:updateinput2,
    });

  }

  useEffect(() => {
    // const db = getDatabase();
    const todosref = ref(db, "users/");
    let arr = [];
    onValue(todosref, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setAlltodos(array);
    });
  }, ["users/"]);
  // console.log(alltodos);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 mt-6 relative">
        <h1 className=" text-xl text-gray-900 font-bold">Todo List Input</h1>
        <input
          onChange={handleTask}
          className="border px-2 py-2 rounded-lg bg-slate-500 text-white text-[18px] font-semibold"
          placeholder="Name"
          type="text"
          name=""
          id=""
          value={task}
        />
        <input
          onChange={handleTask2}
          className="border px-2 py-2 rounded-lg bg-slate-500 text-white text-[18px] font-semibold"
          placeholder="Enter you Address"
          type="text"
          name=""
          id=""
          value={task2}
        />
        <button
          onClick={handlerclick}
          className="border py-2 px-5 w-fit bg-orange-200 font-medium rounded-md border-spacing-1 border-[black]"
        >
          Click Here
        </button>
        <ul className="flex w-[350px] border p-1 rounded-md">
          <li className="w-[50%] text-xl">Name</li>
          <li className="w-[50%] text-xl">Adress</li>
        </ul>

        {alltodos.map((item) => {
          //  console.log(item.id);
          return (
            <ul className="w-[350px]">
              <li className="flex bg-slate-400 p-2 h-11 rounded-md">
                <div className="w-[50%]">{item.name}</div>
                <div className="w-[50%]">{item.add}</div>
                <button
                  onClick={() => handledelete(item.id)}
                  className=" bg-red-300 w-5 text-center border rounded-md hover:text-[18px] hover:text-xl"
                >
                  X
                </button>

                <button
                  onClick={()=>handleredit(item.id)}
                  className=" bg-green-300 ml-2 text-center border rounded-md hover:text-[18px] hover:text-xl"
                >
                  Edit
                </button>
              </li>
            </ul>
          );
        })}
        {edit && (
          <div className="w-[450px] h-[500px] py-12 px-5 bg-slate-400 absolute top-0">
            <button
              onClick={handleeditclose}
              className=" bg-green-200 p-2 rounded-lg absolute right-5 top-5"
            >
              X
            </button>
            <h1 className=" text-xl text-gray-900 font-bold text-center">
              Todo List Input
            </h1>

            <div className="flex flex-col items-center">
              <input
                onChange={updatetask1}
                className=" mt-10 h-9 p-2 border w-[300px] border-black border-spacing-1 rounded-md border-opacity-60"
                placeholder="Enter new name"
                type="text"
              />
              <input
                onChange={updatetask2}
                className=" mt-5 h-9 p-2 border w-[300px] border-black border-spacing-1 rounded-md border-opacity-60"
                placeholder="Enter new name"
                type="text"
              />

              <button
              onClick={handleupdate}
              className=" bg-green-300 w-max text-center py-2 px-4 rounded-2xl mt-4">
                Change
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
