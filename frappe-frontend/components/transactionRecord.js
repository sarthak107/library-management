export default function TransactionRecord({record}){
    return(
        <div>
            <div className='flex items-center justify-around w-full gap-3'>
                <div className='w-[17rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>{record['name']}</div>
                <div className='w-[17rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>₹{record['amount']}</div>
                <div className='w-[17rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>{record['dot']}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-full bg-black h-[0.5px] m-1'></div>
            </div>
        </div>
    )
}