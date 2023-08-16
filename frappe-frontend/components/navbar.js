import Link from "next/link"

export default function NavBar(){
    return (
        <div className="min-h-[3rem] p-2 shadow-lg flex items-center justify-evenly w-[100%]">
            <Link href={'/'} className="py-1 flex items-center justify-center w-[17rem] h-[2.5rem] rounded-lg navbutton ease-in-out duration-300 hover:tracking-wider">Books</Link>
            <div className="w-[0.5px] h-[2rem] bg-black"></div>
            <Link href={'/members'} className="py-1 flex items-center justify-center w-[17rem] h-[2.5rem] rounded-lg navbutton ease-in-out duration-300 hover:tracking-wider">Members</Link>
            <div className="w-[0.5px] h-[2rem] bg-black"></div>
            <Link href={'/records'} className="py-1 flex items-center justify-center w-[17rem] h-[2.5rem] rounded-lg navbutton ease-in-out duration-300 hover:tracking-wider">Records</Link>
        </div>
    )
} 