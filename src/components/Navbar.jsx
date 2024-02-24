
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className='flex justify-between bg-sky-700 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>TaskMe</span>
        </div>
        <div className='title'>
            <span className='cursor-pointer hover:font-bold duration-100'>Progress made Simple!</span>
        </div>
        <ul className='flex gap-2 mx-8'>
            <li className="cursor-pointer hover:font-bold translate-all duration-100 my-1 ">
              <a href='https://github.com/ajaykumar2004/To-Do-UsingReact' target='_blank'>
                   < FaGithub size={20} />
              </a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
