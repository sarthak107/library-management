export default function BookCard({book}){
    return(
        <div  key={book['isbn']}>
          <div className='flex items-center justify-around w-full gap-3'>
            <div className='w-[17rem] h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>
            {
              book["title"].length<25
              ?
              book["title"]
              :
              book["title"].slice(0, 24)+"..."
            }
            </div>
            <div className='w-[17rem] h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>
            {
              book["authors"].length<25
              ?
              book["authors"]
              :
              book["authors"].slice(0, 24)+"..."
            }
            </div>
            <div className='w-[17rem] h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>
            {
              book["publisher"].length<25
              ?
              book["publisher"]
              :
              book["publisher"].slice(0, 24)+"..."
            }
            </div>
            <div className='w-[17rem] h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300'>{book["isbn"]}</div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='w-full bg-black h-[0.5px] m-1'></div>
          </div>
        </div>
      )
}