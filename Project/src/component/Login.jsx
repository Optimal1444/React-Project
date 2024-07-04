

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
function Login({sign,setSign})
{
    const firebaseConfig = {
    apiKey: "AIzaSyDmajIogTDdO6N-kOkmZgrjQpbmxoBETz0",
    authDomain: "books-2e9b3.firebaseapp.com",
    projectId: "books-2e9b3",
    storageBucket: "books-2e9b3.appspot.com",
    messagingSenderId: "68807982972",
    appId: "1:68807982972:web:4a3157221931bb48ccaef9"
  };
    const userRef=useRef()
    const passRef=useRef()
    const app = initializeApp(firebaseConfig);
    const navigate=useNavigate()
    const auth = getAuth();
    const handleClick=()=>{
      signInWithEmailAndPassword(auth,userRef.current.value , passRef.current.value).then((userCredential) => {
        const user = userCredential.user;
        sessionStorage.setItem('user',user.uid)
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: 'Login successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setSign(sessionStorage.getItem('user'));
        navigate('/home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=='auth/invalid-credential'|| errorCode=='auth/invalid-email')
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Invalid username or password', });
        
      });
    }
   
    return(
        <>
        {
          !sessionStorage.getItem('user')&&
          <div className="kufam flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                E-mail
              </label>
              <div className="mt-2">
                <input
                  ref={userRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                   Forget password?
                  </a>
                </div>
              </div>              
              <div className="mt-2">
                <input
                  ref={passRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
           
              
            <div>
              <button
                type="submit"
                onClick={handleClick}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-4"
              >
                Login
              </button>
            </div>

          
        </div>
      </div>
        }
        
        {
        sessionStorage.getItem('user')
        &&

        <div className="flex flex-col justify-center  items-center gap-10 my-10">
        <h1 className="bg-green-50 px-4 py-1 text-xl  text-green-700  ring-1 rounded ">You have already loged in</h1>
        <button className='bg-black p-2 rounded text-xl text-white px-6' onClick={()=>{navigate('/home')}}>Back to home</button>
        </div>
        
        }
        
    </>

    )
}
export default Login