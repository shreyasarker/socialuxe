import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../../assets/logo.png';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';
const categories = [
  {name: 'Animals'},
  {name: 'Wallpapers'},
  {name: 'Photography'},
  {name: 'Gaming'},
  {name: 'Coding'}
];

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link to="/" onClick={()=>handleCloseSidebar} className="flex px-3 gap-2 my-6 pt-1 w-190 items-center">
          <span className="flex">
            <img src={logo} alt="Logo" className="w-12" />
            <h2 className="mt-2 font-bold uppercase">Socialuxe</h2>
          </span>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink to="/" onClick={()=>handleCloseSidebar} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
            <RiHomeFill />Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink to={`/category/${category.name}`} onClick={handleCloseSidebar} key={category.name} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link to={`user-profile/${user._id}`} onClick={handleCloseSidebar} className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3">
          <img src={user.image} className="w-10 h-10 rounded-full" alt="User profile" />
          <p>{user.username}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
