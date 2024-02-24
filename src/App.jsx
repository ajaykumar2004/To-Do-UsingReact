
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
  useEffect(()=>{
    let str=localStorage.getItem("todos");
    if(str){
      let todos=JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }

  },[]);

  const toggleFinished=()=>{
    setshowFinished(!showFinished)
  }
  const savetols=()=>{
    if(todos){
      localStorage.setItem("todos",JSON.stringify(todos));

    }
  }

  const handleChange=(e)=>{
    setTodo(e.target.value);
  }
  
  const handleAdd = () => {  
    if(todo.length>=3){
      setTodos([...todos,{id:uuidv4(), todo , isCompleted:false} ]);
      setTodo('');
      savetols();
    }
    else{
      alert('Atleast three characters (like eat..)')
    }
  };

  const handleCheckBox=(e)=>{
    let taskId=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===taskId
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);

    savetols();
  }
  
  const handleEdit=(e,id)=>{
    let t=todos.filter((i)=>{
      return i.id===id
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id; 
    });
    setTodos(newTodos);
    savetols()
  }
  
  const confirmDelete = (e, id) => {
    const userInput = window.prompt('To delete, enter "Delete":');
    if (userInput === "Delete") {
      handleDelete(e, id);
    } else {
      alert('Delete failed. Invalid input.');
    }
  };
  

  const handleDelete=(e,id)=>{
    let newTodos = todos.filter((item) => {
      return item.id !== id; 
    });
    setTodos(newTodos);
    savetols();
  }
  
  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 max-w-7xl min-h-[80vh] rounded-xl p-5 bg-sky-200">
          <div className="addTodo my-5">
            <h2 className='text-xl font-bold'>Add Tasks</h2>
            <input type="text" onChange={handleChange} value={todo} className='rounded-2xl p-3 my-3 w-10/12 text-black font-lg'/> 
            <button onClick={handleAdd} className='bg-violet-500 m-3 rounded-lg px-4 py-2 hover:translate-x-3 duration-75 font-bold text-white' >Save</button>
          </div>
          <input type="checkbox" onChange={toggleFinished} checked={showFinished} /><span className='m-3  '>Show Completed tasks</span>
          <h2 className='text-xl font-bold my-8'>Your Tasks</h2>
          <div className="todos">
            {todos.length===0 &&  <div className='font-bold text-2xl text-center m-10 p-10'>No todos to display</div>}
            {todos.map(item=>{ 
                // eslint-disable-next-line react/jsx-key
                return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-10  justify-between ">
                    <input onChange={handleCheckBox} name={item.id} type="checkbox" className='w-6 m-1'/>
                    <div className={item.isCompleted==false ? "" : "line-through"} style={{width: "80%"}}>{item.todo}</div>
<div className="buttons">
                    <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-500 mx-3 rounded-lg px-4 py-1 hover:translate-x-2 duration-75 font-bold text-white' >Edit</button>
                    <button onClick={(e)=>confirmDelete(e,item.id)} className='bg-violet-500 mx-2 rounded-lg px-4 py-1 hover:translate-x-2 duration-75 font-bold text-white' >Delete</button>
                    </div>
                </div>
            })}
          </div>
       </div>
    </>
  )
}

export default App
