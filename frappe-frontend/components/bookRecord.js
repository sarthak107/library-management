import axios from "axios"

export default function BookRecord({record}){

    let memberID = record[1]
    let bookID = record[2]
    let dateOfIssue = record[3]

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    function doreturn(){
        axios.post("http://127.0.0.1:5000/returnBook", {'memberID':memberID, 'isbn':bookID, 'dor':currentDate})
    }

    return(
        <div key={record[0]} className="">
            <div className="flex items-center justify-around w-full gap-3">
                <div className="w-[17rem] h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300">{memberID}</div>
                <div className="w-[17rem] h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300">{bookID}</div>
                <div className="w-[17rem] h-[2.5rem] py-1 text-center hover:cursor-pointer hover:scale-110 ease-in-out duration-300">{dateOfIssue}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-full bg-black h-[0.5px] m-1'></div>
            </div>
            <form className="flex items-center justify-center gap-3 mt-2 ">
                <button onClick={doreturn} className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Return</button>
            </form>
        </div>
    )
}