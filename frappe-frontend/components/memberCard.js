import { useState } from "react"

export default function MemberCard({person}){

    const [newDetails, setnewDetails] = useState({'name':person["name"], 'address':person["address"], 'dob':person["dob"]})
    
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;


    const [issueBox, setissueBox] = useState(0)
    const [returnBox, setreturnBox] = useState(0)

    function modifyDetails(){
        console.log(newDetails)
    }

    function showIssueBox(){
        setissueBox(1-issueBox)

        if(1-issueBox===1){
            setreturnBox(0)
        }
    }
    function showreturnBox(){
        setreturnBox(1-returnBox)

        if(1-returnBox===1){
            setissueBox(0)
        }
    }

    function deleteMember(){
        
    }



    return(
        <div  key={person['memberID']} className="my-5">
            <div className='flex items-center justify-around w-full'>
                <div className='w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>{person["memberID"]}</div>
                <input onChange={(e)=>{setnewDetails({...newDetails, 'name':e.target.value})}} className='bg-light-grey outline-none w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300' defaultValue={
                    person["name"].length<25
                    ?
                    person["name"]
                    :
                    person["name"].slice(0, 24)+"..."
                }/>
                
                <input onChange={(e)=>{setnewDetails({...newDetails, 'address':e.target.value})}} className='bg-light-grey outline-none w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300' defaultValue={
                    person["address"].length<25
                    ?
                    person["address"]
                    :
                    person["address"].slice(0, 24)+"..."
                }/>
                <input onChange={(e)=>{setnewDetails({...newDetails, 'dob':e.target.value})}} className='bg-light-grey outline-none w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300' defaultValue={
                    person["dob"].length<25
                    ?
                    person["dob"]
                    :
                    person["dob"].slice(0, 24)+"..."
                }/>
                
                
                <div className='w-[15rem] h-[2.5rem] py-1 hover:cursor-pointer text-center hover:scale-110 ease-in-out duration-300'>₹{person["debt"]}</div>
                
                </div>
                <div className='flex justify-center items-center'>                            
                    <div className='w-full bg-black h-[0.5px] m-1'></div>
                </div>

            <div className="flex items-center justify-center gap-3 mt-2 ">
                <button onClick={showIssueBox} className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Issue</button>
                <button onClick={showreturnBox} className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Return</button>
                <button className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Clear Debt</button>
                <button onClick={modifyDetails} className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Modify</button>
                <button onClick={deleteMember} className="py-1 flex items-center hover:scale-105 bg-red-600 text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Delete</button>
            </div>

            {issueBox===1 && <form className=' flex items-center gap-3 mt-7 justify-center'><input type='text' placeholder='Enter ISBN to issue book' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[40%] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input> <button className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Issue Book</button></form>}
            {returnBox===1 && <form className=' flex items-center gap-3 mt-7 justify-center'><input type='text' placeholder='Enter ISBN to return book' className='bg-light-grey outline-none focus:border-black border-light-grey rounded-lg border-[1px] w-[40%] p-4 text-center text-lg h-[3rem] ease-in-out duration-300'></input> <button className="py-1 flex items-center hover:scale-105 bg-black text-white border-[1px] justify-center w-[8rem] h-[2.5rem] rounded-lg ease-in-out duration-300">Return Book</button></form>}

        </div>
    )
}