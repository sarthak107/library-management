import { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import MemberCard from "@/components/memberCard"

export default function Members() {

    const [memberData, setMemberData] = useState(false)
    const [searchtext, setsearchtext] = useState("")

    const [toggleAdd, settoggleAdd] = useState(0)
    const {handleSubmit, register} = useForm()

    function addMember(data){
        axios.post("http://127.0.0.1:5000/addMember", data)
        window.location.reload()
    }

    function loadMemberData(){
        axios.get(`http://127.0.0.1:5000/getMembers?name=${searchtext}`)
        .then((res)=>{
          setMemberData(res.data)
        })  
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/getMembers?name=${searchtext}`)
          .then((res)=>{
            setMemberData(res.data)
            // console.log(res.data)
          })
      }, [])
    
    return(
        <div>

            <div className='text-5xl flex items-center justify-center m-10 font-bold'>Members</div>
            <div>
                <div className='flex items-center justify-center'><input type='text' onChange={(e)=>{setsearchtext(e.target.value)}} placeholder='Search members by name' className='bg-light-grey outline-none focus:border-black border-light-grey  border-y-[1px] w-[50%] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input></div>
                <div className='flex items-center gap-3 justify-center mt-5'>
                    <button onClick={loadMemberData} className='bg-black text-white py-1 flex items-center hover:scale-105 justify-center w-[17rem] h-[2.5rem] rounded-lg ease-in-out duration-300'>Search</button> 
                    <button onClick={()=>{settoggleAdd(1-toggleAdd)}} className='py-1 border-black border-[1px] flex items-center hover:scale-105 justify-center w-[17rem] h-[2.5rem] rounded-lg ease-in-out duration-300'>Add member</button>
                </div>
                {
                    toggleAdd===1&&
                    <form onSubmit={handleSubmit(addMember)} className=' flex items-center gap-3 mt-7 justify-center'>
                        <input required {...register('name')} type='text' placeholder='Enter name' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input> 
                        <input required {...register('address')} type='text' placeholder='Enter address' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input> 
                        <input required {...register('dob')} type='text' placeholder='Enter DoB' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[10rem] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input>
                        <button className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Add</button>
                    </form>
                }
            </div>

            <div className='mt-20 flex items-center flex-col justify-center gap-7 '>
                <div>
                    <div className='flex items-center justify-around w-full'>
                        <div className='w-[15rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>ID</div>
                        <div className='w-[15rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Name</div>
                        <div className='w-[15rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Address</div>
                        <div className='w-[15rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>DoB</div>
                        <div className='w-[15rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Debt</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-full bg-black h-[0.5px] m-1'></div>
                    </div>
                </div>
            
                {
                memberData &&

                memberData.map((person)=>{
                    return(
                        <MemberCard key={person['memberID']} person={person}/>
                    )
                })
                }
            </div>
        </div>
    )
}