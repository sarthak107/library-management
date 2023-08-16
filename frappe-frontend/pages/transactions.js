import TransactionRecord from "@/components/transactionRecord"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Transactions(){

    const [transactiondata, settransactiondata] = useState(false)
    useEffect(() => {
      axios.get("http://127.0.0.1:5000/getTransaction")
      .then(
        (res)=>{
            settransactiondata(res.data)
        }
      )
    }, [])
    

    return (
        <div>
            <div className='text-5xl flex items-center justify-center m-10 font-bold'>Transactions</div>

            <div className="flex items-center flex-col justify-center p-5 gap-10 mt-10">
                <div>
                    <div className='flex items-center justify-around w-full gap-3'>
                        <div className='w-[17rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Member ID</div>
                        <div className='w-[17rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Amount</div>
                        <div className='w-[17rem] font-bold h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>Date of Transfer</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-full bg-black h-[0.5px] m-1'></div>
                    </div>
                </div>

                {
                    transactiondata&&

                    transactiondata.map((record)=>{
                        return(
                            <TransactionRecord record={record}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
