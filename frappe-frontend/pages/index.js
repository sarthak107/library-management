import { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '@/components/bookCard'

export default function Home() {

  const [bookData, setBookData] = useState(false)
  const [searchtext, setsearchtext] = useState("")
  const [page, setpage] = useState(1)

  function loadBookData(){
      setpage(1)
      axios.get(`http://127.0.0.1:5000/getBooks?title=${searchtext}&page=${1}`)
      .then((res)=>{
        setBookData(res.data)
        // console.log(res.data)
      })

  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/getBooks?title=${searchtext}&page=${page}`)
      .then((res)=>{
        setBookData(res.data)
        // console.log(res.data)
      })
  }, [page])

  return (
    <div>

      <div className='text-5xl flex items-center justify-center m-10 font-bold'>Books</div>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className='flex items-center justify-center'><input type='text' onChange={(e)=>{setsearchtext(e.target.value)}} placeholder='Search books by title' className='bg-light-grey outline-none focus:border-black border-light-grey  border-y-[1px] w-[50%] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input></div>
        <div className='flex items-center justify-center mt-5'><button onClick={loadBookData} className='bg-black text-white py-1 flex items-center hover:scale-105 justify-center w-[17rem] h-[2.5rem] rounded-lg ease-in-out duration-300'>Search</button></div>
      </form>
      <div className='mt-20 flex items-center flex-col justify-center gap-2 '>
        <div>
          <div className='flex items-center justify-around w-full gap-3'>
            <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>Title</div>
            <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>Authors</div>
            <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>Publisher</div>
            <div className='w-[17rem] font-bold h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>ISBN</div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='w-full bg-black h-[0.5px] m-1'></div>
          </div>
        </div>
        {
          bookData &&

          bookData.map((book)=>{
            return(
              <BookCard book={book}/>
            )
          })
        }

        <div className='flex items-center gap-2 justify-center my-5'>
        <button onClick={()=>{if(page>1){setpage(page-1)}}} className='bg-black text-white py-1 pb-3 flex items-center hover:scale-105 justify-center w-[3rem] h-[3rem] rounded-lg ease-in-out duration-300 text-3xl'>«</button>
        <button onClick={()=>{setpage(page+1)}} className='bg-black text-white py-1 pb-3 flex items-center hover:scale-105 justify-center w-[3rem] h-[3rem] rounded-lg ease-in-out duration-300 text-3xl'>»</button>
        </div>
      </div>

    </div>
  )
}
