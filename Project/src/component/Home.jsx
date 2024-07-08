import "https://kit.fontawesome.com/506617f664.js";
import { useEffect, useRef, useState } from "react";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { GetBooksByAuthor, GetBooksBySubject, GetBooksByTitle } from "./Services";
import Swal from 'sweetalert2'
import { useSelector } from "react-redux";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Home() {
  const state=useSelector(state=>state)
    const inputRef=useRef()
    const [books,setBooks]=useState([])
    const [clickedBook,setClickedBook]=useState({})
    const [numFound,setNumFound]=useState(0)
    const [page,setPage]=useState(1)
    const [searchBtnClicked,setSearchBtnClicked]=useState(0)
    const [radioBtn,setRadioBtn]=useState("title")
    const imagePath='https://covers.openlibrary.org/b/olid/'
    const [showModal, setShowModal] = useState(false);
    useEffect(()=>{

        if(sessionStorage.getItem('user') )
          {
            switch(radioBtn){
              case 'title':  GetBooksByTitle(inputRef.current.value,page).then((res)=>{setBooks(res.data.docs);setNumFound(res.data.numFound)}); break;
              case 'author':  GetBooksByAuthor(inputRef.current.value,page).then((res)=>{setBooks(res.data.docs);setNumFound(res.data.numFound)}); break;
              case 'subject':  GetBooksBySubject(inputRef.current.value,page).then((res)=>{setBooks(res.data.docs);setNumFound(res.data.numFound)}); break;
            }
          }
          else{
              GetBooksByTitle('scientific',page).then((res)=>{setBooks(res.data.docs);setNumFound(res.data.numFound)})
          }
          
          
    },[page])
    const handleClick=()=>{
      if(sessionStorage.getItem('user') )
        {
          setSearchBtnClicked(1)
          switch(radioBtn){
            case 'title':  GetBooksByTitle(inputRef.current.value,page).then((res)=>{setBooks(res.data.docs);setNumFound(res.data.numFound)}); break;
            case 'author':  GetBooksByAuthor(inputRef.current.value,page).then((res)=>{setBooks(res.data.docs);setNumFound(res.data.numFound)}); break;
            case 'subject':  GetBooksBySubject(inputRef.current.value,page).then((res)=>{setBooks(res.data.docs);setNumFound(res.data.numFound)}); break;
          
          }
          setPage(1)
        }
        else{
          Swal.fire({
            title: "Sign-in for free search",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
        }
        
      }
      const handleClickedBook=(book)=>{

        const b={'book_image':book.cover_edition_key?`${imagePath}${book.cover_edition_key}.jpg`:'../src/assets/bg.jpg'
        ,'author_image':`https://covers.openlibrary.org/a/olid/${book.author_key}.jpg`
        ,  'title':book.title
        , 'author':book.author_name
        , 'first_sentence':book.first_sentence
        , 'edition_count': book.edition_count
        , 'ratings_average':book.ratings_average}
        setClickedBook(b)
        setShowModal(true)
      }
        const increasePage=()=>{
            const numOfPages=Math.ceil(numFound/21)
            if(page<numOfPages)
              setPage(page+1)

        }
        const decreasePage=()=>{
          if(page>1)
            setPage(page-1)
        }
        const changePageInput=(e)=>
        {
          const inputPage=parseInt(e.target.value)
          if(!isNaN(inputPage)){
          const numOfPages=Math.ceil(numFound/21)
          if(inputPage>numOfPages)
            setPage(numOfPages)
          else if(inputPage<1)
            setPage(1)
          else
            setPage(inputPage)
          }
          
        }
    
    const onRadioChange=(e)=>{
      setRadioBtn(e.target.value)
    }
    return (
      <>
      
      <div  className="kufam mx-auto my-16 container rounded shadow-lg py-14 border-2 " >
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2 mr-10 ">Search</div>
    <div className="flex flex-col lg:flex-row lg:justify-center gap-2 text-xl">
      
      <input type="text"  className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 
            pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-orange-400 
            focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6 h-16  lg:w-1/4" placeholder={`Search by ${radioBtn}...`} ref={inputRef}/>

      <div className="flex justify-around items-center gap-2 lg:w-1/4 w-3/4 ">
      <div>
      <input type="radio" name="type" id="title" value="title"  className="accent-orange-400 p-2 cursor-pointer ml-3" checked={radioBtn==="title"} onChange={onRadioChange} />
      <label htmlFor="title" className="cursor-pointer ">Title</label>
      </div>
      <div>
      <input type="radio" name="type" id="author" value="author" className="accent-orange-400  cursor-pointer ml-3 "  checked={radioBtn==="author"} onChange={onRadioChange}/>
      <label htmlFor="author"  className="cursor-pointer ">Author</label>
      </div>
      <div>
      <input type="radio" name="type" id="subject" value="subject"  className="accent-orange-400  cursor-pointer ml-3" checked={radioBtn==="subject"} onChange={onRadioChange} />
      <label htmlFor="subject" className="cursor-pointer ">Subject</label>
      </div>
  
      </div>
      <button className="bg-orange-400 py-2 px-4 rounded-md ml-4" onClick={handleClick}>
      <i className="fa-solid fa-magnifying-glass fa-xl text-white " ></i>
      </button>
      </div>
  </div>
  
</div>

<div className="grid lg:grid-cols-7 md:grid-cols-3 grid-cols-1 justify-around items-stretch	 gap-4  container mx-auto  " >
  {
    books.length>0 && books.map((book,index)=>
    
    <div key={index} className="  rounded-md  overflow-hidden shadow-lg hover:cursor-pointer"  onClick={()=>{handleClickedBook(book)}} >
      {
      !book.cover_edition_key&&
      <img className="w-full"  src='../src/assets/bg.jpg' alt='...' />
      }
      {
      book.cover_edition_key&&
      <img className="w-full " src={`${imagePath}${book.cover_edition_key}.jpg`} alt="..." />
      }
      

      <div className="px-6 py-4  ">
      <div className="font-bold text-xl md:text-lg lg:text-xs mb-2">{book.title}</div>
        <p className="text-gray-700 text-base text-xl md:text-lg lg:text-xs">
          Author: {book.author_name}
        </p>
      </div>
  
  </div>
    )
  }
  

</div>
{
    (searchBtnClicked==1&&books.length==0)&&
      <h1 className="bg-red-50 px-4 py-1 text-3xl  text-red-700  ring-1 rounded  mx-auto w-80 text-center">Not found!</h1>

    

  }
<section className="my-12">
{
books.length>0&&state==1&&
<div className="flex flex-col items-center">
  <span className="text-sm text-gray-700 dark:text-gray-400">
      Showing <span className="font-semibold text-gray-900 dark:text-white">{(page-1)*21+1} </span>
       to <span className="font-semibold text-gray-900 dark:text-white"> {numFound>((page-1)*21+21)?(page-1)*21+21:numFound}</span>
        of <span className="font-semibold text-gray-900 dark:text-white">{numFound}</span> Entries
  </span>
  <div className="inline-flex mt-2 xs:mt-0">
    <button onClick={()=>{decreasePage()}} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        Prev
    </button>
    <input type="text" className="border border-black px-4 h-10 w-20 mx-2 rounded text-center" value={page} onChange={(e)=>{changePageInput(e) }} />
    <button onClick={()=>{increasePage()}} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  </div>
</div>
}
</section>
{showModal==true ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                     Book details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="p-6 max-w-md mx-auto rounded-lg shadow-lg flex flex-col justify-center items-center">
        <img className="size-48 mb-4  " src= {clickedBook.book_image} alt="Book Cover" />

        <h2 className="text-xl font-semibold mb-2">Book  {clickedBook.title}</h2>

        <img className="w-12 h-12 rounded-full mb-2" src={ clickedBook.author_image} alt="Author" />

        <p className="text-gray-600 text-sm">By  {clickedBook.author}</p>

        <p className="text-gray-700 mt-4 ">
            {clickedBook.first_sentence}
        </p>
        <div className="px-6 pt-4 pb-2">
        { 
          clickedBook.edition_count&&
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{clickedBook.edition_count} editions</span>
        }
         { 
          clickedBook.ratings_average&&
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Ratings: {clickedBook.ratings_average}</span>
        }
             </div> 
    </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
            
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      </>
    )
  }
  
  export default Home