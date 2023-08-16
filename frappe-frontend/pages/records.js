import BookRecord from "@/components/bookRecord"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Records(){
    const [issued, setissued] = useState(false)
    const [searchtext, setsearchtext] = useState("")

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/getIssuedBooks")
        .then(
            (res)=>{
                setissued(res.data)
                // console.log(res.data)
            }
        )
    }, [])

    function loadRecordData(){
        if(searchtext){
            axios.post("http://127.0.0.1:5000/getIssuedBooks", {'memberID':searchtext})
            .then(
                (res)=>{
                    setissued(res.data)
                }
            )
        }
        else{
            axios.get("http://127.0.0.1:5000/getIssuedBooks")
            .then(
                (res)=>{
                    setissued(res.data)
                    // console.log(res.data)
                }
        )
        }
    }
    

    return(
        <div>
            <div className='text-5xl flex items-center justify-center m-10 font-bold'>Records</div>
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <div className='flex items-center justify-center'><input type='text' onChange={(e)=>{setsearchtext(e.target.value)}} placeholder='Search records by member ID' className='bg-light-grey outline-none focus:border-black border-light-grey  border-y-[1px] w-[50%] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input></div>
                    <div className='flex items-center justify-center mt-5'><button onClick={loadRecordData} className='bg-black text-white py-1 flex items-center hover:scale-105 justify-center w-[17rem] h-[2.5rem] rounded-lg ease-in-out duration-300'>Search</button></div>
                </form>
                <div className="flex items-center flex-col justify-center p-5 gap-10 mt-10">
                    
                    <div>
                        <div className='flex items-center justify-around w-full gap-3'>
                            <div className='w-[17rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Member ID</div>
                            <div className='w-[17rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Book ID</div>
                            <div className='w-[17rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Date of Issue</div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <div className='w-full bg-black h-[0.5px] m-1'></div>
                        </div>
                    </div>

                    {
                        issued&&

                        issued.map((record)=>{
                            return(
                                <BookRecord record={record}/>
                            )
                        })
                    }
                    

                </div>


        </div>
    )
}