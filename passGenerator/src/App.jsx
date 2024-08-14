import { useState, useCallback,useEffect, useRef } from 'react'


function App() {
  const[length,setLength]=useState(8);
  const[number,setNumber]=useState(false);
  const[character,setChar]=useState(false);
  const[password,setPass]=useState("");

  const passwordRef=useRef(null)

  const passGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number){
      str+="123456789";      
    }
    if(character){
      str+="!@#$%^&*+=_-[]{}~";
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPass(pass);

  },[length,number,character])

  const copyPasstoClipBoard=useCallback(()=>{
    //passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(()=>{
    passGenerator();
  },[length,number,character,passGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white font-semibold text-center my-3'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden md-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>

        <button onClick={copyPasstoClipBoard} className='outline-none bg-green-600 text-white px-3 py-0.5 shrink-0 hover:bg-green-400'>Copy</button>      
      </div>
      <div className='flex p-5 text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={30} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}></input>
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={number} id="numberInput" className='cursor-pointer'
           onChange={()=>{
            setNumber((prev)=>!prev);}}></input>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={character} id="charCheck" className='cursor-pointer'
          onChange={()=>{setChar((prev)=>!prev)}}
          />
          <label>Characters</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
