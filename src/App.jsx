import { useState , useCallback, useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const[noallowed,setNoallowed]=useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const[pass,setPass]=useState("");

  const passwordref=useRef(null)

  const passgen=useCallback(() =>{
    let pass=""
    let str=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(noallowed)
      str+="0123456789"

    if(charAllowed)
      str+="!@#$%^&*()"

    for (let i = 1; i <= length;i++){
      let char = Math.floor(Math.random()* str.length+1)
      pass += str.charAt(char)
    }
    
    setPass(pass)

    },[length,noallowed,charAllowed,setPass])


    const copypasstoclipboard=useCallback(() => {
      passwordref.current?.select();
      passwordref.current?.setSelectionRange(0,99)
      window.navigator.clipboard.writeText(pass)
    },
  [pass])




  useEffect(() => {
    passgen()
  } , [length,noallowed,charAllowed,passgen])

  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md
   rounded-lg px-4 py-3 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>


    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type='text'
      value={pass}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordref}
      />

      <button
      onClick={copypasstoclipboard}
      className='outline-none bg-blue-700 text-white
      px-3 py-0.5 shrink-0'
      >copy</button>
       
    </div>

    <div className='flex text-sm gap-x-2'>

      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={noallowed}
        id="numberInput"

        onChange={()=>{
          setNoallowed((prev)=> !prev);
        }}
        />

        <label htmlFor='numberInput'>Numbers </label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={charAllowed}
        id="characterInput"
        onChange={() => {
          setCharAllowed((prev) => !prev);
        }}
  />
    <label htmlFor='characterInput'>characters</label>
      </div>

    </div>
   </div>
   </>
  )
}

export default App
