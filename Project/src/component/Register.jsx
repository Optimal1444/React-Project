
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
function Register()
{
  const firebaseConfig = {
    apiKey: "AIzaSyDmajIogTDdO6N-kOkmZgrjQpbmxoBETz0",
    authDomain: "books-2e9b3.firebaseapp.com",
    projectId: "books-2e9b3",
    storageBucket: "books-2e9b3.appspot.com",
    messagingSenderId: "68807982972",
    appId: "1:68807982972:web:4a3157221931bb48ccaef9"
  };
    const app = initializeApp(firebaseConfig);
    const userRef=useRef()
    const passRef=useRef()
    const confirmPassRef=useRef()
    const navigate=useNavigate()
    const handlesubmit=()=>{
      if(passRef.current.value==confirmPassRef.current.value){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userRef.current.value, passRef.current.value).then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: 'Registered successfully',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/login')
        // ...
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          
          if(errorCode=='auth/invalid-email'){
            userRef.current.className=userRef.current.className+' text-red-500 '
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'invalid-email',
            });
          }
            
          else if(errorCode=='auth/weak-password'){
            passRef.current.className=passRef.current.className+' text-red-500 '
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'weak-password',
            });
          }
          else if(errorCode=='auth/email-already-in-use')
            {
              userRef.current.className=userRef.current.className+' text-red-500 '
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'email-already-in-use',
            });
            }
            else if(errorCode=='auth/missing-email')
            {
              userRef.current.className=userRef.current.className+' text-red-500 '
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'missing-email', });
            }
            else if(errorCode=='auth/missing-password')
              {
                passRef.current.className=passRef.current.className+' text-red-500 '
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'missing-password',});
                }
        });
      }
      else
      {
        confirmPassRef.current.className=confirmPassRef.current.className+' text-red-500 '
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Passwords do NOT match',
        });
      }
      
  }
    return(
        <>
     
      {
      !sessionStorage.getItem('user')&&
      <div className="kufam flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
             Create new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          
            <div className=''>
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
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className=''>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
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
            <div className=''>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  ref={confirmPassRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>

            <div>
            <button
                type="submit"
                onClick={handlesubmit}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-6"
              >
                Sign up
              </button>
            </div>

          
        </div>
      </div>
      }
      {
        sessionStorage.getItem('user')
        &&
        dispatch(handleLoginOn())&&
        <div className="flex flex-col justify-center  items-center gap-10 my-10">
          <h1 className="bg-green-50 px-4 py-1 text-xl  text-green-700  ring-1 rounded ">You have already loged in</h1>
          <button className='bg-black p-2 rounded text-xl text-white px-6' onClick={()=>{navigate('/home')}}>Back to home</button>
        </div>
        
        }
    </>

    )
}
export default Register