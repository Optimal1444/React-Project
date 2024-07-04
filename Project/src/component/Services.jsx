import axios from "axios"

const dir='https://openlibrary.org/search';
const imageDirctory='https://covers.openlibrary.org/b/olid'
export async function GetBooksByTitle(q,page=1) {

  return await axios.get(`${dir}.json?title=${q}&limit=21&details=false&page=${page}`)
  }
  export async function GetBooksByAuthor(q,page=1) {

    return await axios.get(`${dir}.json?author=${q}&limit=21&details=false&page=${page}`)
  }
  export async function GetBooksBySubject(q,page=1) {

    return await axios.get(`${dir}.json?subject=${q}&limit=21&details=false&page=${page}`)
  }
export async function GetType() {

    return await axios.get("http://localhost:3000/type")
  }
// export async function GetAdds() {

//     return await axios.get("http://localhost:3000/adds")
//   }
   
   